# CrisPRO LLM Architecture - How It Works

## 🏗️ Current Architecture (What We Have)

### **We DO Have a Backend!**

**Next.js API Routes = Backend Server**
- Location: `/src/app/api/docs/chat/route.ts`
- Runs on: **Server-side** (Node.js runtime)
- Deploys with: Your Next.js app (Vercel, AWS, etc.)
- **This IS your backend** - no separate server needed!

### How It Works:

```
┌─────────────────┐
│  User Browser   │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTP POST /api/docs/chat
         │ { query: "What is Oracle?" }
         ▼
┌─────────────────────────────────────┐
│  Next.js API Route                  │
│  /src/app/api/docs/chat/route.ts   │
│  (Runs on SERVER)                   │
├─────────────────────────────────────┤
│  1. Search Knowledge Base           │
│     - Parse MDC files               │
│     - Find relevant chunks          │
│  2. Build Context String            │
│     - Combine relevant docs          │
│  3. Call External LLM API            │
│     - Gemini API (Google)            │
│     - OpenAI API (optional)          │
│     - Anthropic API (optional)       │
│  4. Return Response                  │
│     - Answer + Sources               │
└────────┬────────────────────────────┘
         │
         │ JSON Response
         │ { answer: "...", sources: [...] }
         ▼
┌─────────────────┐
│  User Browser   │
│  (Displays)     │
└─────────────────┘
```

## 📚 Knowledge Base System

### **Current: File-Based (No Database Needed)**

**What We Have:**
- **Runtime Parsing**: Reads `.mdc` files from filesystem at request time
- **In-Memory Search**: Keyword-based search (no embeddings yet)
- **No Database**: Everything is file-based
- **No Vector Store**: Simple text matching

**Knowledge Base Sources:**
```
.cursor/rules/APIs/
├── endpoints.mdc              → All API endpoints
├── synthethic-lethality.mdc   → Use cases
└── knowledgeBase/
    ├── ADVANCED_CARE_PLAN_*.mdc
    ├── AK.moat.mdc
    └── ... (9 files total)
```

**How It Works:**
1. User asks question
2. System reads all MDC files from disk
3. Parses content into chunks
4. Scores chunks by relevance (keyword matching)
5. Returns top 8 most relevant chunks
6. Sends to LLM as context

## 🤖 LLM Integration

### **External LLM APIs (Not Self-Hosted)**

**We Use:**
- **Gemini API** (Google) - Primary
- **OpenAI API** (OpenAI) - Fallback
- **Anthropic API** (Anthropic) - Fallback

**Why External?**
- ✅ No model training needed
- ✅ No GPU infrastructure
- ✅ No model hosting costs
- ✅ Always up-to-date models
- ✅ Pay-per-use pricing

**Cost:**
- Gemini: ~$0.001 per query (very cheap)
- OpenAI: ~$0.002 per query
- Anthropic: ~$0.003 per query

## 🔄 What Happens on Each Request

```typescript
// 1. User sends question
POST /api/docs/chat
{ query: "What is the S/P/E Framework?" }

// 2. Server-side processing (in route.ts)
const relevantChunks = await searchCrisPROKnowledgeBase(query, 8);
const context = buildContextString(relevantChunks);
const systemPrompt = buildSystemPrompt(context);

// 3. Call external LLM
const response = await fetch('https://generativelanguage.googleapis.com/...', {
  method: 'POST',
  body: JSON.stringify({
    contents: [{ parts: [{ text: systemPrompt + query }] }],
    generationConfig: { temperature: 0.3 }
  })
});

// 4. Return to user
return { answer: "...", sources: [...] }
```

## 🚀 Deployment

### **Single Deployment (No Separate Backend)**

**Next.js App = Frontend + Backend**
- Deploy to: Vercel, AWS, Railway, etc.
- API routes run on: Same server as frontend
- No separate backend service needed!

**Environment Variables:**
```bash
GEMINI_API_KEY=your_key_here
# Optional:
OPENAI_API_KEY=your_key_here
ANTHROPIC_API_KEY=your_key_here
```

## 🔮 Future Enhancements (Optional)

### **1. Vector Embeddings (Better Search)**

**What It Would Do:**
- Convert docs to vector embeddings
- Store in vector database (Pinecone, Supabase pgvector)
- Semantic search (understands meaning, not just keywords)

**Benefits:**
- Better search accuracy
- Understands synonyms
- Finds conceptually similar content

**Cost:**
- Vector DB: ~$10-50/month
- Embedding API: ~$0.0001 per doc

**Do We Need It?**
- **Current system works fine** for documentation
- Only needed if you have 1000+ docs or need semantic search

### **2. Caching (Performance)**

**What It Would Do:**
- Cache parsed knowledge base
- Cache common queries
- Redis or in-memory cache

**Benefits:**
- Faster responses
- Lower API costs

**Do We Need It?**
- **Not urgent** - current system is fast enough
- Consider if you get 1000+ queries/day

### **3. Self-Hosted LLM (Optional)**

**What It Would Do:**
- Run LLM on your own servers
- Use models like Llama 2, Mistral

**Benefits:**
- No API costs
- Data privacy
- Custom fine-tuning

**Costs:**
- GPU servers: $500-2000/month
- Infrastructure: Complex setup

**Do We Need It?**
- **No** - External APIs are cheaper and easier
- Only if you need data privacy or have 10M+ queries/month

## ✅ Summary

### **What We Have:**
- ✅ **Backend**: Next.js API routes (server-side)
- ✅ **Knowledge Base**: File-based, runtime parsing
- ✅ **LLM**: External APIs (Gemini/OpenAI/Anthropic)
- ✅ **Search**: Keyword-based (works well for docs)
- ✅ **Deployment**: Single Next.js app (no separate backend)

### **What We DON'T Need (Yet):**
- ❌ Separate backend server
- ❌ Vector database
- ❌ Embeddings
- ❌ Self-hosted LLM
- ❌ Complex infrastructure

### **When to Add:**
- **Vector DB**: If you have 1000+ docs or need semantic search
- **Caching**: If you get 1000+ queries/day
- **Self-Hosted**: If you need data privacy or have massive scale

## 🎯 Bottom Line

**You already have a working AI system!**
- Backend: ✅ (Next.js API routes)
- Knowledge Base: ✅ (MDC files)
- LLM: ✅ (Gemini API)
- Search: ✅ (Keyword-based)

**No additional infrastructure needed** - it all runs in your Next.js app!






