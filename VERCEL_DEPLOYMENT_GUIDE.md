# 🚀 Step-by-Step Vercel Deployment Guide

## Prerequisites Checklist

Before deploying, make sure you have:
- ✅ GitHub account
- ✅ Vercel account (free at https://vercel.com)
- ✅ Groq API key (free at https://groq.com)
- ✅ OpenAI API key (free tier available at https://platform.openai.com)

---

## Method 1: Deploy via Vercel Dashboard (Easiest - Recommended)

### Step 1: Push Code to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: RAG chatbot ready for deployment"
   ```

2. **Create a GitHub repository**:
   - Go to https://github.com/new
   - Create a new repository (e.g., `rag-chatbot`)
   - **Don't** initialize with README (you already have one)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/rag-chatbot.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel**:
   - Visit https://vercel.com
   - Sign in with your GitHub account

2. **Import Project**:
   - Click **"Add New..."** → **"Project"**
   - Select your GitHub repository (`rag-chatbot`)
   - Click **"Import"**

3. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables** (CRITICAL):
   - Click **"Environment Variables"**
   - Add the following:
     
     **Variable 1:**
     - Name: `GROQ_API_KEY`
     - Value: `your_groq_api_key_here`
     - Environment: Select all (Production, Preview, Development)
     
     **Variable 2:**
     - Name: `OPENAI_API_KEY`
     - Value: `your_openai_api_key_here`
     - Environment: Select all (Production, Preview, Development)

5. **Deploy**:
   - Click **"Deploy"** button
   - Wait for build to complete (2-3 minutes)

6. **Get Your URL**:
   - Once deployed, you'll see: `✅ Ready`
   - Your app will be live at: `https://your-project-name.vercel.app`

---

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will open a browser window for authentication.

### Step 3: Deploy

From your project directory:

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? `rag-chatbot` (or your preferred name)
- Directory? `./` (press Enter)
- Override settings? **No**

### Step 4: Add Environment Variables

```bash
# Add Groq API key
vercel env add GROQ_API_KEY

# Add OpenAI API key
vercel env add OPENAI_API_KEY
```

For each command:
- Value: Paste your API key
- Environment: Select all (Production, Preview, Development)

### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔑 Getting API Keys

### Groq API Key (Free)

1. Go to https://groq.com
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `gsk_...`)

### OpenAI API Key

1. Go to https://platform.openai.com
2. Sign up or log in
3. Go to API Keys section
4. Create a new secret key
5. Copy the key (starts with `sk-...`)

**Note**: OpenAI offers free credits for new users!

---

## ✅ Verify Deployment

After deployment, test your chatbot:

1. **Visit your Vercel URL**: `https://your-project.vercel.app`

2. **Test Text Query**:
   - Type: "What is adaptive learning?"
   - Should get a response with Ed-Tech context

3. **Test Image Upload**:
   - Click the 📷 button
   - Upload an image
   - Should analyze the image

4. **Test Tool-Calling**:
   - Type: `[web_search:query:ed-tech trends]`
   - Should trigger web search tool

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Solution:**
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### Issue: "GROQ_API_KEY is not set"

**Solution:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify both API keys are added
3. Make sure they're enabled for Production environment
4. Redeploy: Go to Deployments → Click "..." → Redeploy

### Issue: API Errors

**Solution:**
- Verify API keys are correct (no extra spaces)
- Check API rate limits
- Review Vercel function logs: Dashboard → Your Project → Functions → View Logs

### Issue: Images Not Loading

**Solution:**
- Check `next.config.js` for image domain configuration
- Verify image URLs are accessible

---

## 📊 Monitoring Your Deployment

### View Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click **"Functions"** tab
4. Click on `/api/chat` function
5. View real-time logs

### Check Build Status

1. Go to **"Deployments"** tab
2. See build history and status
3. Click on any deployment to see details

### Analytics

- Vercel provides free analytics
- View page views, performance metrics
- Check function execution times

---

## 🔄 Updating Your Deployment

Every time you push to GitHub:

1. **Push changes**:
   ```bash
   git add .
   git commit -m "Update chatbot"
   git push origin main
   ```

2. **Vercel auto-deploys**:
   - Vercel automatically detects the push
   - Creates a new deployment
   - Updates your live site

3. **Preview deployments**:
   - Each pull request gets a preview URL
   - Test changes before merging

---

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `chatbot.yourdomain.com`)
3. Follow DNS configuration instructions
4. Vercel will automatically set up SSL

---

## 📝 Quick Reference

### Essential Commands

```bash
# Install dependencies
npm install

# Build locally
npm run build

# Run locally
npm run dev

# Deploy to Vercel (CLI)
vercel

# Deploy to production (CLI)
vercel --prod
```

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Groq Console**: https://console.groq.com
- **OpenAI Platform**: https://platform.openai.com

---

## ✅ Deployment Checklist

Before deploying, ensure:

- [ ] Code is pushed to GitHub
- [ ] All environment variables are ready
- [ ] `package.json` has all dependencies
- [ ] Build passes locally (`npm run build`)
- [ ] No TypeScript errors
- [ ] No linting errors

After deploying:

- [ ] Environment variables are set in Vercel
- [ ] Build completes successfully
- [ ] Site is accessible at Vercel URL
- [ ] Text queries work
- [ ] Image upload works
- [ ] Tool-calling works

---

**🎉 Congratulations! Your RAG chatbot is now live on Vercel!**

Share your deployment URL: `https://your-project.vercel.app`

