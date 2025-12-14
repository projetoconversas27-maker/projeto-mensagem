import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) return "Simulação: O Gemini responderia aqui (Adicione API KEY).";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: "Você é o assistente virtual oficial do app TUPÃ, uma rede social de eventos e baladas. Você é jovem, animado, usa emojis, gírias leves e ajuda os usuários com informações sobre festas. Responda de forma curta e engajadora.",
      },
    });
    return response.text || "Eita, a música tá alta, não ouvi! 🎶 (Erro na IA)";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops, sistema sobrecarregado de vibes! Tente de novo.";
  }
};