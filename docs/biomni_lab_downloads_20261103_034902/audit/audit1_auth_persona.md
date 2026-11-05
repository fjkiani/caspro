# Audit 1: Frontend Auth + Persona System

## 1. AuthContext.jsx
```jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveToStorage, loadFromStorage, removeFromStorage, isSessionValid, extendSession, SESSION_KEYS } from '../utils/sessionPersistence';
import { API_ROOT } from '../lib/apiConfig';
// Auth: Supabase-backed in production. Mock auth available in dev via VITE_ENABLE_MOCK_AUTH=true.

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);


  // Fetch user profile - try with email if no token, fallback to mock if backend unavailable
  const fetchUserProfile = async (email, sessionToken = null) => {
    setProfileLoading(true);
    try {
      // Try to get profile - backend may need JWT, but we'll try email first
      let response;
      if (sessionToken) {
        response = await fetch(`${API_ROOT}/api/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${sessionToken}`,
            'Content-Type': 'application/json'
          }
        });
      } else if (email) {
        // Try without auth first (may not work, but worth trying)
        response = await fetch(`${API_ROOT}/api/auth/profile?email=${encodeURIComponent(email)}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        setProfileLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setProfile(data.data || data);
        console.log('✅ User profile loaded:', data.data || data);
      } else if (response.status === 404) {
        // FIX-5c: Mock profile fallback is now gated behind VITE_ENABLE_MOCK_AUTH.
        if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
          console.log('ℹ️ Backend auth endpoint not found - using mock profile (VITE_ENABLE_MOCK_AUTH=true)');
          const mockProfile = {
            user_id: `mock-user-${email?.replace('@', '-at-')}`,
            email: email || 'ak@ak.com',
            tier: 'free',
            role: 'patient',
            full_name: email?.split('@')[0] || 'Test User',
            is_mock: true
          };
          setProfile(mockProfile);
        } else {
          console.warn('⚠️ Profile endpoint returned 404. User profile unavailable.');
          setProfile(null);
        }
      } else {
        console.warn('⚠️ Could not fetch profile (may need backend auth endpoint):', response.status);
        // FIX-5c: Mock profile fallback is now gated behind VITE_ENABLE_MOCK_AUTH.
        if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
          const mockProfile = {
            user_id: `mock-user-${email?.replace('@', '-at-')}`,
            email: email || 'ak@ak.com',
            tier: 'free',
            role: 'patient',
            full_name: email?.split('@')[0] || 'Test User',
            is_mock: true
          };
          setProfile(mockProfile);
        } else {
          setProfile(null);
        }
      }
    } catch (error) {
      console.warn('⚠️ Profile fetch failed (backend may require auth):', error.message);
      // FIX-5c: Mock profile fallback is now gated behind VITE_ENABLE_MOCK_AUTH.
      if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
        const mockProfile = {
          user_id: `mock-user-${email?.replace('@', '-at-')}`,
          email: email || 'ak@ak.com',
          tier: 'free',
          role: 'patient',
          full_name: email?.split('@')[0] || 'Test User',
          is_mock: true
        };
        setProfile(mockProfile);
      } else {
        setProfile(null);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  // Check for existing session in localStorage and restore on app startup
  useEffect(() => {
    const checkMockSession = async () => {
      try {
        const sessionData = loadFromStorage(SESSION_KEYS.AUTH_SESSION);

        if (sessionData && isSessionValid(sessionData)) {
          // Session is valid - restore it
          console.log('✅ Restoring valid session from localStorage');
          setSession(sessionData);
          setUser(sessionData.user);

          // If session is close to expiring, refresh it proactively
          const now = Date.now();
          const expiresAt = sessionData.expires_at;
          const timeUntilExpiry = expiresAt - now;
          const refreshThreshold = 24 * 60 * 60 * 1000; // Refresh if less than 24 hours remaining

          if (timeUntilExpiry < refreshThreshold) {
            console.log('🔄 Session expiring soon, refreshing proactively...');
            const refreshedSession = extendSession(sessionData, 7);
            if (refreshedSession) {
              setSession(refreshedSession);
            }
          }

          if (sessionData.user?.email) {
            // Don't await profile fetch - let it happen in background so we don't block app render
            fetchUserProfile(sessionData.user.email, sessionData.access_token).catch(e =>
              console.warn('Background profile fetch failed:', e)
            );
          }
        } else if (sessionData) {
          // Session exists but is expired - clear it
          console.log('⚠️ Session expired, clearing...');
          removeFromStorage(SESSION_KEYS.AUTH_SESSION);
        } else {
          // FIX-5a: MARS MODE is now gated behind VITE_ENABLE_MOCK_AUTH.
          // In production (VITE_ENABLE_MOCK_AUTH unset or "false"), no session is auto-created.
          // Users are redirected to /login by ProtectedRoute as expected.
          if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
            console.log('ℹ️ No stored session found. MARS MODE active (VITE_ENABLE_MOCK_AUTH=true): Auto-regenerating session for AK.');

            const mockUser = {
              id: 'mock_user_001',
              email: 'ak@ak.com',
              user_metadata: { email: 'ak@ak.com', role: 'patient' },
              created_at: new Date().toISOString(),
              is_mock: true
            };

            const mockSession = {
              access_token: `mock-token-${Date.now()}-auto`,
              refresh_token: `mock-refresh-${Date.now()}`,
              expires_in: 7 * 24 * 60 * 60,
              expires_at: Date.now() + (7 * 24 * 60 * 60 * 1000),
              token_type: 'bearer',
              user: mockUser,
            };

            saveToStorage(SESSION_KEYS.AUTH_SESSION, mockSession);
            setSession(mockSession);
            setUser(mockUser);

            // Background fetch profile
            fetchUserProfile('ak@ak.com', mockSession.access_token).catch(console.warn);
          } else {
            console.log('ℹ️ No stored session found. Redirecting to login.');
            // Leave user/session null — ProtectedRoute will redirect to /login.
          }
        }
      } catch (error) {
        console.error('❌ Error checking mock session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkMockSession();
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('🔐 Attempting authentication:', email);

      // Try backend authentication first
      try {
        console.log('📡 Contacting backend for auth...');
        const response = await fetch(`${API_ROOT}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Backend authentication successful');

          const user = {
            id: result.data?.user_id || result.data?.user?.id,
            email: result.data?.email || email,
            user_metadata: result.data?.profile || {},
            created_at: new Date().toISOString(),
          };

          const session = {
            access_token: result.data?.session?.access_token || result.data?.session?.token,
            refresh_token: result.data?.session?.refresh_token,
            expires_in: result.data?.session?.expires_in || (7 * 24 * 60 * 60), // Default 7 days
            expires_at: result.data?.session?.expires_at || (Date.now() + (7 * 24 * 60 * 60 * 1000)), // Default 7 days
            token_type: 'bearer',
            user: user,
          };

          // Store session in localStorage using utility
          saveToStorage(SESSION_KEYS.AUTH_SESSION, session);

          // Set state
          setSession(session);
          setUser(user);

          // Fetch profile
          await fetchUserProfile(email, session.access_token);

          return { data: { user, session }, error: null };
        } else {
          // Check for 404 (endpoint not found) vs 401 (unauthorized)
          if (response.status === 404 || response.status === 405) {
            console.warn('⚠️ Backend auth endpoint missing, falling back to mock.');
            throw new Error('Backend auth endpoint missing');
          }

          const errorData = await response.json().catch(() => ({ detail: 'Login failed' }));
          console.warn('⚠️ Backend login failed:', errorData);

          // FIX-5b: AK hardcoded bypass is now gated behind VITE_ENABLE_MOCK_AUTH.
          // In production, any failed login returns an error — no mock fallback for specific emails.
          if (import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'true') {
            return { data: null, error: new Error(errorData.detail || 'Login failed') };
          }
          if (email !== 'ak@ak.com' && email !== 'ak@aol.com') {
            return { data: null, error: new Error(errorData.detail || 'Login failed') };
          }
          throw new Error('Fallback to mock for test user (VITE_ENABLE_MOCK_AUTH=true)');
        }
      } catch (backendError) {
        // Only fall back to mock when explicitly enabled (local dev only).
        // In production (VITE_ENABLE_MOCK_AUTH != 'true'), propagate the real error.
        if (import.meta.env.VITE_ENABLE_MOCK_AUTH !== 'true') {
          console.error('❌ Backend authentication failed:', backendError.message);
          return { data: null, error: new Error(backendError.message || 'Authentication failed. Please try again.') };
        }

        console.warn('⚠️ Backend unavailable/failed, using mock authentication (dev mode):', backendError.message);

        // Fallback to mock authentication (dev only)
        const mockUser = {
          id: `mock-user-${email.replace('@', '-at-')}`,
          email: email,
          user_metadata: {
            email: email,
          },
          created_at: new Date().toISOString(),
          is_mock: true
        };

        const mockSession = {
          access_token: `mock-token-${Date.now()}-${email}`,
          refresh_token: `mock-refresh-${Date.now()}`,
          expires_in: 7 * 24 * 60 * 60, // 7 days in seconds
          expires_at: Date.now() + (7 * 24 * 60 * 60 * 1000), // 7 days in milliseconds
          token_type: 'bearer',
          user: mockUser,
        };

        console.log('💾 Saving mock session to storage...');
        saveToStorage(SESSION_KEYS.AUTH_SESSION, mockSession);

        setSession(mockSession);
        setUser(mockUser);

        console.log('👤 Fetching mock profile...');
        await fetchUserProfile(email, mockSession.access_token);

        console.log('✅ Mock authentication successful (backend unavailable)');
        return { data: { user: mockUser, session: mockSession }, error: null };
      }
    } catch (error) {
      console.error('❌ Authentication failed:', error);
      return { data: null, error };
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    // Try backend signup first, then fallback to mock
    try {
      const response = await fetch(`${API_ROOT}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, ...metadata }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Backend signup successful');
        // Sign in with the new account
        return await signIn(email, password);
      } else {
        const errorData = await response.json().catch(() => ({ detail: 'Signup failed' }));
        if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
          console.warn('⚠️ Backend signup failed, using mock (dev mode):', errorData);
          return await signIn(email, password);
        }
        return { data: null, error: new Error(errorData.detail || 'Signup failed') };
      }
    } catch (error) {
      if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true') {
        console.warn('⚠️ Backend signup unavailable, using mock (dev mode):', error.message);
        return await signIn(email, password);
      }
      return { data: null, error: new Error('Signup service unavailable. Please try again.') };
    }
  };

  const signOut = async () => {
    try {
      // Try backend logout if we have a real token
      if (session?.access_token && !session.access_token.startsWith('mock-token-')) {
        try {
          await fetch(`${API_ROOT}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
              'Content-Type': 'application/json'
            }
          });
        } catch (e) {
          console.warn('Backend logout failed:', e);
        }
      }

      removeFromStorage(SESSION_KEYS.AUTH_SESSION);
      localStorage.removeItem('mock_auth_session');
      setUser(null);
      setSession(null);
      setProfile(null);
      console.log('✅ Signed out');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    console.log('🔐 Password reset requested for:', email);
    // TODO: Implement backend password reset
    return { error: null };
  };

  const updateProfile = async (updates) => {
    if (!user?.email) {
      throw new Error('Not authenticated');
    }

    try {
      const url = session?.access_token
        ? `${API_ROOT}/api/auth/profile`
        : `${API_ROOT}/api/auth/profile?email=${encodeURIComponent(user.email)}`;

      const headers = session?.access_token
        ? {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        }
        : {
          'Content-Type': 'application/json'
        };

      const response = await fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
      });

      if (!response.ok) {
        // If backend fails, update local state
        setProfile(prev => ({ ...prev, ...updates }));
        return { data: { ...profile, ...updates }, error: null };
      }

      const data = await response.json();
      setProfile(data.data);
      return { data, error: null };
    } catch (error) {
      // If backend fails, update local state
      setProfile(prev => ({ ...prev, ...updates }));
      return { data: { ...profile, ...updates }, error: null };
    }
  };

  // Auto-refresh session before expiration (runs every 5 minutes)
  useEffect(() => {
    if (!session || !session.expires_at) return;

    const checkAndRefreshSession = () => {
      if (!isSessionValid(session)) {
        console.log('⚠️ Session expired, clearing...');
        removeFromStorage(SESSION_KEYS.AUTH_SESSION);
        setSession(null);
        setUser(null);
        setProfile(null);
        return;
      }

      const now = Date.now();
      const expiresAt = session.expires_at;
      const timeUntilExpiry = expiresAt - now;
      const refreshThreshold = 24 * 60 * 60 * 1000; // Refresh if less than 24 hours remaining

      if (timeUntilExpiry > 0 && timeUntilExpiry < refreshThreshold) {
        console.log('🔄 Auto-refreshing session (expires soon)...');
        const refreshedSession = extendSession(session, 7);
        if (refreshedSession) {
          setSession(refreshedSession);
        }
      }
    };

    // Check immediately
    checkAndRefreshSession();

    // Check every 5 minutes
    const interval = setInterval(checkAndRefreshSession, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [session]);

  // Persist profile to localStorage when it changes
  useEffect(() => {
    if (profile && user?.email) {
      try {
        const profileKey = `user_profile_${user.email}`;
        localStorage.setItem(profileKey, JSON.stringify(profile));
        console.log('💾 Saved user profile to localStorage');
      } catch (error) {
        console.warn('⚠️ Failed to save profile to localStorage:', error);
      }
    }
  }, [profile, user]);

  // Restore profile from localStorage on mount if available
  useEffect(() => {
    if (user?.email && !profile && !profileLoading) {
      try {
        const profileKey = `user_profile_${user.email}`;
        const storedProfile = localStorage.getItem(profileKey);
        if (storedProfile) {
          const parsed = JSON.parse(storedProfile);
          console.log('✅ Restored user profile from localStorage');
          setProfile(parsed);
        }
      } catch (error) {
        console.warn('⚠️ Failed to restore profile from localStorage:', error);
      }
    }
  }, [user?.email, profile, profileLoading]);

  const value = {
    user,
    session,
    profile,
    loading,
    profileLoading,
    authenticated: !!user,
    isSupabaseEnabled: true, // Supabase-backed in production
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshProfile: async () => {
      if (user?.email) {
        await fetchUserProfile(user.email, session?.access_token);
      }
    },
    refreshSession: () => {
      if (session) {
        const refreshedSession = extendSession(session, 7);
        if (refreshedSession) {
          setSession(refreshedSession);
          console.log('✅ Session refreshed manually');
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
```

## 2. PersonaContext.jsx
```jsx
import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

const PersonaContext = createContext({});

export const usePersona = () => {
  const context = useContext(PersonaContext);
  if (!context) {
    throw new Error('usePersona must be used within PersonaProvider');
  }
  return context;
};

// Persona access matrix - Finalized based on MOAT Frontend Design
const PERSONA_ACCESS = {
  patient: {
    pages: [
      '/patient/profile',
      '/patient/onboarding',
      '/ayesha-complete-care',
      '/ayesha-trials',
      '/patient/tasks',
      '/home',
      '/profile',
      // Allow patients to access research and other tools (read-only or limited)
      '/research-intelligence',
      '/clinical-genomics',
      '/synthetic-lethality',
      '/dosing-guidance',
      '/metastasis',
      '/ddr-status',
      '/sentinel',
    ],
    features: [
      'view_own_profile',
      'view_own_care_plan',
      'view_own_trials',
      'basic_drug_efficacy',
      // Patient can view their own complete care plan (read-only)
      'view_own_complete_care',
    ],
  },
  oncologist: {
    pages: [
      '/patient/profile',
      '/patient/onboarding',
      '/ayesha-complete-care',
      '/ayesha-trials',
      '/patient/tasks',
      '/medical-records',
      '/research',
      '/research-intelligence',
      '/clinical-genomics',
      '/validate',
      '/myeloma-digital-twin',
      '/metastasis',
      '/synthetic-lethality',
      '/dosing-guidance',
      '/threat-assessor',
      '/radonc-co-pilot',
      '/universal-dossiers',
      '/universal-trial-intelligence',
      '/universal-complete-care', // MOAT: Complete care plan for any patient
      '/doctor-dashboard',
      '/workload-dashboard',
      '/screening-schedules',
      '/outreach',
      '/mutation-explorer',
      '/agent-dashboard',
      '/agents',
      '/home',
      '/profile',
      '/dashboard',
      '/sentinel',
    ],
    features: [
      'view_patient_profiles',
      'manage_patients',
      'clinical_tools',
      'treatment_planning',
      'trial_matching',
      'dosing_guidance',
      'mutation_analysis',
      'agent_dashboard',
      // MOAT: Oncologist has full access to orchestrator capabilities for their patients
      'orchestrator_pipeline', // Full MOAT pipeline execution for patient care
      'file_upload', // VCF/PDF/MAF upload for patient data
      'status_polling', // Real-time pipeline progress tracking
      'resistance_playbook', // Resistance prediction and management
      'sae_features', // SAE feature display for mechanism understanding
      'mechanism_fit', // Mechanism-based trial matching
      'complete_care_plan', // Generate and view complete care plans
    ],
  },
  researcher: {
    pages: [
      '*', // All pages (includes /orchestrator, /universal-complete-care, /universal-trial-intelligence)
    ],
    features: [
      '*', // All features (includes all MOAT capabilities)
    ],
  },
};

// Map database roles to personas
const ROLE_TO_PERSONA = {
  patient: 'patient',
  clinician: 'oncologist',
  oncologist: 'oncologist',
  researcher: 'researcher',
  admin: 'researcher', // Admins get researcher access
  enterprise: 'researcher',
};

export const PersonaProvider = ({ children }) => {
  const { profile, user } = useAuth();

  // Determine persona from profile
  const persona = useMemo(() => {
    if (!profile && !user) {
      return null;
    }

    // Check profile persona field first
    if (profile?.persona) {
      return profile.persona;
    }

    // Fall back to role mapping
    const role = profile?.role || user?.role || 'researcher';
    return ROLE_TO_PERSONA[role] || 'researcher';
  }, [profile, user]);

  // Check if persona has access to a page
  const hasPageAccess = (pagePath) => {
    if (!persona) return false;

    const access = PERSONA_ACCESS[persona];
    if (!access) return false;

    // Researcher has access to all pages
    if (access.pages.includes('*')) return true;

    // Check exact match
    if (access.pages.includes(pagePath)) return true;

    // Check prefix match (e.g., '/medical-records' matches '/medical-records/:id')
    return access.pages.some((allowedPage) => {
      if (allowedPage.endsWith('/*')) {
        const prefix = allowedPage.slice(0, -2);
        return pagePath.startsWith(prefix);
      }
      return false;
    });
  };

  // Check if persona has access to a feature
  const hasFeatureAccess = (featureName) => {
    if (!persona) return false;

    const access = PERSONA_ACCESS[persona];
    if (!access) return false;

    // Researcher has access to all features
    if (access.features.includes('*')) return true;

    return access.features.includes(featureName);
  };

  // Get all accessible pages for current persona
  const getAccessiblePages = () => {
    if (!persona) return [];

    const access = PERSONA_ACCESS[persona];
    if (!access) return [];

    if (access.pages.includes('*')) {
      return ['*']; // All pages
    }

    return access.pages;
  };

  // Get all accessible features for current persona
  const getAccessibleFeatures = () => {
    if (!persona) return [];

    const access = PERSONA_ACCESS[persona];
    if (!access) return [];

    if (access.features.includes('*')) {
      return ['*']; // All features
    }

    return access.features;
  };

  const value = {
    persona,
    hasPageAccess,
    hasFeatureAccess,
    getAccessiblePages,
    getAccessibleFeatures,
    isPatient: persona === 'patient',
    isOncologist: persona === 'oncologist',
    isResearcher: persona === 'researcher',
  };

  return (
    <PersonaContext.Provider value={value}>
      {children}
    </PersonaContext.Provider>
  );
};

```

## 3. AuthRedirect.jsx
```jsx
/**
 * AuthRedirect - Redirects to /login if not authenticated, or appropriate page if authenticated
 * 
 * Usage: Use as the element for the root route ("/")
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePersona } from '../context/PersonaContext';

const AuthRedirect = () => {
  const { authenticated, loading, profileLoading, profile } = useAuth();
  const { persona, personaLoading } = usePersona();
  const location = useLocation();

  // Show loading while auth/profile/persona is loading
  if (loading || profileLoading || personaLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!authenticated) {
    console.log('🔐 Not authenticated - redirecting to /login');
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If authenticated as patient (Ayesha), redirect to trials page
  if (persona === 'patient' || profile?.role === 'patient') {
    console.log('✅ Patient authenticated - redirecting to /ayesha-trials');
    return <Navigate to="/ayesha-trials" replace />;
  }

  // Otherwise, redirect to home
  console.log('✅ Authenticated - redirecting to /home');
  return <Navigate to="/home" replace />;
};

export default AuthRedirect;
```

## 4. Login.jsx
```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SimpleLoginCard } from '../../components/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, profile, authenticated, profileLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect after profile loads or after a short delay if profile doesn't load
  useEffect(() => {
    if (authenticated && !profileLoading) {
      const redirect = () => {
        const intendedPath = new URLSearchParams(window.location.search).get('redirect');
        // FIX-5b: Route based on profile.role only — no hardcoded email routing.
        const isPatient = profile?.role === 'patient';
        if (isPatient) {
          navigate('/ayesha-trials', { replace: true });
        } else if (intendedPath) {
          navigate(intendedPath, { replace: true });
        } else {
          navigate('/home', { replace: true });
        }
      };

      // If profile is loaded, redirect immediately
      if (profile) {
        redirect();
      } else {
        // If no profile after 3 seconds, redirect to home (profile may still be loading async)
        const timeout = setTimeout(() => {
          redirect();
        }, 3000);
        return () => clearTimeout(timeout);
      }
    }
  }, [authenticated, profile, profileLoading, navigate, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔵 Login form submitted for:', email);

    // FIX-5b: EMERGENCY BYPASS FOR AK — gated behind VITE_ENABLE_MOCK_AUTH.
    // In production (VITE_ENABLE_MOCK_AUTH unset or "false"), this block is never entered.
    // ak@ak.com must authenticate through the real backend like any other user.
    if (import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true' &&
        (email.toLowerCase() === 'ak@ak.com' || email.toLowerCase() === 'ak@aol.com')) {
      console.log('🚀 MARS MODE Bypass for AK (VITE_ENABLE_MOCK_AUTH=true)...');

      const mockSession = {
        access_token: `mock-token-${Date.now()}-ak`,
        refresh_token: `mock-refresh-${Date.now()}`,
        expires_in: 7 * 24 * 60 * 60,
        expires_at: Date.now() + (7 * 24 * 60 * 60 * 1000),
        token_type: 'bearer',
        user: {
          id: 'mock_user_001',
          email: email,
          user_metadata: { email: email, role: 'patient' },
          role: 'patient'
        }
      };

      try {
        localStorage.setItem('mock_auth_session', JSON.stringify(mockSession));
        localStorage.setItem(`user_profile_${email}`, JSON.stringify({
          user_id: 'mock_user_001',
          email: email,
          role: 'patient',
          full_name: 'Ayesha K.',
          is_mock: true
        }));

        console.log('✅ Bypass session written. Forcing reload...');
        window.location.href = '/ayesha-trials';
        return;
      } catch (bypassErr) {
        console.error('❌ Bypass failed:', bypassErr);
      }
    }

    try {
      const { data, error } = await signIn(email, password);

      if (error) {
        console.error('❌ Login error:', error);
        setError(error.message || 'Login failed');
        setLoading(false);
        return;
      }

      if (data?.user) {
        // Profile will be loaded asynchronously by AuthContext
        // Redirect will happen via useEffect when profile is available
        // Just wait here - don't navigate yet
        console.log('✅ Login successful, waiting for profile to load...');
      }
    } catch (err) {
      console.error('❌ Login exception:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      // Always clear loading — redirect is handled by the useEffect watching `authenticated`.
      // Keeping loading=true after a failed login would freeze the form.
      setLoading(false);
    }
  };

  // If already authenticated, show manual continue button (Stop the loop)
  if (authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md w-full">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Already Logged In</h3>
          <p className="text-gray-500 mb-6">
            Session valid for {profile?.email || email || 'User'}.
          </p>
          <button
            onClick={() => navigate('/ayesha-trials', { replace: true })}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Continue to Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="mt-3 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Logout & Reset
          </button>
        </div>
      </div>
    );
  }

  // Show loading while profile is being fetched after login
  if (authenticated && profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <SimpleLoginCard
      email={email}
      password={password}
      error={error}
      loading={loading}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      onSignupClick={() => navigate('/signup')}
      onForgotPasswordClick={() => navigate('/forgot-password')}
      subtitle="Sign in with your CrisPRO account"
    />
  );
};

export default Login;








```

## 5. Signup.jsx
```jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    institution: '',
    role: 'researcher'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    try {
      const metadata = {
        full_name: formData.fullName,
        institution: formData.institution,
        role: formData.role
      };

      const { data, error } = await signUp(formData.email, formData.password, metadata);

      if (error) {
        setError(error.message || 'Signup failed');
        setLoading(false);
        return;
      }

      if (data?.user) {
        setSuccess(true);
        // Show success message and redirect after 2 seconds
        setTimeout(() => {
          navigate('/login?message=Account created. Please check your email for confirmation.');
        }, 2000);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            <h3 className="font-semibold">Account created successfully!</h3>
            <p className="mt-2">Please check your email to confirm your account.</p>
          </div>
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Go to login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution (Optional)
              </label>
              <input
                id="institution"
                name="institution"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="University of..."
                value={formData.institution}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="researcher">Researcher</option>
                <option value="clinician">Clinician</option>
                <option value="admin">Admin</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <p className="text-xs text-center text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            Research Use Only - Not for Clinical Decision Making.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;








```

## 6. ProtectedRoute.jsx
```jsx
import React, { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { API_ROOT } from '../../lib/apiConfig';

/**
 * ProtectedRoute — guards routes behind authentication.
 *
 * In production (VITE_ENABLE_MOCK_AUTH != 'true'):
 *   On first mount, verifies the stored token against GET /api/auth/profile.
 *   If the backend returns 401, clears storage and redirects to /login.
 *   This catches stale tokens that pass the localStorage validity check but
 *   are rejected by the backend (e.g. after a Supabase secret rotation).
 *
 * In dev (VITE_ENABLE_MOCK_AUTH=true):
 *   Skips the backend verification call — mock tokens would always fail it.
 */
const ProtectedRoute = ({ children }) => {
  const { authenticated, loading, session, signOut } = useAuth();
  const navigate = useNavigate();
  const verifiedRef = useRef(false);

  useEffect(() => {
    // Only verify once per mount, only in production, only when authenticated
    if (
      verifiedRef.current ||
      import.meta.env.VITE_ENABLE_MOCK_AUTH === 'true' ||
      !authenticated ||
      !session?.access_token
    ) return;

    verifiedRef.current = true;

    // Skip verification for mock tokens (dev tokens that slipped through)
    if (session.access_token.startsWith('mock-token-')) return;

    fetch(`${API_ROOT}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(async (res) => {
        if (res.status === 401) {
          console.warn('⚠️ Stored token rejected by backend — clearing session and redirecting to login.');
          await signOut();
          navigate('/login', { replace: true });
        }
        // 200 or other errors: leave session intact
      })
      .catch(() => {
        // Network error — backend may be down. Don't sign out; let the user stay.
        console.warn('⚠️ Token verification network error — keeping session.');
      });
  }, [authenticated, session, signOut, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
```

## 7. PersonaRoute.jsx
```jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePersona } from '../../context/PersonaContext';
import { useAuth } from '../../context/AuthContext';

/**
 * PersonaRoute - Route guard based on persona access
 * 
 * @param {React.ReactNode} children - Child components to render
 * @param {string[]} allowedPersonas - Array of personas allowed to access this route
 * @param {string} redirectTo - Path to redirect unauthorized users (default: '/home')
 */
const PersonaRoute = ({ children, allowedPersonas = [], redirectTo = '/home' }) => {
  const { persona, hasPageAccess } = usePersona();
  const { authenticated, loading, profile } = useAuth();
  const location = useLocation();

  // Show loading while auth is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Require authentication
  if (!authenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // If no persona, deny access
  if (!persona) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600">Unable to determine user persona. Please contact support.</p>
        </div>
      </div>
    );
  }

  // Check if persona is in allowed list
  // Special case: If user has patient role from AuthContext, allow access to patient-accessible pages
  const isPatientFromAuth = profile?.role === 'patient';
  const isPatientPage = location.pathname.startsWith('/patient/') || 
                        location.pathname.startsWith('/ayesha-') ||
                        hasPageAccess(location.pathname);
  
  // Allow patients to access pages in their allowed list, even if route says oncologist/researcher only
  if (allowedPersonas.length > 0 && !allowedPersonas.includes(persona)) {
    // If patient and page is in their allowed list, allow access
    if (isPatientFromAuth && isPatientPage) {
      // Allow - patient can access their own pages, continue to render
    } else {
      // Block - not in allowed personas and not a patient-accessible page
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-4">
              This page is only accessible to: {allowedPersonas.join(', ')}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Your current role: <span className="font-semibold">{persona || profile?.role || 'unknown'}</span>
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
  }

  // Check page-level access (if persona has access to this specific page)
  // Allow patients to access their own pages even if not in persona access matrix
  const isPatientAccessiblePage = location.pathname.startsWith('/patient/') || 
                                   location.pathname.startsWith('/ayesha-') ||
                                   (profile?.role === 'patient' && hasPageAccess(location.pathname));
  
  if (!hasPageAccess(location.pathname) && !isPatientAccessiblePage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have permission to access this page.
          </p>
          <button
            onClick={() => window.location.href = redirectTo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // All checks passed, render children
  return children;
};

export default PersonaRoute;

```

## 8. PatientRoute.jsx
```jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * PatientRoute - Route protection for patient-specific pages
 * 
 * Ensures user is authenticated before accessing patient routes.
 * Similar to ProtectedRoute but specifically for patient-facing pages.
 */
const PatientRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PatientRoute;

```

## 9. sessionPersistence.js
```js
/**
 * Session Persistence Utility
 * 
 * Centralized utilities for managing session persistence across the application.
 * Handles localStorage operations, session validation, and state restoration.
 */

const SESSION_KEYS = {
  AUTH_SESSION: 'mock_auth_session',
  SPORADIC_CONTEXT: 'sporadic_context_state',
  USER_PROFILE: (email) => `user_profile_${email}`,
  ANALYSIS_HISTORY: 'myeloma_digital_twin_history',
  ACTIVITIES: 'globalActivities',
};

/**
 * Save data to localStorage with error handling
 */
export const saveToStorage = (key, data) => {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
    console.log(`💾 Saved to localStorage: ${key}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Failed to save to localStorage (${key}):`, error);
    // Handle quota exceeded error
    if (error.name === 'QuotaExceededError') {
      console.error('❌ localStorage quota exceeded - clearing old data');
      clearOldStorageData();
      // Retry once
      try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError);
        return false;
      }
    }
    return false;
  }
};

/**
 * Load data from localStorage with error handling
 */
export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log(`✅ Loaded from localStorage: ${key}`);
      return parsed;
    }
    return defaultValue;
  } catch (error) {
    console.warn(`⚠️ Failed to load from localStorage (${key}):`, error);
    return defaultValue;
  }
};

/**
 * Remove data from localStorage
 */
export const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key);
    console.log(`🗑️  Removed from localStorage: ${key}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Failed to remove from localStorage (${key}):`, error);
    return false;
  }
};

