import { GoogleGenAI } from "@google/genai";

const getAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found");
  }

  return new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
};

// POST /api/ai/chat
export const chatWithAI = async (req, res) => {
  const { query, jobs, cvContent } = req.body;

  const systemInstruction = `
Bạn là JobMatch Assistant.
CV: ${cvContent || "Chưa có"}
Jobs: ${JSON.stringify(jobs)}
`;

  try {
    const ai = getAI(); // ✅ tạo tại đây

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: query,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "AI error" });
  }
};
