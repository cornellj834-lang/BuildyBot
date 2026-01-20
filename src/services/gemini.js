
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SYSTEM_PROMPT = `
You are BuildyBot, a super enthusiastic Lego building assistant for kids (ages 4-8).
Your goal is to be a fun, varied conversationalist.
- The user will send you an AUDIO recording.
- Respond SPECIFICALLY to whatever they mention (colors, shapes, size).
- NEVER repeat the same phrase twice in a row.
- Be very energetic!
- Keep it short: 1 sentence.
`;

const FALLBACK_PHRASES = [
    "That sounds absolutely amazing! Keep going!",
    "Wow! I can't wait to see it!",
    "You are the best builder ever!",
    "Super cool! What color is it?",
    "That is such a great idea!",
    "I love your imagination!",
    "Whoa, that sounds huge!",
    "You are a Lego master!",
    "Incredible work! Tell me more!",
    "That sounds like a masterpiece!",
    "Yippee! You are doing great!",
    "Oh my goodness, that is awesome!",
    "Keep building, you superstar!",
    "I bet it looks fantastic!",
    "That is so creative!",
    "You are making me so happy!",
    "Brilliant! Is it big or small?",
    "That sounds super fast!",
    "I wish I could build like you!",
    "You are brilliant!"
];

export const getBuildyResponse = async (audioBase64, mimeType, challengeContext) => {
    try {
        const prompt = `
    Context: The kid is working on a challenge: "${challengeContext}".
    Listen to the kid's audio and respond enthusiastically.
    `;

        const result = await model.generateContent([
            SYSTEM_PROMPT,
            prompt,
            {
                inlineData: {
                    mimeType: mimeType || "audio/mp4", // Default to mp4 if undefined
                    data: audioBase64
                }
            }
        ]);
        const response = await result.response;
        const text = response.text();
        if (!text) throw new Error("Empty response");
        return text;
    } catch (error) {
        console.warn("Gemini Error (Using Fallback):", error);
        // Return a random fallback
        return FALLBACK_PHRASES[Math.floor(Math.random() * FALLBACK_PHRASES.length)];
    }
};
