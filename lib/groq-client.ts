import Groq from "groq-sdk";

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

export async function generateResponse(
  messages: Array<{ role: "user" | "assistant" | "system"; content: string }>,
  context?: string
): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set. Please configure it in your environment variables.");
  }

  try {
    const systemPrompt = `You are an expert educational technology (Ed-Tech) assistant. 
You help students, teachers, and administrators understand and leverage educational technology 
to improve learning outcomes. You provide clear, practical, and evidence-based advice.

${context ? `\nRelevant context from knowledge base:\n${context}\n` : ""}

Always be helpful, accurate, and encouraging. If you don't know something, admit it rather 
than making up information.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt } as const,
        ...messages.map(msg => ({
          role: msg.role as "user" | "assistant" | "system",
          content: msg.content
        })),
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error: any) {
    console.error("Error generating response:", error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

export async function generateImageDescription(imageBase64: string): Promise<string> {
  if (!process.env.GROQ_API_KEY) {
    throw new Error("GROQ_API_KEY is not set. Please configure it in your environment variables.");
  }

  try {
    // For image understanding, we'll use a text-based description approach
    // In production, use vision models like GPT-4 Vision or Claude 3
    const response = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert at analyzing educational content in images. Describe what you see and how it relates to learning and education.",
        },
        {
          role: "user",
          content: `I'm sending you an image. Please describe its educational content and how it might be used in teaching or learning. 
          Note: Since this model doesn't support direct image input, please provide guidance on what types of educational images 
          would be helpful (diagrams, charts, text, etc.) and how to analyze them.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0]?.message?.content || "I can help analyze educational images. Please describe the image content.";
  } catch (error: any) {
    console.error("Error generating image description:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);
  }
}

