
import { GoogleGenAI, Type } from "@google/genai";
import { CVAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCV = async (fileData: string, mimeType: string): Promise<CVAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            inlineData: {
              data: fileData,
              mimeType: mimeType
            }
          },
          {
            text: "Phân tích hình ảnh CV này và trích xuất tên, kỹ năng, và cấp độ kinh nghiệm. Sau đó đề xuất 5 công việc phù hợp nhất dựa trên hồ sơ của họ. TẤT CẢ văn bản trả về phải bằng TIẾNG VIỆT. Trả về dữ liệu dưới dạng JSON hợp lệ."
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          summary: { type: Type.STRING },
          skills: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          experienceLevel: { type: Type.STRING },
          recommendedJobs: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                location: { type: Type.STRING },
                salaryRange: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                description: { type: Type.STRING },
                requiredSkills: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                whyMatch: { type: Type.STRING }
              },
              required: ["id", "title", "company", "location", "matchScore"]
            }
          }
        },
        required: ["name", "summary", "skills", "experienceLevel", "recommendedJobs"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
