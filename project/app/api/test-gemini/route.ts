import { GoogleGenAI } from "@google/genai";

export async function GET() {
  try {
    console.log("Testing Gemini API...");
    
    // Use direct API key for testing
    const API_KEY = "AIzaSyAOWTS_XWgbfXk9xtsJyN05nvhAFje2dE8";
    console.log("Using direct API key");

    const ai = new GoogleGenAI({
      apiKey: API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: "Say hello in a friendly way",
    });

    return Response.json({ 
      success: true, 
      response: response.text,
      message: "Using direct API key"
    });

  } catch (error) {
    console.error("Test error:", error);
    return Response.json({ 
      error: error.message,
      name: error.name,
      stack: error.stack
    });
  }
}
