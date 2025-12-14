# ⚡ Quick Deploy to Vercel - 5 Minutes

## Step 1: Get Your API Keys (2 minutes)

### Groq API Key (Free)
1. Visit: https://console.groq.com/keys
2. Sign up/login
3. Click "Create API Key"
4. Copy the key (starts with `gsk_...`)

### OpenAI API Key (Free tier available)
1. Visit: https://platform.openai.com/api-keys
2. Sign up/login
3. Click "Create new secret key"
4. Copy the key (starts with `sk-...`)

---

## Step 2: Push to GitHub (1 minute)

Run these commands in your terminal:

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "RAG chatbot ready for deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/rag-chatbot.git
git branch -M main
git push -u origin main
```

**Don't have a GitHub repo yet?**
1. Go to: https://github.com/new
2. Name it: `rag-chatbot`
3. Don't check "Initialize with README"
4. Click "Create repository"
5. Then run the git commands above

---

## Step 3: Deploy to Vercel (2 minutes)

### Option A: Via Website (Easiest)

1. **Go to**: https://vercel.com/new
2. **Sign in** with GitHub
3. **Import** your `rag-chatbot` repository
4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add `GROQ_API_KEY` = (paste your Groq key)
   - Add `OPENAI_API_KEY` = (paste your OpenAI key)
   - Make sure both are checked for: Production, Preview, Development
5. **Click "Deploy"**
6. **Wait 2-3 minutes** for build
7. **Done!** Your URL: `https://your-project.vercel.app`

### Option B: Via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add GROQ_API_KEY
vercel env add OPENAI_API_KEY

# Deploy to production
vercel --prod
```

---

## ✅ That's It!

Your chatbot is now live! Share the URL with anyone.

**Need help?** Check `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions.