/**
 * Clear old storage data to free up space
 * Keeps only the most recent 10 items for each key
 */
const clearOldStorageData = () => {
  try {
    // Clear old analysis history (keep only last 10)
    const history = loadFromStorage(SESSION_KEYS.ANALYSIS_HISTORY, []);
    if (Array.isArray(history) && history.length > 10) {
      saveToStorage(SESSION_KEYS.ANALYSIS_HISTORY, history.slice(0, 10));
    }

    // Clear old activities (keep only last 20)
    const activities = loadFromStorage(SESSION_KEYS.ACTIVITIES, []);
    if (Array.isArray(activities) && activities.length > 20) {
      saveToStorage(SESSION_KEYS.ACTIVITIES, activities.slice(0, 20));
    }
  } catch (error) {
    console.error('❌ Error clearing old storage data:', error);
  }
};

/**
 * Check if a session is valid (not expired)
 */
export const isSessionValid = (session) => {
  if (!session || !session.expires_at) {
    return false;
  }
  const now = Date.now();
  const expiresAt = session.expires_at;
  const gracePeriod = 5 * 60 * 1000; // 5 minutes grace period
  return now < (expiresAt + gracePeriod);
};

/**
 * Extend session expiration
 */
export const extendSession = (session, days = 7) => {
  if (!session) return null;
  
  const extended = {
    ...session,
    expires_at: Date.now() + (days * 24 * 60 * 60 * 1000),
    expires_in: days * 24 * 60 * 60,
  };
  
  saveToStorage(SESSION_KEYS.AUTH_SESSION, extended);
  return extended;
};

