import { GoogleGenAI } from "@google/genai";

export const AI_GEMINI = () => {
    const ai = new GoogleGenAI({})
    return ai
}