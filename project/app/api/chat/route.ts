import { generateGeminiResponse } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Generate response using Gemini AI
    const response = await generateGeminiResponse(messages);
    
    // Return the AI-generated response
    return new Response(response, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(
      "Sorry, I encountered an error. Please try again or contact the registrar office directly at (053) 570-8236.",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}