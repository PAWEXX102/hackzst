import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const createGenAI = () => {
  if (!apiKey) {
    console.error(
      "BŁĄD: Brak klucza API Gemini. Sprawdź zmienne środowiskowe."
    );
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

const genAI = createGenAI();

interface ChatMessage {
  role: "user" | "model" | "system";
  content: string;
}

export const generateChatResponse = async (
  messages: ChatMessage[],
  modelName = "gemini-1.5-flash",
  temperature = 0.7,
  maxOutputTokens = 1024,
  systemInstruction?: string
) => {
  try {
    if (messages.length === 0) {
      throw new Error("No messages provided");
    }

    if (messages[0].role !== "user") {
      messages.unshift({
        role: "user",
        content: "Pomóż mi z przepisem kulinarnym.",
      });
    }

    const selectedModel = genAI?.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature,
        maxOutputTokens,
        topP: 0.8,
        topK: 40,
      },
    });

    const formattedMessages = messages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const chat = selectedModel?.startChat({
      history:
        formattedMessages.length > 1 ? formattedMessages.slice(0, -1) : [],
    });

    let messageToSend =
      formattedMessages[formattedMessages.length - 1].parts[0].text;

    if (systemInstruction) {
      messageToSend = `${systemInstruction}\n\n${messageToSend}`;
    }

    const result = await chat?.sendMessage(messageToSend);
    return result?.response.text();
  } catch (error) {
    console.error("Error with chat response:", error);
    throw error;
  }
};

export const checkRemainingQuota = async () => {
  try {
    return {
      dailyRemaining: "Nieznane",
      monthlyUsage: "Nieznane",
    };
  } catch (error) {
    console.error("Error checking quota:", error);
    return { error: "Nie udało się sprawdzić limitu" };
  }
};
