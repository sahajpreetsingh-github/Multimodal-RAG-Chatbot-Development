"use client";

import { useState, useRef, useEffect } from "react";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Ed-Tech RAG Chatbot
          </h1>
          <p className="text-white/80 text-lg">
            AI-powered educational technology assistant with RAG capabilities
          </p>
          <p className="text-white/60 text-sm mt-2">
            Supports text queries, image analysis, and tool-calling
          </p>
        </div>
        <ChatInterface />
      </div>
    </main>
  );
}