/**
 * Get all stored session keys (for debugging)
 */
export const getAllSessionKeys = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && (
      key.startsWith('mock_') ||
      key.startsWith('sporadic_') ||
      key.startsWith('user_profile_') ||
      key.startsWith('myeloma_') ||
      key.startsWith('global')
    )) {
      keys.push(key);
    }
  }
  return keys;
};

/**
 * Clear all session data (logout)
 */
export const clearAllSessions = () => {
  const keys = getAllSessionKeys();
  keys.forEach(key => removeFromStorage(key));
  console.log('🗑️  Cleared all session data');
};

/**
 * Export session keys for use in other modules
 */
export { SESSION_KEYS };

/**
 * getAuthToken — Shared auth token reader for all API hooks.
 *
 * The app uses mock_auth_session (set by Login.jsx) as its primary auth store.
 * Supabase is force-disabled (isSupabaseEnabled = false in supabaseClient.js),
 * so this localStorage pattern is intentional and correct for the current auth model.
 *
 * Consumers: useAyeshaTherapyFitBundle, useAyeshaTestsUnlocksBundle,
 *            useDrugDetail, useTumorBoardBundle, useTargetedTherapyBrief,
 *            AgentContext, TherapyHeroSection
 *
 * @returns {string|null} Bearer token or null if unauthenticated
 */
