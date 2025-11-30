import { GoogleGenAI, Type } from "@google/genai";
import { UserAnalysis, OutfitRecommendation, StyleMode } from '../types';

// Initialize the API client
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key not found");
  return new GoogleGenAI({ apiKey });
};

// Helper to strip data URI prefix from base64 string
const cleanBase64 = (base64String: string) => {
  const match = base64String.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
  if (match) {
    return {
      mimeType: match[1],
      data: match[2]
    };
  }
  // Fallback if already raw or formatted differently
  return {
    mimeType: 'image/jpeg',
    data: base64String
  };
};

const STYLE_ENVIRONMENTS: Record<string, string> = {
  [StyleMode.Office]: "modern minimalist corporate office with glass walls, soft daytime professional lighting, depth of field",
  [StyleMode.Party]: "vibrant nightlife city street with neon signs and bokeh lights, dramatic night lighting, cyber fashion aesthetic",
  [StyleMode.Streetwear]: "urban concrete city street with industrial architecture, graffiti art background, cool overcast lighting",
  [StyleMode.Casual]: "relaxed high-end coffee shop interior or sunny city park path, warm natural sunlight",
  [StyleMode.Wedding]: "elegant luxury event venue with floral decorations, soft golden hour lighting, dreamy atmosphere",
  [StyleMode.Gym]: "modern high-end fitness studio with mirrors and sleek equipment, bright energetic lighting",
  [StyleMode.Winter]: "cozy winter street scene with soft snow or modern cabin interior, cold crisp lighting",
  [StyleMode.Summer]: "sunny outdoor resort promenade or beachside walkway, bright clear daylight, blue sky",
};

/**
 * Analyzes the user's photo to detect body shape, gender, and features.
 */
export const analyzeUserImage = async (base64Image: string): Promise<UserAnalysis> => {
  const ai = getAiClient();
  const { mimeType, data } = cleanBase64(base64Image);
  
  const prompt = `Analyze this full-body image of a person for fashion styling purposes. 
  Identify the gender, estimate the body shape (e.g., Hourglass, Rectangle, Inverted Triangle, Pear, Oval), 
  detect the skin tone/complexion, and identify 3 dominant colors present in the image (if any clothing is worn) or suitable colors.
  Also describe the general 'vibe' or current style of the person.`;

  // We use 2.5 flash for fast vision analysis
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: mimeType,
            data: data
          }
        },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          gender: { type: Type.STRING },
          bodyShape: { type: Type.STRING },
          skinTone: { type: Type.STRING },
          detectedColors: { type: Type.ARRAY, items: { type: Type.STRING } },
          vibe: { type: Type.STRING }
        },
        required: ["gender", "bodyShape", "skinTone", "detectedColors", "vibe"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to analyze image");
  return JSON.parse(text) as UserAnalysis;
};

/**
 * Generates an outfit recommendation based on analysis and selected style.
 */
export const generateOutfitRecommendation = async (
  analysis: UserAnalysis,
  styleMode: StyleMode
): Promise<OutfitRecommendation> => {
  const ai = getAiClient();

  const prompt = `Act as a world-class fashion stylist. 
  Create a complete outfit recommendation for a ${analysis.gender} with a ${analysis.bodyShape} body shape and ${analysis.skinTone} skin tone.
  The occasion/style is: ${styleMode}.
  
  Suggest specific items (Top, Bottom, Shoes, Accessory).
  Provide a search query string for finding these items online.
  Create a specific visual prompt that I can feed into an image generator to visualize this outfit.`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          styleName: { type: Type.STRING },
          description: { type: Type.STRING },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                name: { type: Type.STRING },
                color: { type: Type.STRING },
                description: { type: Type.STRING },
                shoppingQuery: { type: Type.STRING }
              }
            }
          },
          colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
          visualPrompt: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Failed to generate outfit");
  return JSON.parse(text) as OutfitRecommendation;
};

/**
 * Generates a visual preview of the outfit.
 */
export const generateOutfitImage = async (
  visualPrompt: string, 
  styleMode: string, 
  originalImageBase64?: string
): Promise<string> => {
  const ai = getAiClient();

  // Switch to gemini-2.5-flash-image to avoid permission issues with pro-image-preview
  const model = 'gemini-2.5-flash-image';

  const environment = STYLE_ENVIRONMENTS[styleMode] || "clean high-fashion studio background, professional lighting";

  const finalPrompt = `Professional fashion photography, full body shot, cinematic lighting, 8k resolution, photorealistic. 
  ${visualPrompt}. 
  The model should be standing in a ${environment}.
  Ensure the outfit details match the description perfectly.`;

  const parts: any[] = [];

  // Add original image if provided to guide the generation (Image-to-Image)
  if (originalImageBase64) {
    const { mimeType, data } = cleanBase64(originalImageBase64);
    parts.push({
      inlineData: {
        mimeType: mimeType,
        data: data
      }
    });
  }

  parts.push({ text: finalPrompt });

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: parts
      },
      config: {
        imageConfig: {
          aspectRatio: "3:4", 
          // imageSize not supported on 2.5-flash-image
        }
      }
    });

    // Extract image from response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        // Use the returned mimeType, fallback to png if undefined
        const mimeType = part.inlineData.mimeType || 'image/png';
        return `data:${mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated");
  } catch (error) {
    console.error("Image generation failed", error);
    throw error;
  }
};