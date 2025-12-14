# Ed-Tech RAG Chatbot

A fully functional RAG (Retrieval-Augmented Generation) chatbot built for the Ed-Tech domain, featuring text and image query support, tool-calling capabilities, and a modern generative UI.

## 🚀 Features

- **RAG Implementation**: Contextual understanding using vector embeddings and similarity search
- **Text & Image Queries**: Support for both text-based questions and image analysis
- **Tool-Calling**: Integrated tools for web search, UI component generation, and data fetching
- **Ed-Tech Domain**: Specialized knowledge base focused on educational technology
- **Modern UI**: Beautiful, responsive chat interface built with Next.js and Tailwind CSS
- **Vercel Ready**: Optimized for deployment on Vercel

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Groq API key (free at [https://groq.com](https://groq.com))
- OpenAI API key (for embeddings - free tier available)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd rag-chatbot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

**Getting API Keys:**
- **Groq API**: Sign up at [https://groq.com](https://groq.com) and get your free API key
- **OpenAI API**: Sign up at [https://platform.openai.com](https://platform.openai.com) and create an API key

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## 🌐 Vercel Deployment

### Pre-Deployment Checklist

- [ ] All code is committed to Git
- [ ] Environment variables are documented (see `env.example`)
- [ ] Dependencies are installed (`npm install`)
- [ ] Local build works (`npm run build`)
- [ ] API keys are ready (Groq and OpenAI)

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add `GROQ_API_KEY` and `OPENAI_API_KEY`

### Option 2: Deploy via GitHub (Recommended)

1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: RAG chatbot"
git push origin main
```

2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard:
   - `GROQ_API_KEY`
   - `OPENAI_API_KEY`
4. Deploy automatically on every push

📖 **Detailed deployment instructions**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📖 Usage Guide

### Text Queries

Simply type your question in the chat interface:

- "What is adaptive learning?"
- "Explain Learning Management Systems"
- "How does gamification work in education?"

### Image Queries

1. Click the 📷 button in the chat input
2. Select an image file
3. The chatbot will analyze the image and provide educational context

### Tool-Calling

Use special syntax to trigger tools:

- **Web Search**: `[web_search:query:your search term]`
- **UI Generation**: `[generate_ui_component:component_type:description]`
- **Data Fetching**: `[fetch_learning_data:data_type:topic]`

**Examples:**
- `[web_search:query:latest ed-tech trends]`
- `[generate_ui_component:quiz:interactive quiz with multiple choice]`
- `[fetch_learning_data:course:Machine Learning]`

## 🏗️ Project Structure

```
rag-chatbot/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main page
├── components/
│   └── ChatInterface.tsx          # Chat UI component
├── lib/
│   ├── vector-store.ts            # RAG vector store implementation
│   ├── groq-client.ts             # Groq API client
│   └── tools.ts                   # Tool-calling definitions
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── vercel.json
└── README.md
```

## 🔧 Technical Details

### RAG Implementation

- **Vector Store**: Custom implementation using cosine similarity
- **Embeddings**: OpenAI's `text-embedding-3-small` model
- **Retrieval**: Top-k similarity search (k=3)
- **Knowledge Base**: Pre-loaded Ed-Tech domain documents

### AI Models

- **LLM**: Groq's Llama 3.1 70B (via Groq API)
- **Embeddings**: OpenAI's text-embedding-3-small

### Tools Available

1. **web_search**: Search the web for current information
2. **generate_ui_component**: Generate UI component code/descriptions
3. **fetch_learning_data**: Fetch educational data and resources

## 🎓 Ed-Tech Knowledge Base

The chatbot includes a curated knowledge base covering:

- Learning Management Systems (LMS)
- Adaptive Learning
- Microlearning
- Gamification
- Blended Learning
- MOOCs
- AI Tutors
- VR/AR in Education
- Assessment Tools

## 🚧 Future Enhancements

- [ ] Integration with real web search APIs (SerpAPI, Google Search)
- [ ] Support for document upload (PDF, DOCX)
- [ ] Persistent vector store (Pinecone, Weaviate)
- [ ] Vision model integration for better image understanding
- [ ] Multi-turn conversation memory
- [ ] Export chat history
- [ ] User authentication and personalized learning paths

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

**Built with ❤️ using Next.js, Groq AI, and OpenAI**

