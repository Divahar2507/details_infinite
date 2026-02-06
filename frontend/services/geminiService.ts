
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (apiKey && apiKey !== 'PLACEHOLDER_API_KEY') {
      this.ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("VITE_API_KEY is missing or invalid. AI features will be disabled.");
    }
  }

  async generateBio(
    name: string,
    title: string,
    department: string,
    skills: string[],
    college?: string,
    degree?: string,
    major?: string,
    graduationYear?: string
  ): Promise<string> {
    if (!this.ai) return "AI features disabled (Missing API Key)";

    try {
      const educationContext = college && degree
        ? `A ${degree}${major ? ` in ${major}` : ''} graduate from ${college}${graduationYear ? ` (${graduationYear})` : ''},`
        : '';

      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Write a professional, 2-sentence employee bio for ${name}.
                   Job Title: ${title}.
                   Department: ${department}.
                   Education: ${educationContext}.
                   Skills: ${skills.join(', ')}.
                   Keep it welcoming, sophisticated and concise.`
              }
            ]
          }
        ]
      });
      return response.text?.trim() || "Bio could not be generated.";
    } catch (error) {
      console.error("Gemini Bio Generation Error:", error);
      return "Error generating bio. Please write manually.";
    }
  }

  async suggestSkills(jobTitle: string): Promise<string[]> {
    if (!this.ai) return [];

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Suggest 5 key technical skills for the role: ${jobTitle}. Return only a JSON array of strings.`
              }
            ]
          }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      return JSON.parse(response.text || "[]");
    } catch (error) {
      console.error("Gemini Skills Suggestion Error:", error);
      return [];
    }
  }
}

export const geminiService = new GeminiService();
