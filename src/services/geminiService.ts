
import { GoogleGenAI, Type } from "@google/genai";
import { CVAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCV = async (cvText: string): Promise<CVAnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Hãy phân tích nội dung CV sau đây và cung cấp đánh giá chuyên sâu bằng tiếng Việt:
      
      "${cvText}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: 'Tóm tắt ngắn gọn về ứng viên (khoảng 3 câu).' },
            topSkills: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: 'Danh sách các kỹ năng quan trọng nhất.'
            },
            suggestedRoles: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: 'Các vị trí công việc phù hợp.'
            },
            score: { type: Type.NUMBER, description: 'Điểm đánh giá năng lực từ 1-100.' }
          },
          required: ['summary', 'topSkills', 'suggestedRoles', 'score']
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};
