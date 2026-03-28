import { GoogleGenAI, Modality } from "@google/genai";

const MODEL_VISION = "gemini-3.1-pro-preview";
const MODEL_IMAGE = "gemini-2.5-flash-image";

export const aiService = {
  async analyzeDesign(referenceImageBase64: string) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    const prompt = `
      Analyze this UI design and extract its core design system.
      Return a JSON object with:
      - primaryColors: string[] (hex)
      - typography: string (font style description)
      - layoutStructure: string (e.g. "sidebar-left", "grid-3-col")
      - componentDensity: string ("compact", "spacious")
      - visualStyle: string ("minimal", "glassmorphism", "brutalist")
    `;

    const response = await ai.models.generateContent({
      model: MODEL_VISION,
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: referenceImageBase64.split(',')[1], mimeType: "image/png" } }
        ]
      },
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  },

  async transformDesign(
    userImageBase64: string, 
    designSystem: any, 
    settings: any
  ) {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    const prompt = `
      Redesign this UI based on the following design system and constraints:
      Design System: ${JSON.stringify(designSystem)}
      Similarity Settings:
      - Layout Fidelity: ${settings.layout}%
      - Color Fidelity: ${settings.color}%
      - Creativity Level: ${settings.creativity}%
      
      The goal is to apply the visual style of the reference to this user's product image while maintaining the original functionality.
      Generate a high-end, professional SaaS UI.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_IMAGE,
      contents: {
        parts: [
          { text: prompt },
          { inlineData: { data: userImageBase64.split(',')[1], mimeType: "image/png" } }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    
    throw new Error("Failed to generate image");
  }
};
