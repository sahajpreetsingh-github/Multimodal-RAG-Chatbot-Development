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
        const argsString = (match[2] as string).trim();
        
        // Parse tool arguments - support both formats:
        // 1. Positional: [tool:arg1:arg2] (matches UI examples)
        // 2. Named with commas: [tool:key1:value1,key2:value2]
        let toolArgs: Record<string, string> = {};
        
        // Check if it contains commas (named arguments format)
        if (argsString.includes(",")) {
          // Named arguments: key1:value1,key2:value2
          argsString.split(",").forEach(arg => {
            const [key, ...valueParts] = arg.split(":").map(s => s.trim());
            const value = valueParts.join(":"); // Rejoin in case value contains colons
            if (key && value) {
              toolArgs[key] = value;
            }
          });
        } else {
          // Positional arguments: arg1:arg2:arg3
          // Map to tool-specific parameter names
          const args = argsString.split(":").map(s => s.trim()).filter(s => s.length > 0);
          
          if (toolName === "web_search") {
            // Single argument: query
            toolArgs.query = args.length > 0 ? args.join(" ") : argsString;
          } else if (toolName === "generate_ui_component") {
            // Two arguments: component_type, description
            toolArgs.component_type = args[0] || "";
            // Join all args after the first as description (handles colons in description)
            toolArgs.description = args.length > 1 ? args.slice(1).join(" ") : "";
          } else if (toolName === "fetch_learning_data") {
            // Two arguments: data_type, topic
            toolArgs.data_type = args[0] || "";
            // Join all args after the first as topic (handles colons in topic)
            toolArgs.topic = args.length > 1 ? args.slice(1).join(" ") : "";
          }
        }
        
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

