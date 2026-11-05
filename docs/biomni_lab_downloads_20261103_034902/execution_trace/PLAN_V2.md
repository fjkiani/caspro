# CrisPRO Production Hardening Plan — v1 Frontend + v2 Backend

**Status**: DRAFT — awaiting approval
**Date**: 2026-07-08
**Author**: Biomni (synthesized from 5 parallel deep audits, ~12,000 lines of source code analysis)
**Target**: Harden existing `crispro-front-end` (Render) + `crispro-backend-v2` (Railway). No new infrastructure. No v3 stubs.

---

## 0. Executive Summary

This plan hardens the **existing** v1 frontend and v2 backend into a production-grade 3-persona platform (Oncologist, Patient, Pharma) with Clerk auth, Verba-inspired RAG chat UI, and Brenus pharma intelligence. Every change is specified at the file level with exact code patterns, API contracts, and deployment steps.

**What changes:**
- **Auth**: Supabase → Clerk (frontend + backend JWT verification swap)
- **Personas**: 3 (patient, oncologist, researcher) → 4 (+ pharma) with Hospital as oncologist variant
- **Patient flow**: Simplified ovarian-only onboarding → AK dashboard
- **Pharma flow**: New Brenus route with RAG chat (Verba UI ported to MUI/Vite)
- **Backend**: 3 new onboarding endpoints + RAG WebSocket router + Clerk JWT middleware
- **RAG**: Pipeline v6 (Qdrant/Groq) integrated as backend WebSocket service

**What does NOT change:**
- Render (frontend) + Railway (backend) deployment targets
- Existing 70+ backend routers (additive only)
- MUI component library, react-router-dom, Vite build
- AK patient profile data and tumor board components
- CEACAM5/Sanofi intelligence router (already production-grade)

---

## 1. Auth Migration: Supabase → Clerk

### 1.1 Frontend — Clerk Provider

**File: `src/main.jsx`** — Replace Supabase auth with Clerk provider.

```jsx
// CURRENT (Supabase):
import { AuthProvider } from './context/AuthContext';
// wraps <App /> in <AuthProvider>

// NEW (Clerk):
import { ClerkProvider } from '@clerk/clerk-react';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// wraps <App /> in <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
```

**File: `src/context/AuthContext.jsx`** — Rewrite to delegate to Clerk.

The existing AuthContext exposes: `user, session, profile, loading, profileLoading, authenticated, signIn, signUp, signOut, resetPassword, updateProfile, refreshProfile, refreshSession`.

Clerk's `useUser()` and `useSession()` hooks provide `user, isSignedIn, session`. We bridge:

```jsx
import { useUser, useSession, useClerk } from '@clerk/clerk-react';

export const AuthProvider = ({ children }) => {
  const { user: clerkUser, isSignedIn, isLoaded } = useUser();
  const { session: clerkSession } = useSession();
  const clerk = useClerk();

  // Map Clerk user → our user/session shape (preserves downstream interface)
  const user = isSignedIn ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress,
    user_metadata: { 
      full_name: clerkUser.fullName,
      role: clerkUser.publicMetadata?.role || 'patient',
      persona: clerkUser.publicMetadata?.persona,
    },
  } : null;

  const session = isSignedIn ? {
    access_token: clerkSession?.getToken(),  // Clerk session token (JWT)
    user,
  } : null;

  // Profile fetch stays the same — backend /api/auth/profile with Bearer token
  // But now the token is a Clerk JWT, verified by Clerk backend SDK

  // signIn → clerk.signIn({ identifier, password })
  // signUp → clerk.signUp({ emailAddress, password })
  // signOut → clerk.signOut()
  // resetPassword → clerk.client?.resetPassword(...)
  // updateProfile → clerk.user?.update({ ... }) + backend PUT /api/auth/profile

  const value = {
    user, session, profile, loading: !isLoaded,
    profileLoading, authenticated: isSignedIn,
    signIn, signUp, signOut, resetPassword, updateProfile,
    refreshProfile, refreshSession,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

**Key decision**: AuthContext keeps the same exported interface so that all 40+ components consuming `useAuth()` continue to work without changes. Only the internals swap from Supabase to Clerk.

**File: `src/context/PersonaContext.jsx`** — Add `pharma` persona.

```jsx
// CURRENT ROLE_TO_PERSONA:
const ROLE_TO_PERSONA = {
  patient: 'patient',
  clinician: 'oncologist',
  oncologist: 'oncologist',
  researcher: 'researcher',
  admin: 'researcher',
  enterprise: 'researcher',
};

// NEW — add pharma:
const ROLE_TO_PERSONA = {
  patient: 'patient',
  clinician: 'oncologist',
  oncologist: 'oncologist',
  researcher: 'researcher',
  admin: 'researcher',
  enterprise: 'researcher',
  pharma: 'pharma',           // NEW
  'pharma_exec': 'pharma',    // NEW
  hospital: 'oncologist',     // Hospital = oncologist variant (tumor board access)
};

// NEW PERSONA_ACCESS entry:
pharma: {
  pages: [
    '/pharma/dashboard',
    '/pharma/onboarding',
    '/pharma/rag-chat',
    '/pharma/ceacam5',
    '/pharma/intelligence',
    '/home',
    '/profile',
  ],
  features: [
    'view_pharma_dashboard',
    'rag_chat',
    'view_ceacam5_intelligence',
    'view_sanofi_payload',
    'gate_simulation',
  ],
},

