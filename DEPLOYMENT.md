# Deployment Guide

## Quick Start for Vercel Deployment

### Step 1: Prepare Your Repository

1. Ensure all code is committed to Git:
```bash
git add .
git commit -m "Initial commit: RAG chatbot with Ed-Tech domain"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. **Important**: Add environment variables:
   - `GROQ_API_KEY` - Your Groq API key
   - `OPENAI_API_KEY` - Your OpenAI API key
6. Click "Deploy"

#### Option B: Via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables:
```bash
vercel env add GROQ_API_KEY
vercel env add OPENAI_API_KEY
```

5. Redeploy to apply environment variables:
```bash
vercel --prod
```

### Step 3: Verify Deployment

1. Visit your Vercel deployment URL
2. Test the chatbot with a sample query
3. Check that environment variables are properly set

## Environment Variables

Make sure to set these in your Vercel project settings:

- **GROQ_API_KEY**: Get from [https://groq.com](https://groq.com)
- **OPENAI_API_KEY**: Get from [https://platform.openai.com](https://platform.openai.com)

## Troubleshooting

### Common Issues

1. **"GROQ_API_KEY is not set"**
   - Solution: Add the environment variable in Vercel dashboard under Project Settings > Environment Variables

2. **Build fails**
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version is 18+ in Vercel settings

3. **API errors**
   - Verify API keys are correct
   - Check API rate limits
   - Review Vercel function logs

### Checking Logs

In Vercel dashboard:
1. Go to your project
2. Click on "Functions" tab
3. View logs for debugging

## Post-Deployment

1. Test all features:
   - Text queries
   - Image uploads
   - Tool-calling functionality

2. Share your deployment URL

3. Update README with your live URL

## Custom Domain (Optional)

1. In Vercel dashboard, go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

