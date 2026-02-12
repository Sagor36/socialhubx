
import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSMMAdvice(query: string, services: any[]) {
  try {
    // FIX: Use recommended generation pattern with systemInstruction in config
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is asking about SMM services.
      Query: ${query}
      Available Services: ${JSON.stringify(services)}`,
      config: {
        systemInstruction: 'Act as a friendly AI assistant for Social Hub X BD. Recommend specific services and explain why they help.',
      },
    });
    // FIX: Access the .text property directly instead of calling a method
    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "I'm having trouble connecting to my brain. Please try again later!";
  }
}