// Add to value object:
isPharma: persona === 'pharma',
```

**File: `src/components/auth/Login.jsx`** — Replace custom login form with Clerk's `<SignIn />` component, OR keep custom form and call `clerk.signIn()`. Decision: **Keep custom MUI form** (matches existing UI), call Clerk client API underneath.

**File: `src/components/auth/Signup.jsx`** — Add persona selector (Patient / Oncologist / Pharma). Role stored in Clerk `publicMetadata.role`.

```jsx
// Add to signup form:
const PERSONAS = [
  { value: 'patient', label: 'Patient' },
  { value: 'clinician', label: 'Oncologist / Clinician' },
  { value: 'pharma', label: 'Pharma / Biotech' },
];
// On submit: clerk.signUp({ emailAddress, password, publicMetadata: { role: selectedRole } })
```

**File: `src/components/auth/AuthRedirect.jsx`** — Add pharma redirect.

```jsx
// CURRENT:
if (persona === 'patient') navigate('/ayesha-trials');
else navigate('/home');

// NEW:
if (persona === 'patient') navigate('/ayesha-trials');
else if (persona === 'pharma') navigate('/pharma/dashboard');
else navigate('/home');  // oncologist, researcher, hospital
```

**File: `src/components/auth/ProtectedRoute.jsx`** — Replace session check with Clerk `isSignedIn`.

```jsx
// CURRENT: const { session, loading } = useAuth();
//          if (!loading && !session) navigate('/login')

// NEW: const { authenticated, loading } = useAuth();
//      if (!loading && !authenticated) navigate('/login')
// (AuthContext already maps Clerk isSignedIn → authenticated)
```

**File: `src/lib/apiConfig.js`** — No change needed. API_ROOT stays `https://crispro-backend-v2-production.up.railway.app`. The Bearer token sent to the backend changes from Supabase JWT to Clerk JWT.