export const getAuthToken = () => {
  try {
    const sessionStr = localStorage.getItem(SESSION_KEYS.AUTH_SESSION);
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      const t = session?.access_token;
      if (t && t !== 'null' && t !== 'undefined') return t;
    }
  } catch (e) {
    console.warn('[getAuthToken] Failed to parse auth session', e);
  }
  // Fallback: raw token stored directly (legacy path)
  const t2 = localStorage.getItem('supabase_auth_token');
  if (t2 && t2 !== 'null' && t2 !== 'undefined') return t2;
  return null;
};
```

## 10. apiConfig.js
```js
/**
 * Centralized API Configuration
 *
 * Single source of truth for the backend API and WebSocket URLs.
 *
 * Local backend without CORS friction:
 * - `vite.config.js` proxies `/api` → `http://localhost:8000`.
 * - In DEV, `API_ROOT` is `''` if `VITE_API_ROOT` is unset or points at
 *   `localhost` / `127.0.0.1` (so typical `.env.local` still uses the proxy).
 * - In DEV, set `VITE_API_ROOT` to a non-loopback URL to hit a remote API.
 *
 * Production: set `VITE_API_ROOT` in `.env.production` / CI (e.g. Railway URL).
 *
 * Usage:
 *   import { API_ROOT, WS_ROOT } from '@/lib/apiConfig';
 *   fetch(`${API_ROOT}/api/...`)
 */

