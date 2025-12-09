import { GoogleGenAI, Type } from "@google/genai";
import { WishMessage } from "../types";
import { FALLBACK_WISHES } from "../constants";

// Using a fallback mechanism if API key is not present or API call fails
export const generateWishes = async (baseMessage: string): Promise<WishMessage[]> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.warn("No API_KEY found in env, using fallback data.");
    return FALLBACK_WISHES;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Schema definition
    const responseSchema = {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          language: { type: Type.STRING },
          message: { type: Type.STRING },
          transliteration: { type: Type.STRING, description: "Latin pronunciation if script is non-latin" }
        },
        required: ["language", "message"],
      },
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Translate the following romantic encouragement into 19 different languages (excluding Vietnamese).
        The original message is: "${baseMessage}".
        Make the translations sound natural, romantic, and encouraging suitable for a partner.
        Return a JSON array.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonStr = response.text;
    if (!jsonStr) throw new Error("Empty response from Gemini");
    
    const wishes = JSON.parse(jsonStr) as WishMessage[];
    return wishes;

  } catch (error) {
    console.error("Gemini generation failed, falling back:", error);
    return FALLBACK_WISHES;
  }
};