**File: `src/utils/sessionPersistence.js`** — Becomes vestigial. Clerk manages session persistence internally. Keep file but make it a no-op passthrough (don't delete — other code imports it).

**File: `package.json`** — Add Clerk dependency.

```json
"dependencies": {
  "@clerk/clerk-react": "^5.0.0",
  // ... existing deps unchanged
}
```

**File: `.env` (Render env vars)** — Add:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2F2ZWQtdW5pY29ybi04MC5jbGVyay5hY2NvdW50cy5kZXYk
VITE_ENABLE_MOCK_AUTH=false
```

### 1.2 Backend — Clerk JWT Verification

**File: `api/middleware/auth_middleware.py`** — Replace Supabase JWT verification with Clerk JWT verification.

```python
# CURRENT: Verifies JWT using SUPABASE_JWT_SECRET
#   payload = jwt.decode(token, SUPABASE_JWT_SECRET, algorithms=["HS256"], audience="authenticated")

# NEW: Verifies Clerk JWT using Clerk public keys (JWKS)
# Clerk issues RS256 JWTs. We fetch Clerk's JWKS from their well-known endpoint.

import jwt
import httpx
from fastapi import HTTPException, Header
from typing import Optional, Dict, Any
import os
import logging

logger = logging.getLogger(__name__)

CLERK_ISSUER = os.getenv("CLERK_ISSUER", "https://saved-unicorn-80.clerk.accounts.dev")
CLERK_JWKS_URL = f"{CLERK_ISSUER}/.well-known/jwks.json"

# Cache JWKS (refresh every hour)
_jwks_cache = None
_jwks_cache_time = 0

async def get_clerk_jwks():
    global _jwks_cache, _jwks_cache_time
    import time
    if _jwks_cache and (time.time() - _jwks_cache_time) < 3600:
        return _jwks_cache
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.get(CLERK_JWKS_URL)
        resp.raise_for_status()
        _jwks_cache = resp.json()
        _jwks_cache_time = time.time()
        return _jwks_cache

async def verify_clerk_token(authorization: Optional[str] = Header(None)) -> Dict[str, Any]:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    token = authorization.replace("Bearer ", "")
    
    try:
        # Decode header to get kid
        unverified_header = jwt.get_unverified_header(token)
        kid = unverified_header.get("kid")
        
        jwks = await get_clerk_jwks()
        signing_key = None
        for key in jwks.get("keys", []):
            if key.get("kid") == kid:
                signing_key = jwt.algorithms.RSAAlgorithm.from_jwk(key)
                break
        
        if not signing_key:
            raise HTTPException(status_code=401, detail="Unable to find matching key")
        
        payload = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            options={"verify_aud": False},  # Clerk JWTs don't use audience
        )
        
        return {
            "user_id": payload.get("sub"),
            "email": payload.get("email"),
            "role": payload.get("role") or "authenticated",
            "public_metadata": payload.get("public_metadata", {}),
            "exp": payload.get("exp"),
            "raw_payload": payload,
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

# Keep get_current_user interface identical
async def get_current_user(token_data: Dict[str, Any] = Depends(verify_clerk_token)) -> Dict[str, Any]:
    return token_data
```

**File: `api/routers/auth.py`** — Modify signup/login to use Clerk.

The existing auth router has 516 lines with Supabase-backed signup/login/logout/profile/refresh/me/health/mfa endpoints. Strategy:

1. **Keep `/api/auth/profile` (GET) and `/api/auth/profile` (PUT)** — These fetch/update user profile from our DB. They work with any JWT via `get_current_user`. No change needed except the middleware swap above.

2. **Deprecate `/api/auth/signup` and `/api/auth/login`** — Clerk handles these client-side. Keep the endpoints as thin wrappers that accept Clerk user data and create/update our DB profile:

```python
# NEW endpoint: POST /api/auth/clerk-sync
# Called by frontend after Clerk signup/signin to sync user to our DB
@router.post("/api/auth/clerk-sync")
async def clerk_sync(user: Dict[str, Any] = Depends(get_current_user)):
    """Sync Clerk user to our database. Called after Clerk auth."""
    user_id = user["user_id"]
    role = user.get("public_metadata", {}).get("role", "patient")
    
    # Create or update profile in our DB
    profile = await auth_service.upsert_profile(
        user_id=user_id,
        email=user.get("email"),
        role=role,
        full_name=user.get("public_metadata", {}).get("full_name"),
    )
    
    # If patient, create empty patient profile
    if role == "patient":
        try:
            from ..services.patient_service import get_patient_service
            patient_service = get_patient_service()
            await patient_service.create_patient_profile(user_id, {
                "disease": "ovarian_cancer_hgs",
                "treatment_line": 0
            })
        except Exception as e:
            logger.warning(f"Failed to create patient profile: {e}")
    
    return {"success": True, "data": profile}
```

3. **Add `pharma` to `ALLOWED_SIGNUP_ROLES`**:

```python
# CURRENT:
ALLOWED_SIGNUP_ROLES = frozenset({"researcher", "clinician", "patient"})
# NEW:
ALLOWED_SIGNUP_ROLES = frozenset({"researcher", "clinician", "patient", "pharma"})
```

**File: `api/services/auth_service.py`** — Add `upsert_profile` method. The existing service has Supabase client wrapper. We keep Supabase for profile storage (it's a DB, not just auth) but swap auth verification to Clerk.

**File: `requirements.txt`** — Add:
```
cryptography>=42.0.0
# PyJWT already present — needs RSA support via cryptography
```

**File: Railway env vars** — Add:
```
CLERK_ISSUER=https://saved-unicorn-80.clerk.accounts.dev
CLERK_SECRET_KEY=sk_test_bVbrN4ZfXSZxjVegdIvtzL3wuadkTy4uWpMvab8KXf
# Remove: SUPABASE_JWT_SECRET (no longer used for auth verification)
# Keep: SUPABASE_URL, SUPABASE_KEY (still used for profile DB storage)
```

---

## 2. Persona Routing — 4 Personas

### 2.1 Frontend Route Changes

**File: `src/routes/index.js`** — Add pharma routes to the aggregate.

```js
// CURRENT:
import authRoutes from './authRoutes';
import coreRoutes from './coreRoutes';
import moatRoutes from './moatRoutes';
import patientRoutes from './patientRoutes';
import oncologistRoutes from './oncologistRoutes';
import researchRoutes from './researchRoutes';
import legacyRoutes from './legacyRoutes';

// NEW — add pharmaRoutes:
import pharmaRoutes from './pharmaRoutes';
// ... aggregate all including pharmaRoutes
```

**NEW File: `src/routes/pharmaRoutes.jsx`**

```jsx
import React from 'react';
import { lazy } from 'react';

const PharmaDashboard = lazy(() => import('../pages/pharma/PharmaDashboard'));
const PharmaOnboarding = lazy(() => import('../pages/pharma/PharmaOnboarding'));
const PharmaRAGChat = lazy(() => import('../pages/pharma/PharmaRAGChat'));
const PharmaCEACAM5 = lazy(() => import('../pages/pharma/PharmaCEACAM5'));

const pharmaRoutes = [
  { path: '/pharma/dashboard', element: <PharmaDashboard /> },
  { path: '/pharma/onboarding', element: <PharmaOnboarding /> },
  { path: '/pharma/rag-chat', element: <PharmaRAGChat /> },
  { path: '/pharma/ceacam5', element: <PharmaCEACAM5 /> },
];

export default pharmaRoutes;
```

**File: `src/components/auth/PersonaRoute.jsx`** — Add pharma to allowed personas.

```jsx
// CURRENT: checks persona against allowed list (patient, oncologist, researcher)
// NEW: add 'pharma' to the allowed personas check
```

**File: `src/components/auth/AuthRedirect.jsx`** — Already covered in §1.1.

### 2.2 Navigation

**File: `src/config/moatNavigation.js`** — Add pharma navigation items.

```js
// Add to moatNavigationItems array:
{
  name: 'pharma-dashboard',
  label: 'Dashboard',
  icon: 'Dashboard',
  link: '/pharma/dashboard',
  description: 'Brenus pharma intelligence dashboard',
  color: '#0279EE',
  personas: ['pharma']
},
{
  name: 'pharma-rag-chat',
  label: 'RAG Intelligence',
  icon: 'Chat',
  link: '/pharma/rag-chat',
  description: 'Query Brenus knowledge base with RAG',
  color: '#75A025',
  personas: ['pharma']
},
{
  name: 'pharma-ceacam5',
  label: 'CEACAM5 Intelligence',
  icon: 'Science',
  link: '/pharma/ceacam5',
  description: 'CEACAM5/Sanofi mechanism alignment analysis',
  color: '#FF9400',
  personas: ['pharma']
},
```

**File: `src/components/layout/ImprovedSidebar.jsx`** — Already uses `getNavigationForPersona()`. No change needed — it will automatically pick up the new pharma items from moatNavigation.js.

### 2.3 Hospital Persona

Hospital is an **oncologist variant**, not a separate persona. The tumor board (`PatientStrategyBoard`) is already accessible to oncologists at `/ayesha/tumor-board`. Hospital users sign up as `clinician` role, get `oncologist` persona, and see the tumor board with AK context.

No new code needed — existing routing handles this. The only addition is a "Hospital" label option in the signup form's institution field.

---

## 3. Patient Flow — Simplified Ovarian Onboarding → AK Dashboard

### 3.1 Frontend

**File: `src/pages/patient/PatientOnboarding.jsx`** — Simplify to ovarian-only.

The existing form already defaults to `disease: 'ovarian_cancer_hgs'` and `stage: 'IVB'`. Changes:

1. **Remove disease selector** — Lock to ovarian cancer. Replace the disease dropdown with a static display:
```jsx
// CURRENT: <TextField select label="Disease" ...>
//   options: ovarian_cancer_hgs, ovarian_cancer_lgs, breast_cancer, etc.
// NEW:
<Typography variant="body2" color="text.secondary">
  Disease: High-Grade Serous Ovarian Cancer (HGS)
</Typography>
// formData.disease stays 'ovarian_cancer_hgs' — hardcoded
```

2. **Reduce required fields** — Only: full_name, stage, CA-125, germline status, treatment line, location. Biomarkers (TMB, MSI, HRD, platinum response) become optional accordion section (already exists).

3. **Redirect after completion** — Go to `/ayesha-trials` (AK dashboard) instead of showing completion screen:
```jsx
// CURRENT: setShowCompletion(true) — shows intake level + recommendations
// NEW: navigate('/ayesha-trials') — go straight to AK dashboard
```

4. **Pre-fill with AK data** — If user is the AK patient (email ak@ak.com or mock), pre-fill form with AK profile data from `ayesha_11_17_25.js`:
```jsx
import { AYESHA_11_17_25_PROFILE } from '../constants/patients/ayesha_11_17_25';
// In useState init:
const isAK = user?.email === 'ak@ak.com';
const akProfile = isAK ? AYESHA_11_17_25_PROFILE : null;
const [formData, setFormData] = useState({
  full_name: akProfile?.display_name || '',
  disease: 'ovarian_cancer_hgs',
  stage: akProfile?.stage || 'IVB',
  // ...
});
```

### 3.2 Backend

**File: `api/routers/patient.py`** — The existing `PUT /api/patient/profile` endpoint already handles the onboarding payload. No change needed — it accepts disease, stage, ca125_value, germline_status, treatment_line, location, and optional biomarkers.

The endpoint returns `intake_level` (L0/L1/L2), `confidence_cap`, and `recommendations` — this stays the same.

---

## 4. Pharma Flow — Brenus Dashboard + RAG Chat + CEACAM5

### 4.1 Pharma Onboarding

**NEW File: `src/pages/pharma/PharmaOnboarding.jsx`**

```jsx
// MUI form with fields:
// - Company name (required)
// - Your role (CEO, BD, Clinical Ops, Research, Other)
// - Therapeutic area (Oncology, Immuno-oncology, Other)
// - Asset of interest (STC-1010, CEACAM5, Other)
// - Use case (Trial positioning, Competitive intelligence, Biomarker strategy, Other)
// 
// On submit: PUT /api/pharma/profile with Bearer token
// Redirect to /pharma/dashboard
```

**NEW Backend File: `api/routers/pharma.py`**

```python
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from ..middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/api/pharma", tags=["pharma"])

class PharmaProfileCreate(BaseModel):
    company_name: str = Field(..., description="Pharma company name")
    user_role: str = Field(..., description="User role at company")
    therapeutic_area: str = Field("Oncology")
    asset_of_interest: str = Field("STC-1010")
    use_case: str = Field("Trial positioning")

# In-memory storage (upgrade to Supabase table later)
_pharma_profiles: Dict[str, dict] = {}

@router.put("/profile")
async def update_pharma_profile(
    profile: PharmaProfileCreate,
    user: Dict[str, Any] = Depends(get_current_user)
):
    user_id = user["user_id"]
    _pharma_profiles[user_id] = {**profile.model_dump(), "user_id": user_id}
    return {"success": True, "profile": _pharma_profiles[user_id]}

@router.get("/profile")
async def get_pharma_profile(user: Dict[str, Any] = Depends(get_current_user)):
    user_id = user["user_id"]
    return _pharma_profiles.get(user_id, {"user_id": user_id, "company_name": None})
```

**File: `api/main.py`** — Register pharma router:
```python
from .routers import pharma as pharma_router
app.include_router(pharma_router.router)
```

### 4.2 Pharma Dashboard

**NEW File: `src/pages/pharma/PharmaDashboard.jsx`**

```jsx
// Layout: MUI Grid with cards
// Card 1: "Brenus Intelligence" → link to /pharma/rag-chat
// Card 2: "CEACAM5 / Sanofi Analysis" → link to /pharma/ceacam5
// Card 3: "Gate Simulator" → embeds ceacam5 gate-simulate widget
// Card 4: "Trial Comparators" → table from /api/ceacam5/comparators
// Card 5: "Sanofi Executive Payload" → from /api/ceacam5/sanofi-payload
//
// Uses existing backend endpoints:
//   GET  /api/ceacam5/scenarios
//   GET  /api/ceacam5/comparators
//   GET  /api/ceacam5/sanofi-payload
//   POST /api/ceacam5/gate-simulate
// All already exist in ceacam5_demo.py (1080 lines, production-grade)
```

### 4.3 CEACAM5 Intelligence Page

**NEW File: `src/pages/pharma/PharmaCEACAM5.jsx`**

This page wraps the existing CEACAM5 backend endpoints into a production MUI interface:
- **Scenarios panel**: GET `/api/ceacam5/scenarios` → MUI Cards
- **Gate Simulator**: POST `/api/ceacam5/gate-simulate` with sliders for enrollment pool, CEACAM5 fraction, ORR → live computation
- **Comparator Table**: GET `/api/ceacam5/comparators` → MUI DataGrid with trial name, NCT ID, fit_A score, evidence tier, mechanism validity
- **Sanofi Payload**: GET `/api/ceacam5/sanofi-payload` → persona-specific executive arguments + archetype table

All data comes from the existing `ceacam5_demo.py` router. No new backend work needed.

### 4.4 RAG Chat — Verba UI Ported to MUI/Vite

This is the most substantial new frontend component. We port Verba's `ChatInterface.tsx` (692 lines, TypeScript/Next.js/Tailwind) to a MUI/Vite/JSX component.

**NEW File: `src/pages/pharma/PharmaRAGChat.jsx`** — Main RAG chat page.

**Architecture** (ported from Verba ChatInterface):

```
PharmaRAGChat.jsx
├── ChatMessageList.jsx      (ported from ChatMessage.tsx — markdown + citations)
├── ChatInput.jsx            (text input + send button + suggestions)
├── ChatSourcePanel.jsx      (ported from ChatView document explorer — retrieved chunks)
├── ChatConfig.jsx           (ported from ChatConfig.tsx — RAG config panel)
└── useRAGSocket.js          (custom hook — WebSocket connection to backend)
```

**Porting conversions:**

| Verba (TypeScript/Next.js/Tailwind) | CrisPRO (JSX/Vite/MUI) |
|---|---|
| `"use client"` directive | Remove — standard Vite React |
| TypeScript interfaces | Remove type annotations |
| `react-icons` (FiSend, FiTrash, etc.) | MUI icons (`Send`, `Delete`, etc.) |
| TailwindCSS classes (`className="bg-base-200 ..."`) | MUI `sx` props or `styled()` |
| DaisyUI components (`btn`, `card`, `badge`) | MUI `Button`, `Card`, `Chip` |
| `react-markdown` + `react-syntax-highlighter` | Keep both — already in package.json or add |
| Verba WebSocket `/ws/generate_stream` | Our backend `/ws/rag/stream` |
| Verba API `sendUserQuery` POST | Our backend `POST /api/rag/chat` |
| Verba `fetchRAGConfig` GET | Our backend `GET /api/rag/config` |

**NEW File: `src/hooks/useRAGSocket.js`** — WebSocket hook.

```js
import { useState, useEffect, useRef, useCallback } from 'react';
import { WS_ROOT } from '../lib/apiConfig';

export function useRAGSocket(sessionToken) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    // Connect to backend WebSocket
    const wsUrl = `${WS_ROOT}/ws/rag/stream?token=${sessionToken}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => setIsConnected(false);
    ws.onerror = (err) => console.error('RAG WebSocket error:', err);

    setSocket(ws);
    return () => ws.close();
  }, [sessionToken]);

  const sendMessage = useCallback((payload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  return { socket, isConnected, sendMessage };
}
```

**ChatMessage rendering** (ported from Verba ChatMessage.tsx):

```jsx
// ChatMessageList.jsx
import ReactMarkdown from 'react-markdown';
import { Box, Typography, Chip, Card, CardContent, Link, Divider } from '@mui/material';

export default function ChatMessage({ message }) {
  const isUser = message.type === 'user';
  
  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', mb: 2 }}>
      <Box sx={{ maxWidth: '75%' }}>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5 }}>
          {isUser ? 'You' : 'CrisPRO RAG'}
        </Typography>
        <Card sx={{ 
          bgcolor: isUser ? 'primary.main' : 'background.paper',
          color: isUser ? 'common.white' : 'text.primary',
        }}>
          <CardContent>
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </CardContent>
        </Card>
        {/* Source citations — ported from Verba's source cards */}
        {message.sources?.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">Sources:</Typography>
            {message.sources.map((src, i) => (
              <Chip 
                key={i} 
                label={`[${src.chunk_id}] ${src.title} (${src.score.toFixed(3)})`}
                size="small" 
                sx={{ mr: 0.5, mb: 0.5 }}
                onClick={() => {/* expand source text */}}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
```

**WebSocket message protocol** (our backend, not Verba's):

```
// Client → Server:
{ "type": "query", "query": "What is STC-1010's mechanism?", "conversation": [...] }

// Server → Client (streamed tokens):
{ "type": "token", "content": "STC" }
{ "type": "token", "content": "-1010" }
{ "type": "token", "content": " is a" }
...
{ "type": "sources", "sources": [{ "chunk_id": "p1_0", "title": "...", "score": 0.89, "text": "..." }] }
{ "type": "done", "full_text": "STC-1010 is a haptenated...", "evaluation": { "faithfulness": 0.92, "relevancy": 0.88, "composite": 0.90, "pass": true } }
{ "type": "error", "message": "Guardrail triggered: ..." }
```

---

## 5. Backend RAG Router — Pipeline v6 Integration

### 5.1 New RAG Router

**NEW File: `api/routers/rag.py`** — Integrates pipeline v6 as a FastAPI router with WebSocket streaming.

```python
"""
CrisPRO RAG Router — Brenus Knowledge Base

Integrates brenus_rag_pipeline_v6.py (Qdrant + Groq + RAGAS) with FastAPI.

Endpoints:
  GET  /api/rag/health           → Health check (Qdrant + Groq connectivity)
  GET  /api/rag/config           → RAG configuration (collections, model, guardrails)
  POST /api/rag/chat             → Synchronous RAG query (returns full response)
  WS   /ws/rag/stream            → Streaming RAG query (token-by-token via WebSocket)
  GET  /api/rag/suggestions      → Query suggestions (optional)
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import logging
import asyncio
import json

from ..middleware.auth_middleware import get_current_user

router = APIRouter(tags=["rag"])
logger = logging.getLogger(__name__)

# RAG pipeline v6 — imported lazily to avoid startup failures if Qdrant is down
_rag_instance = None

def get_rag():
    global _rag_instance
    if _rag_instance is None:
        # Import pipeline v6 (copied into backend)
        from .rag_pipeline import Brenus_RAG
        _rag_instance = Brenus_RAG(
            qdrant_url=os.getenv("QDRANT_URL"),
            qdrant_api_key=os.getenv("QDRANT_API_KEY"),
            groq_key=os.getenv("GROQ_API_KEY"),
            gen_model="llama-3.3-70b-versatile",
            judge_model="llama-3.3-70b-versatile",
        )
    return _rag_instance

class RAGQueryRequest(BaseModel):
    query: str
    conversation: Optional[List[Dict[str, str]]] = None
    top_k: int = 5

@router.get("/api/rag/health")
async def rag_health():
    """Check Qdrant + Groq connectivity."""
    try:
        rag = get_rag()
        # Quick health check
        return {
            "status": "healthy",
            "qdrant": "connected",
            "groq": "connected",
            "collections": ["brenus_p1_benchmarks", "brenus_p2_trials_decoded", 
                          "brenus_p3_gaps", "brenus_p4_crispro_offer"],
            "guardrails": len(rag.guardrails),
        }
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@router.get("/api/rag/config")
async def rag_config():
    """Return RAG configuration."""
    return {
        "retriever": {
            "collections": ["brenus_p1_benchmarks", "brenus_p2_trials_decoded",
                          "brenus_p3_gaps", "brenus_p4_crispro_offer"],
            "top_k": 5,
            "vector_dim": 768,
            "distance": "COSINE",
            "embedding_model": "all-mpnet-base-v2",
        },
        "generator": {
            "model": "llama-3.3-70b-versatile",
            "provider": "groq",
        },
        "guardrails": [
            {"pattern": "0.7375", "action": "RETIRED", "message": "STC-1010 fit=0.7375 RETIRED. Canonical: 0.6944."},
            {"pattern": "0.366", "action": "QUARANTINED", "message": "LATIFY delta 0.366 QUARANTINED."},
            {"pattern": "0.2641", "action": "QUARANTINED", "message": "LATIFY delta 0.2641 QUARANTINED."},
            {"pattern": "DDR_0983", "action": "BLOCKING", "message": "DDR 0.983 publication-blocking."},
            {"pattern": "PATH B", "action": "PROHIBITED", "message": "PATH B formula prohibited."},
            {"pattern": "HT29 confirmed", "action": "CONFLICT", "message": "SC-001 active conflict."},
            {"pattern": "CT051", "action": "PRESS_RELEASE_ONLY", "message": "CT051 quantitative DTH values are press-release only."},
        ],
        "evaluator": {
            "method": "RAGAS LLM-as-judge",
            "metrics": ["faithfulness", "answer_relevancy"],
            "pass_threshold": 0.70,
        },
    }

@router.post("/api/rag/chat")
async def rag_chat(
    request: RAGQueryRequest,
    user: Dict[str, Any] = Depends(get_current_user)
):
    """Synchronous RAG query — returns full response with citations + evaluation."""
    try:
        rag = get_rag()
        result = rag.query(request.query, conversation=request.conversation)
        return {
            "success": True,
            "query": result.query,
            "answer": result.answer,
            "citations": [c.to_dict() for c in result.citations],
            "guardrail_violations": result.guardrail_violations,
            "evaluation": result.evaluation,
            "latency_ms": result.latency_ms,
        }
    except Exception as e:
        logger.error(f"RAG query failed: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.websocket("/ws/rag/stream")
async def rag_stream(websocket: WebSocket):
    """Streaming RAG query via WebSocket — token-by-token generation."""
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            if payload.get("type") != "query":
                continue
            
            query = payload["query"]
            conversation = payload.get("conversation", [])
            
            try:
                rag = get_rag()
                
                # 1. Retrieve
                retrieved = rag.retrieve(query)
                
                # 2. Send sources immediately
                sources = [{
                    "chunk_id": r.chunk_id,
                    "title": r.title,
                    "score": r.score,
                    "text": r.text[:500],  # Preview
                } for r in retrieved]
                await websocket.send_text(json.dumps({
                    "type": "sources",
                    "sources": sources,
                }))
                
                # 3. Generate with streaming
                full_text = ""
                async for token in rag.generate_stream(query, retrieved, conversation):
                    full_text += token
                    await websocket.send_text(json.dumps({
                        "type": "token",
                        "content": token,
                    }))
                
                # 4. Evaluate
                evaluation = rag.evaluate(query, retrieved, full_text)
                
                # 5. Send done
                await websocket.send_text(json.dumps({
                    "type": "done",
                    "full_text": full_text,
                    "evaluation": evaluation,
                }))
                
            except Exception as e:
                await websocket.send_text(json.dumps({
                    "type": "error",
                    "message": str(e),
                }))
                
    except WebSocketDisconnect:
        logger.info("RAG WebSocket disconnected")
```

### 5.2 Pipeline v6 Copy

**NEW File: `api/routers/rag_pipeline.py`** — Copy of `brenus_rag_pipeline_v6.py` (526 lines) adapted for backend integration.

Key adaptations:
1. Add `generate_stream()` async generator method to `Generator` class for token-by-token streaming via Groq's streaming API
2. Add `to_dict()` methods to `RetrievedChunk` and `RAGResult` dataclasses
3. Make Qdrant/Groq credentials come from env vars instead of hardcoded
4. Add connection pooling for Qdrant client

```python
# In Generator class, add:
async def generate_stream(self, query, retrieved_chunks, conversation=None):
    """Async generator that yields tokens from Groq streaming API."""
    context = self._build_context(retrieved_chunks)
    messages = self._build_messages(query, context, conversation)
    
    stream = self.groq_client.chat.completions.create(
        model=self.gen_model,
        messages=messages,
        stream=True,
        temperature=0.3,
        max_tokens=2048,
    )
    
    for chunk in stream:
        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content
```

### 5.3 Backend Registration

**File: `api/main.py`** — Add RAG router + WebSocket.

```python
# Add to imports:
from .routers import rag as rag_router

# Add to router registration:
app.include_router(rag_router.router)
logger.info("✅ RAG router registered (Qdrant + Groq + RAGAS)")
```

**File: `requirements.txt`** — Add:
```
qdrant-client>=1.7.0
sentence-transformers>=2.5.0
groq>=0.5.0
ragas>=0.1.0
```

**File: Railway env vars** — Add:
```
QDRANT_URL=https://***REDACTED_QDRANT_URL***
QDRANT_API_KEY=***REDACTED_QDRANT_KEY***
GROQ_API_KEY=***REDACTED_GROQ_KEY***
```

### 5.4 CORS Update

**File: `api/constants/cors.py`** — Ensure production frontend is in allowed origins (already is).

No change needed — `crispro-front-end.onrender.com` is already in `CORS_ALLOW_ORIGINS`.

---

## 6. Implementation Order — 5 Parallel Workers

### Worker A: Backend Auth + Clerk (worker-a)
1. Modify `api/middleware/auth_middleware.py` — Clerk JWT verification (JWKS)
2. Modify `api/routers/auth.py` — Add `/api/auth/clerk-sync`, add `pharma` to allowed roles
3. Modify `api/services/auth_service.py` — Add `upsert_profile` method
4. Add `cryptography` to `requirements.txt`
5. Test: JWT verification with Clerk test token

### Worker B: Backend RAG + Pharma Router (worker-b)
1. Create `api/routers/rag_pipeline.py` — Pipeline v6 adapted for backend
2. Create `api/routers/rag.py` — RAG router with WebSocket streaming
3. Create `api/routers/pharma.py` — Pharma profile endpoints
4. Modify `api/main.py` — Register rag + pharma routers
5. Add `qdrant-client`, `sentence-transformers`, `groq`, `ragas` to `requirements.txt`
6. Test: RAG health endpoint, synchronous chat, WebSocket streaming

### Worker C: Frontend Auth + Persona (worker-c)
1. Modify `src/main.jsx` — Add ClerkProvider
2. Rewrite `src/context/AuthContext.jsx` — Delegate to Clerk
3. Modify `src/context/PersonaContext.jsx` — Add pharma persona
4. Modify `src/components/auth/Login.jsx` — Clerk signIn
5. Modify `src/components/auth/Signup.jsx` — Persona selector + Clerk signUp
6. Modify `src/components/auth/AuthRedirect.jsx` — Pharma redirect
7. Modify `src/components/auth/ProtectedRoute.jsx` — Clerk isSignedIn
8. Add `@clerk/clerk-react` to `package.json`
9. Create `src/routes/pharmaRoutes.jsx`

### Worker D: Frontend Pharma Pages + RAG Chat (worker-d)
1. Create `src/pages/pharma/PharmaOnboarding.jsx`
2. Create `src/pages/pharma/PharmaDashboard.jsx`
3. Create `src/pages/pharma/PharmaCEACAM5.jsx`
4. Create `src/pages/pharma/PharmaRAGChat.jsx` — Verba UI port
5. Create `src/components/rag/ChatMessageList.jsx`
6. Create `src/components/rag/ChatInput.jsx`
7. Create `src/components/rag/ChatSourcePanel.jsx`
8. Create `src/hooks/useRAGSocket.js`
9. Modify `src/config/moatNavigation.js` — Add pharma nav items
10. Modify `src/routes/index.js` — Import pharmaRoutes

### Worker E: Frontend Patient Simplification (worker-e)
1. Modify `src/pages/patient/PatientOnboarding.jsx` — Lock to ovarian, simplify, redirect to AK dashboard
2. Verify `AyeshaPatientDashboard.jsx` works with simplified onboarding
3. Verify tumor board (`PatientStrategyBoard.jsx`) accessible to oncologist persona
4. Test patient flow end-to-end

---

## 7. Deployment Steps

### 7.1 Backend (Railway)

1. Commit all backend changes to `crispro-backend-v2` repo
2. Push to GitHub → Railway auto-deploys
3. Set Railway env vars:
   - `CLERK_ISSUER=https://saved-unicorn-80.clerk.accounts.dev`
   - `CLERK_SECRET_KEY=sk_test_bVbrN4ZfXSZxjVegdIvtzL3wuadkTy4uWpMvab8KXf`
   - `QDRANT_URL=https://***REDACTED_QDRANT_URL***`
   - `QDRANT_API_KEY=***REDACTED_QDRANT_KEY_SEG***...`
   - `GROQ_API_KEY=***REDACTED_GROQ_KEY***`
4. Verify: `GET /ping` → `{"ok": true}`
5. Verify: `GET /api/rag/health` → `{"status": "healthy", ...}`
6. Verify: `GET /api/ceacam5/health` → existing endpoint works

### 7.2 Frontend (Render)

1. Commit all frontend changes to `crispro-front-end` repo
2. Push to GitHub → Render auto-deploys
3. Set Render env vars:
   - `VITE_CLERK_PUBLISHABLE_KEY=pk_test_c2F2ZWQtdW5pY29ybi04MC5jbGVyay5hY2NvdW50cy5kZXYk`
   - `VITE_ENABLE_MOCK_AUTH=false`
4. Verify: Frontend loads at `crispro-front-end.onrender.com`
5. Verify: Clerk login works
6. Verify: Pharma dashboard loads
7. Verify: RAG chat connects to WebSocket

### 7.3 Clerk Dashboard Configuration

1. Enable email/password authentication
2. Set production origins: `crispro-front-end.onrender.com`
3. Create roles in publicMetadata: `patient`, `clinician`, `pharma`
4. Configure redirect URLs: after sign-in → `/home`, after sign-up → onboarding

---

## 8. Risk Assessment

| Risk | Impact | Mitigation |
|---|---|---|
| Clerk JWT verification fails on backend | All auth breaks | Test with real Clerk token before deploy; keep Supabase fallback for 24h |
| Qdrant connection timeout on Railway cold start | RAG chat fails | Lazy-load RAG instance; health endpoint reports status; graceful error in UI |
| `sentence-transformers` too heavy for Railway | Build/deploy fails | Pre-compute embeddings offline; use Qdrant pre-computed vectors only (no runtime embedding model needed if we embed query via Groq or lightweight model) |
| WebSocket connection blocked by Render/Railway proxy | RAG streaming fails | Fallback to HTTP SSE (Server-Sent Events) or polling |
| Clerk free tier limits | Auth rate limits | Test tier limits; upgrade if needed |
| Existing patient flow breaks | AK dashboard inaccessible | Worker E tests end-to-end before merge |

### 8.1 Critical Decision: sentence-transformers on Railway

The RAG pipeline v6 uses `all-mpnet-base-v2` (768-dim) for query embedding. This model is ~420MB and requires PyTorch. On Railway, this may cause:
- Slow cold starts (model loading)
- Memory pressure (model in RAM)

**Mitigation options (choose one):**
- **Option A**: Install `sentence-transformers` on Railway, accept ~500MB memory overhead. Simplest, works if Railway plan has enough RAM.
- **Option B**: Use a lightweight embedding API (e.g., Groq doesn't offer embeddings, but we could use OpenAI `text-embedding-3-small` at 1536-dim — would require re-indexing Qdrant). More complex.
- **Option C**: Pre-compute query embeddings via a separate microservice or serverless function. Over-engineered for now.

**Recommendation**: Option A. Railway's default plan should handle 500MB. Monitor memory after deploy.

---

## 9. Testing Plan

### 9.1 Backend Tests
1. `GET /ping` → 200
2. `GET /api/rag/health` → Qdrant + Groq connected
3. `POST /api/rag/chat` with query "What is STC-1010?" → answer + citations + evaluation
4. WebSocket `/ws/rag/stream` → tokens stream + sources + done
5. `GET /api/ceacam5/comparators` → 6+ comparators with PATH A scores
6. `POST /api/auth/clerk-sync` with Clerk JWT → profile created
7. `PUT /api/pharma/profile` → profile stored

### 9.2 Frontend Tests
1. Clerk login → redirect based on persona
2. Patient onboarding → simplified form → AK dashboard
3. Pharma dashboard → CEACAM5 cards load
4. Pharma RAG chat → WebSocket connects → query → streamed response + citations
5. Oncologist → tumor board accessible
6. Navigation sidebar → persona-filtered items

### 9.3 Integration Tests
1. Full patient flow: Login → onboarding → AK dashboard → tumor board
2. Full pharma flow: Login → onboarding → dashboard → RAG chat → CEACAM5
3. Full oncologist flow: Login → dashboard → patient profile → tumor board
4. RAG guardrail test: Query containing "0.7375" → guardrail triggered
5. RAG evaluation: Query → composite score ≥ 0.70

---

## 10. File Change Summary

### Backend (crispro-backend-v2) — 7 files modified, 3 files created

| File | Action | Lines |
|---|---|---|
| `api/middleware/auth_middleware.py` | MODIFY — Clerk JWT verification | ~80 new |
| `api/routers/auth.py` | MODIFY — Add clerk-sync, pharma role | ~40 new |
| `api/services/auth_service.py` | MODIFY — Add upsert_profile | ~30 new |
| `api/routers/rag.py` | CREATE — RAG router + WebSocket | ~180 new |
| `api/routers/rag_pipeline.py` | CREATE — Pipeline v6 adapted | ~550 (copy + adapt) |
| `api/routers/pharma.py` | CREATE — Pharma profile endpoints | ~60 new |
| `api/main.py` | MODIFY — Register rag + pharma routers | ~6 new |
| `api/constants/cors.py` | VERIFY — No change needed | 0 |
| `requirements.txt` | MODIFY — Add 4 packages | ~4 new |

### Frontend (crispro-front-end) — 10 files modified, 10 files created

| File | Action | Lines |
|---|---|---|
| `src/main.jsx` | MODIFY — ClerkProvider | ~5 new |
| `src/context/AuthContext.jsx` | REWRITE — Clerk delegation | ~120 (full rewrite) |
| `src/context/PersonaContext.jsx` | MODIFY — Add pharma | ~40 new |
| `src/components/auth/Login.jsx` | MODIFY — Clerk signIn | ~30 changed |
| `src/components/auth/Signup.jsx` | MODIFY — Persona selector | ~40 new |
| `src/components/auth/AuthRedirect.jsx` | MODIFY — Pharma redirect | ~5 new |
| `src/components/auth/ProtectedRoute.jsx` | MODIFY — Clerk check | ~5 changed |
| `src/config/moatNavigation.js` | MODIFY — Pharma nav items | ~30 new |
| `src/routes/index.js` | MODIFY — Import pharmaRoutes | ~2 new |
| `src/pages/patient/PatientOnboarding.jsx` | MODIFY — Simplify ovarian-only | ~40 changed |
| `package.json` | MODIFY — Add @clerk/clerk-react | ~1 new |
| `src/routes/pharmaRoutes.jsx` | CREATE | ~20 new |
| `src/pages/pharma/PharmaOnboarding.jsx` | CREATE | ~150 new |
| `src/pages/pharma/PharmaDashboard.jsx` | CREATE | ~200 new |
| `src/pages/pharma/PharmaCEACAM5.jsx` | CREATE | ~250 new |
| `src/pages/pharma/PharmaRAGChat.jsx` | CREATE | ~300 new |
| `src/components/rag/ChatMessageList.jsx` | CREATE | ~80 new |
| `src/components/rag/ChatInput.jsx` | CREATE | ~60 new |
| `src/components/rag/ChatSourcePanel.jsx` | CREATE | ~100 new |
| `src/hooks/useRAGSocket.js` | CREATE | ~40 new |

**Total new code**: ~2,300 lines across 23 files (13 created, 10 modified)
**Existing code preserved**: 70+ backend routers, 40+ frontend pages, AK profile, tumor board, CEACAM5 router

---

## 11. What This Plan Does NOT Do

- Does NOT create v3 frontend or use stubs
- Does NOT replace the 70+ existing backend routers
- Does NOT change the deployment infrastructure (Render + Railway)
- Does NOT touch the CEACAM5/Sanofi intelligence router (already production-grade)
- Does NOT modify the AK patient profile data
- Does NOT change the PATH A formula (locked 2026-04-28)
- Does NOT implement NGS report parsing (tumor.py `ingest_ngs` stays 501)
- Does NOT add new databases (keeps Supabase for profile storage, Qdrant for RAG)
- Does NOT implement Hospital as a separate persona (it's an oncologist variant)
