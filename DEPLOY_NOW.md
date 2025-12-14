# 🚀 Deploy to Vercel - Ready to Go!

Your code is **100% ready** for deployment. Follow these simple steps:

---

## 📋 What You Need

1. **GitHub account** (free) - https://github.com
2. **Vercel account** (free) - https://vercel.com  
3. **Groq API key** (free) - https://console.groq.com/keys
4. **OpenAI API key** (free tier) - https://platform.openai.com/api-keys

---

## 🎯 Deployment Steps

### 1️⃣ Prepare Your Code (Already Done ✅)

Git is initialized. Now commit your code:

```bash
git add .
git commit -m "RAG chatbot - ready for Vercel deployment"
```

### 2️⃣ Push to GitHub

**First, create a GitHub repository:**

1. Go to: https://github.com/new
2. Repository name: `rag-chatbot`
3. Description: "RAG-powered Ed-Tech chatbot"
4. Make it **Public** (or Private - your choice)
5. **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

**Then, push your code:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/rag-chatbot.git
git branch -M main
git push -u origin main
```

*(Replace `YOUR_USERNAME` with your GitHub username)*

### 3️⃣ Deploy to Vercel

**Go to Vercel:**

1. Visit: **https://vercel.com/new**
2. Click **"Continue with GitHub"** (sign in if needed)
3. Find and select your **`rag-chatbot`** repository
4. Click **"Import"**

**Configure Project:**

- Framework: **Next.js** (auto-detected ✅)
- Root Directory: **`./`** (default)
- Build Command: **`npm run build`** (auto-detected ✅)
- Output Directory: **`.next`** (auto-detected ✅)

**⚠️ IMPORTANT - Add Environment Variables:**

1. Click **"Environment Variables"** section
2. Add these two variables:

   **Variable 1:**
   ```
   Name: GROQ_API_KEY
   Value: [Paste your Groq API key here]
   Environments: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 2:**
   ```
   Name: OPENAI_API_KEY
   Value: [Paste your OpenAI API key here]
   Environments: ☑ Production ☑ Preview ☑ Development
   ```

3. Click **"Add"** for each variable

**Deploy:**

1. Click the big **"Deploy"** button
2. Wait 2-3 minutes for the build
3. You'll see: **✅ Ready**
4. Click on your deployment to get the URL

**Your chatbot is live at:** `https://rag-chatbot-xxxxx.vercel.app`

---

## 🔑 Getting API Keys

### Groq API Key (Free - No Credit Card Required)

1. Go to: **https://console.groq.com/keys**
2. Sign up (or log in)
3. Click **"Create API Key"**
4. Copy the key (looks like: `gsk_xxxxxxxxxxxxx`)
5. Save it somewhere safe

### OpenAI API Key (Free Credits Available)

1. Go to: **https://platform.openai.com/api-keys**
2. Sign up (or log in)
3. Click **"Create new secret key"**
4. Copy the key (looks like: `sk-xxxxxxxxxxxxx`)
5. Save it somewhere safe

**Note:** New OpenAI accounts get free credits!

---

## ✅ Test Your Deployment

Once deployed, test these features:

1. **Text Query**: Type "What is adaptive learning?"
2. **Image Upload**: Click 📷 and upload an image
3. **Tool-Calling**: Type `[web_search:query:ed-tech]`

---

## 🐛 Troubleshooting

### Build Fails?

- Check Vercel build logs
- Make sure environment variables are set
- Verify API keys are correct (no extra spaces)

### "API Key Not Set" Error?

1. Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify both keys are added
3. Make sure they're enabled for **Production**
4. Click **"Redeploy"**

### Need to Update Code?

Just push to GitHub:
```bash
git add .
git commit -m "Update"
git push
```

Vercel will automatically redeploy!

---

## 📚 More Help

- **Detailed Guide**: See `VERCEL_DEPLOYMENT_GUIDE.md`
- **Quick Reference**: See `QUICK_DEPLOY.md`
- **Vercel Docs**: https://vercel.com/docs

---

## 🎉 You're All Set!

Your RAG chatbot is production-ready. Just follow the steps above and you'll be live in minutes!

**Questions?** Check the detailed guides or Vercel documentation.

