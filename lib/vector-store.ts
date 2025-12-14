import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

// Simple in-memory vector store for demo purposes
// In production, use Pinecone, Weaviate, or similar
class SimpleVectorStore {
  private embeddings: OpenAIEmbeddings;
  private documents: Document[] = [];
  private vectors: number[][] = [];

  constructor() {
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY || "",
      modelName: "text-embedding-3-small",
    });
  }

  async addDocuments(docs: Document[]) {
    this.documents.push(...docs);
    const texts = docs.map((doc) => doc.pageContent);
    const newVectors = await this.embeddings.embedDocuments(texts);
    this.vectors.push(...newVectors);
  }

  async similaritySearch(query: string, k: number = 4): Promise<Document[]> {
    if (this.vectors.length === 0) {
      return [];
    }

    try {
      const queryVector = await this.embeddings.embedQuery(query);
      
      // Calculate cosine similarity
      const similarities = this.vectors.map((vector, idx) => {
        const similarity = this.cosineSimilarity(queryVector, vector);
        return { similarity, idx };
      });

      // Sort by similarity and get top k
      similarities.sort((a, b) => b.similarity - a.similarity);
      const topK = similarities.slice(0, Math.min(k, similarities.length));

      return topK.map(({ idx }) => this.documents[idx]);
    } catch (error) {
      console.error("Error in similarity search:", error);
      // Return empty array or fallback to first k documents
      return this.documents.slice(0, Math.min(k, this.documents.length));
    }
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    
    // Handle zero-magnitude vectors to prevent division by zero
    if (magnitudeA === 0 || magnitudeB === 0) {
      // If both vectors are zero, they're identical (similarity = 1)
      // If only one is zero, they're completely different (similarity = 0)
      if (magnitudeA === 0 && magnitudeB === 0) {
        return 1.0;
      }
      return 0;
    }
    
    return dotProduct / (magnitudeA * magnitudeB);
  }

  getDocumentCount(): number {
    return this.documents.length;
  }
}

// Initialize vector store with Ed-Tech knowledge base
export async function initializeVectorStore(): Promise<SimpleVectorStore> {
  const store = new SimpleVectorStore();

  // Ed-Tech domain knowledge base
  const edTechKnowledge: Document[] = [
    new Document({
      pageContent: `Educational Technology (Ed-Tech) refers to the use of technology to enhance teaching and learning. 
      Key areas include Learning Management Systems (LMS), online courses, virtual classrooms, 
      adaptive learning platforms, and AI-powered tutoring systems.`,
      metadata: { source: "ed-tech-overview", category: "fundamentals" },
    }),
    new Document({
      pageContent: `Learning Management Systems (LMS) are software applications for administration, 
      documentation, tracking, reporting, and delivery of educational courses. Popular examples 
      include Moodle, Canvas, Blackboard, and Google Classroom.`,
      metadata: { source: "lms", category: "platforms" },
    }),
    new Document({
      pageContent: `Adaptive learning uses AI algorithms to personalize educational content based on 
      individual student performance. It adjusts difficulty, pacing, and content type to optimize 
      learning outcomes for each student.`,
      metadata: { source: "adaptive-learning", category: "ai" },
    }),
    new Document({
      pageContent: `Microlearning breaks down educational content into small, focused chunks that 
      can be consumed in 5-10 minutes. This approach improves retention and engagement by reducing 
      cognitive load and allowing for spaced repetition.`,
      metadata: { source: "microlearning", category: "pedagogy" },
    }),
    new Document({
      pageContent: `Gamification in education applies game design elements to learning environments. 
      This includes points, badges, leaderboards, and achievements to increase student motivation 
      and engagement.`,
      metadata: { source: "gamification", category: "engagement" },
    }),
    new Document({
      pageContent: `Blended learning combines online educational materials with traditional 
      classroom methods. It provides flexibility while maintaining face-to-face interaction 
      and support.`,
      metadata: { source: "blended-learning", category: "pedagogy" },
    }),
    new Document({
      pageContent: `MOOC (Massive Open Online Course) platforms like Coursera, edX, and Udemy 
      provide access to high-quality education at scale. They offer courses from universities 
      and institutions worldwide.`,
      metadata: { source: "mooc", category: "platforms" },
    }),
    new Document({
      pageContent: `AI tutors use natural language processing and machine learning to provide 
      personalized tutoring. They can answer questions, provide explanations, and adapt to 
      student learning styles in real-time.`,
      metadata: { source: "ai-tutors", category: "ai" },
    }),
    new Document({
      pageContent: `Virtual Reality (VR) and Augmented Reality (AR) in education create immersive 
      learning experiences. VR can simulate historical events, scientific phenomena, or 
      complex procedures, while AR overlays digital information onto the real world.`,
      metadata: { source: "vr-ar", category: "emerging-tech" },
    }),
    new Document({
      pageContent: `Assessment tools in Ed-Tech include automated grading, plagiarism detection, 
      and learning analytics. These tools help educators track student progress and identify 
      areas needing attention.`,
      metadata: { source: "assessment", category: "tools" },
    }),
  ];

  await store.addDocuments(edTechKnowledge);
  return store;
}

export { SimpleVectorStore };

