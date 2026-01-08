
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeText = async (text: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze the following IELTS-related paragraph and transform it into a vocabulary learning module.
    
    Paragraph: "${text}"
    
    Rules:
    1. Extract unique, academic, high-frequency IELTS vocabulary minimum 10.
    2. Exclude common stopwords and non-academic proper nouns.
    3. Provide contextual meanings (English and Bengali).
    4. Provide alternatives matching the formal IELTS register.
    5. Ensure example sentences are IELTS-appropriate and grammatically complex.
    6. Include paraphrasing intelligence for Writing Task 1/2 and Reading.
    7. Provide band 7+ insights, common mistakes, and register warnings.
    8. Include a memory hook and a paraphrased version of the example sentence.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: "A short academic summary of the text provided."
          },
          vocabulary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING },
                pos: { type: Type.STRING, description: "Part of speech (e.g., Noun, Verb, Adjective)" },
                englishMeaning: { type: Type.STRING },
                bengaliMeaning: { type: Type.STRING },
                alternatives: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                collocations: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                exampleSentence: { type: Type.STRING },
                banglaExample: { type: Type.STRING },
                isHighValue: { type: Type.BOOLEAN },
                registerWarning: { type: Type.STRING },
                paraphrasedSentence: { type: Type.STRING },
                memoryHook: { type: Type.STRING },
                bandInsight: {
                  type: Type.OBJECT,
                  properties: {
                    reason: { type: Type.STRING },
                    mistake: { type: Type.STRING },
                    usage: { type: Type.STRING }
                  },
                  required: ["reason", "mistake", "usage"]
                },
                taskUsage: {
                  type: Type.OBJECT,
                  properties: {
                    task1: { type: Type.STRING },
                    task2: { type: Type.STRING },
                    reading: { type: Type.STRING }
                  },
                  required: ["task1", "task2", "reading"]
                }
              },
              required: [
                "word", "pos", "englishMeaning", "bengaliMeaning", "alternatives", 
                "collocations", "exampleSentence", "banglaExample", "isHighValue",
                "paraphrasedSentence", "memoryHook", "bandInsight", "taskUsage"
              ]
            }
          }
        },
        required: ["summary", "vocabulary"]
      }
    }
  });

  const resultStr = response.text;
  try {
    const parsed: any = JSON.parse(resultStr);
    return {
      ...parsed,
      originalText: text
    };
  } catch (err) {
    console.error("Failed to parse Gemini response:", err);
    throw new Error("Invalid response format from analysis engine.");
  }
};
