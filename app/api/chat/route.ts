import { NextRequest, NextResponse } from "next/server";
import { initializeVectorStore } from "@/lib/vector-store";
import { generateResponse, generateImageDescription } from "@/lib/groq-client";
import { executeTool, availableTools } from "@/lib/tools";

// Initialize vector store (in production, use a singleton or cache)
let vectorStore: Awaited<ReturnType<typeof initializeVectorStore>> | null = null;

async function getVectorStore() {
  if (!vectorStore) {
    vectorStore = await initializeVectorStore();
  }
  return vectorStore;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, image } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Handle image queries
    if (image) {
      const imageDescription = await generateImageDescription(image);
      const imageContext = `User shared an image. Image analysis: ${imageDescription}`;
      
      const response = await generateResponse(
        [
          ...messages,
          {
            role: "user",
            content: `I've shared an image. ${imageContext} Please help me understand how this relates to education and learning.`,
          },
        ]
      );

      return NextResponse.json({
        message: response,
        imageAnalyzed: true,
      });
    }

    // Get the last user message for RAG retrieval
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // Perform RAG retrieval
    const store = await getVectorStore();
    const relevantDocs = await store.similaritySearch(userQuery, 3);
    const context = relevantDocs
      .map((doc) => doc.pageContent)
      .join("\n\n");

    // Check if the message contains tool-calling requests
    const toolCallPattern = /\[(web_search|generate_ui_component|fetch_learning_data):\s*([^\]]+)\]/g;
    const toolMatches = Array.from(userQuery.matchAll(toolCallPattern)) as RegExpMatchArray[];
    
    let toolResults = "";
    if (toolMatches.length > 0) {
      for (const match of toolMatches) {
        const toolName = match[1] as string;
        const toolArgs = (match[2] as string).split(",").reduce((acc, arg) => {
          const [key, value] = arg.split(":").map(s => s.trim());
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);
        
        const result = await executeTool(toolName, toolArgs);
        toolResults += `\n\nTool Result (${toolName}):\n${result}`;
      }
    }

    // Generate response with RAG context and tool results
    const enhancedMessages = [
      ...messages.slice(0, -1),
      {
        role: "user",
        content: userQuery + (toolResults ? `\n\n${toolResults}` : ""),
      },
    ];

    const response = await generateResponse(enhancedMessages, context);

    return NextResponse.json({
      message: response,
      contextUsed: relevantDocs.length > 0,
      toolsUsed: toolMatches.length > 0,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    availableTools: availableTools.map(tool => ({
      name: tool.name,
      description: tool.description,
    })),
    message: "Chat API is ready. Use POST to send messages.",
  });
}