const LOCAL_BACKEND = 'http://localhost:8000';
const LOCAL_WS = 'ws://localhost:8000';

// Production backend — Railway deployment.
// This constant is the authoritative fallback when VITE_API_ROOT is unset,
// missing the https:// prefix, or still pointing at the old Render backend.
// Update this when the Railway service URL changes.
const PRODUCTION_BACKEND = 'https://crispro-backend-v2-production.up.railway.app';
const PRODUCTION_WS = 'https://crispro-backend-v2-production.up.railway.app';

const _rawApi = (import.meta.env.VITE_API_ROOT || '').trim();
const _rawWs = (import.meta.env.VITE_WS_ROOT || '').trim();

/** Normalise a URL string: add https:// if protocol is missing. */
function normaliseUrl(url) {
  if (!url) return '';
  if (/^https?:\/\//i.test(url)) return url;
  if (/^wss?:\/\//i.test(url)) return url;
  // bare hostname — add https://
  return `https://${url}`;
}

/** True when URL points at localhost / 127.0.0.1. */
function isLoopbackUrl(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

/** True when URL points at the old Render backend (no longer the active backend). */
function isStaleRenderBackend(url) {
  return url.includes('crispro-backend-v2.onrender.com');
}

const explicitApi = normaliseUrl(_rawApi);
const explicitWs = normaliseUrl(_rawWs);

/**
 * DEV: same-origin proxy when unset or loopback.
 * PROD: VITE_API_ROOT (normalised) unless it is stale/missing → PRODUCTION_BACKEND.
 */
export const API_ROOT = import.meta.env.DEV
  ? !explicitApi || isLoopbackUrl(explicitApi)
    ? ''
    : explicitApi
  : explicitApi && !isLoopbackUrl(explicitApi) && !isStaleRenderBackend(explicitApi)
    ? explicitApi
    : PRODUCTION_BACKEND;

export const WS_ROOT =
  explicitWs && !isLoopbackUrl(explicitWs) && !isStaleRenderBackend(explicitWs)
    ? explicitWs
    : import.meta.env.DEV
      ? LOCAL_WS
      : PRODUCTION_WS;

export default API_ROOT;
```

## 11. App.jsx
```jsx
/**
 * App.jsx - Main Application Component
 * 
 * Modular Route Architecture:
 * - Routes are organized in /src/routes/ modules
 * - MOAT routes are the primary focus (Tier 1)
 * - Legacy routes maintained for backward compatibility
 * - Experimental routes DEV-gated for production safety
 * 
 * Route Categories:
 * - authRoutes: Authentication and admin routes
 * - coreRoutes: Essential navigation routes
 * - moatRoutes: MOAT Core capabilities (Primary focus)
 * - patientRoutes: Patient persona routes
 * - researchRoutes: Advanced research tools
 * - legacyRoutes: Legacy/unclear routes (evaluation needed)
 * - experimentalRoutes: Experimental routes (DEV-gated)
 * - devRoutes: Development-only routes
 */

import React, { useEffect } from "react";
import { Routes, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { Sidebar, Navbar, MobileNavbar } from "./components";
import ErrorBoundary from "./components/ErrorBoundary";
import { useStateContext } from "./context";
import { ActivityProvider } from "./context/ActivityContext";
import { AnalysisHistoryProvider } from "./context/AnalysisHistoryContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PatientProvider } from "./context/PatientContext";
import { PersonaProvider } from "./context/PersonaContext";
import { CoPilotProvider } from "./components/CoPilot/context";
import { SporadicProvider } from "./context/SporadicContext";
import { AgentProvider } from "./context/AgentContext";
import { CoPilot } from "./components/CoPilot/index.js";
import { Box } from "@mui/material";
import { getAllSessionKeys, isSessionValid, loadFromStorage, SESSION_KEYS } from "./utils/sessionPersistence";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import modular routes
import { getAllRoutes } from "./routes";

// INNER COMPONENT: Consumes Contexts
const AppContent = () => {
  const { currentUser } = useStateContext();
  const { user, authenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !authenticated) {
      // Only redirect if trying to access a protected route (exclude login/signup)
      if (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/forgot-password') {
        navigate('/login');
      }
    }
  }, [authenticated, loading, navigate, location.pathname]);

  // Session health check on app startup (Moved inside logic)
  useEffect(() => {
    const performSessionHealthCheck = () => {
      console.log('🔍 Performing session health check...');
      const authSession = loadFromStorage(SESSION_KEYS.AUTH_SESSION);
      if (authSession) console.log('✅ Auth session is valid');
      else console.log('ℹ️ No auth session found');
    };

    const timeout = setTimeout(performSessionHealthCheck, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Desktop Sidebar */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Sidebar />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { xs: '100%', md: 'auto' },
          pb: { xs: 8, md: 0 },
        }}
      >
        {/* Desktop Top Navbar */}
        <Navbar />

        {/* Page Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 3 },
            maxWidth: { md: '1400px' },
            width: '100%',
            mx: 'auto',
            minHeight: { xs: 'calc(100vh - 56px)', md: 'auto' },
          }}
        >
          <Routes>
            {getAllRoutes().map((route) => route)}
          </Routes>
        </Box>
      </Box>

      {/* Mobile Bottom Navigation */}
      <MobileNavbar />

      {/* Clinical CoPilot - AI Assistant */}
      <CoPilot />
    </Box>
  );
};

// MAIN COMPONENT: Provides Contexts
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,   // 5 min — stop re-fetching on every page visit
        cacheTime: 10 * 60 * 1000,  // 10 min
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <AuthProvider>
            <PersonaProvider>
              <PatientProvider>
                <AgentProvider>
                  <SporadicProvider>
                    <CoPilotProvider>
                      <AnalysisHistoryProvider>
                        <ActivityProvider>
                          <AppContent />
                        </ActivityProvider>
                      </AnalysisHistoryProvider>
                    </CoPilotProvider>
                  </SporadicProvider>
                </AgentProvider>
              </PatientProvider>
            </PersonaProvider>
          </AuthProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
```

## 12. main.jsx
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import { StateContextProvider } from "./context";
import App from "./App";
import "./index.css";

// Note: Response.headers protection is now in index.html as an inline script
// that runs before any modules load, to catch initialization errors

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <StateContextProvider>
      <App />
    </StateContextProvider>
  </Router>
);
```

## 13. auth components listing
total 42
drwxr-xr-x 1 root root  220 Jul  8 07:42 .
drwxr-xr-x 1 root root 1740 Jul  8 07:42 ..
-rw-r--r-- 1 root root 5306 Jul  8 07:42 DNAHelixBackground.jsx
-rw-r--r-- 1 root root 9815 Jul  8 07:42 DNALoginCard.jsx
-rw-r--r-- 1 root root 8518 Jul  8 07:42 MFAEnrollment.jsx
-rw-r--r-- 1 root root 3295 Jul  8 07:42 MFAVerification.jsx
-rw-r--r-- 1 root root  897 Jul  8 07:42 PatientRoute.jsx
-rw-r--r-- 1 root root 4497 Jul  8 07:42 PersonaRoute.jsx
-rw-r--r-- 1 root root 2541 Jul  8 07:42 ProtectedRoute.jsx
-rw-r--r-- 1 root root 5173 Jul  8 07:42 SimpleLoginCard.jsx
-rw-r--r-- 1 root root  538 Jul  8 07:42 index.js

## 14. Supabase imports
/workspace/crispro-front-end/src/components/CoPilotDoctrineGapAnalysis.jsx:252:                  Services: <code>api/services/gene_calibration.py</code>, <code>api/services/supabase_service.py</code>
/workspace/crispro-front-end/src/context/AgentContext.jsx:47:    return localStorage.getItem('supabase_auth_token'); // Fallback
/workspace/crispro-front-end/src/context/AgentContext.jsx:74:        token = localStorage.getItem('supabase_auth_token');
/workspace/crispro-front-end/src/context/AnalysisHistoryContext.jsx:2:import { analysisHistoryService } from '../services/supabaseClient';
/workspace/crispro-front-end/src/hooks/useAyeshaTestsUnlocksBundle.js:16:  const t2 = localStorage.getItem('supabase_auth_token');
/workspace/crispro-front-end/src/hooks/useDrugDetail.js:11:    const t = localStorage.getItem('supabase_auth_token');
/workspace/crispro-front-end/src/hooks/useTargetedTherapyBrief.js:15:    return localStorage.getItem('supabase_auth_token');
/workspace/crispro-front-end/src/hooks/useTumorBoardBundle.js:17:  const t = localStorage.getItem('supabase_auth_token');
/workspace/crispro-front-end/src/services/supabaseClient.js:4:import { createClient } from '@supabase/supabase-js';
/workspace/crispro-front-end/src/services/supabaseClient.js:7:const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
/workspace/crispro-front-end/src/services/supabaseClient.js:8:const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
/workspace/crispro-front-end/src/services/supabaseClient.js:13:    hasUrl: !!supabaseUrl,
/workspace/crispro-front-end/src/services/supabaseClient.js:14:    hasKey: !!supabaseAnonKey,
/workspace/crispro-front-end/src/services/supabaseClient.js:15:    urlLength: supabaseUrl?.length || 0,
/workspace/crispro-front-end/src/services/supabaseClient.js:16:    keyLength: supabaseAnonKey?.length || 0,
/workspace/crispro-front-end/src/services/supabaseClient.js:17:    urlPreview: supabaseUrl ? `${supabaseUrl.substring(0, 30)}...` : 'missing',
/workspace/crispro-front-end/src/services/supabaseClient.js:25:let supabaseClient = null;
/workspace/crispro-front-end/src/services/supabaseClient.js:30:    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
/workspace/crispro-front-end/src/services/supabaseClient.js:39:    supabaseClient = null;
/workspace/crispro-front-end/src/services/supabaseClient.js:78:export const supabase = supabaseClient || mockSupabaseClient;
/workspace/crispro-front-end/src/services/supabaseClient.js:97:      const { data, error } = await supabase
/workspace/crispro-front-end/src/services/supabaseClient.js:127:      const { data, error } = await supabase
/workspace/crispro-front-end/src/services/supabaseClient.js:161:      let query = supabase
/workspace/crispro-front-end/src/services/supabaseClient.js:215:      const { error } = await supabase
/workspace/crispro-front-end/src/services/supabaseClient.js:235:      const { error } = await supabase
/workspace/crispro-front-end/src/services/supabaseClient.js:252:      const { data, error } = await supabase
/workspace/crispro-front-end/src/utils/sessionPersistence.js:165: * Supabase is force-disabled (isSupabaseEnabled = false in supabaseClient.js),
/workspace/crispro-front-end/src/utils/sessionPersistence.js:186:  const t2 = localStorage.getItem('supabase_auth_token');

## 15. Persona determination
/workspace/crispro-front-end/src/context/PersonaContext.jsx:119:  const persona = useMemo(() => {
/workspace/crispro-front-end/src/context/PersonaContext.jsx:204:    isPatient: persona === 'patient',
/workspace/crispro-front-end/src/context/PersonaContext.jsx:205:    isOncologist: persona === 'oncologist',
/workspace/crispro-front-end/src/context/PersonaContext.jsx:206:    isResearcher: persona === 'researcher',

## 16. Auth deps in package.json
    "@supabase/supabase-js": "^2.56.0",
    "class-variance-authority": "^0.7.1",

## 17. .env files
# Baked into production builds when Render/CI does not override.
# REST + WebSocket base (no trailing slash). Railway is the live backend.
VITE_API_ROOT=https://crispro-backend-v2-production.up.railway.app
VITE_WS_ROOT=https://crispro-backend-v2-production.up.railway.app
---
# CrisPRO Frontend — Environment Configuration
# Copy this file to .env.local for local dev, or set vars in Render dashboard for production.
#
# REQUIRED for production:
#   VITE_API_ROOT          — deployed backend URL (no trailing slash)
#   VITE_ENABLE_MOCK_AUTH  — MUST be "false" in production
#
# REQUIRED for Supabase Analysis History:
#   VITE_SUPABASE_URL
#   VITE_SUPABASE_ANON_KEY

# ── Backend ──────────────────────────────────────────────────────────────────
# Production (Railway). REST calls use VITE_API_ROOT; WebSockets use VITE_WS_ROOT.
# If only VITE_WS_ROOT is set on Render, apiConfig still routes REST to the same host.
VITE_API_ROOT=https://crispro-backend-v2-production.up.railway.app
VITE_WS_ROOT=https://crispro-backend-v2-production.up.railway.app
# Local dev (Vite proxy handles /api → localhost:8000 when unset or localhost):
# VITE_API_ROOT=

# ── External Services ─────────────────────────────────────────────────────────
VITE_FUSION_ENGINE_URL=https://crispro--fusion-engine-v1-fusionengine-api.modal.run
VITE_EVO_SERVICE_URL=
VITE_ZETA_ORACLE_URL=

# ── Supabase (Analysis History) ───────────────────────────────────────────────
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# ── Auth ──────────────────────────────────────────────────────────────────────
# NEVER set to "true" in production.
# When "true": enables MARS MODE auto-login, AK bypass, and mock profile fallbacks.
# When "false" or unset: all auth goes through the real backend (Supabase).
VITE_ENABLE_MOCK_AUTH=false

# ── Feature Flags ─────────────────────────────────────────────────────────────
VITE_ENABLE_AGENT_SYSTEM=true
VITE_ENABLE_WEBSOCKET=true
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_ANALYSIS_HISTORY=true

# ── Build ─────────────────────────────────────────────────────────────────────
VITE_APP_NAME=CrisPRO Oncology CoPilot
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production

## AUDIT COMPLETE
