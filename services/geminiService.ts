import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure API_KEY is set in environment

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const streamConciergeResponse = async (
  history: { role: string; text: string }[],
  userMessage: string
) => {
  try {
    const ai = getClient();
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are the "IHM Digital Concierge", a helpful and polite virtual assistant for IHM Vacations (Insight Hospitality Management) in Orlando, Florida. 
        Your goal is to help guests plan their vacation, answer questions about Orlando attractions (Disney, Universal), and explain IHM benefits (Instant Booking, Digital Concierge, Flexible Cancellation).
        Keep responses concise, friendly, and inviting. If asked about booking availability, encourage them to use the search bar on the homepage.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessageStream({ message: userMessage });
    return result;

  } catch (error) {
    console.error("Error communicating with Gemini Concierge:", error);
    throw error;
  }
};