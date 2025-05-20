// routes/interview.route.js
import express from 'express';
import { voiceUpload } from '../utils/multer.js';
import { handleInterview } from '../controllers/interview.controller.js';
import data from '../Data/data.js';
import { aiChat } from '../utils/chat.js';

const interviewRoute = express.Router();

interviewRoute.post('/voice-upload', voiceUpload.single('audio'), handleInterview);
interviewRoute.post("/evaluate", async (req, res) => {
    // Prepare evaluation prompt
    console.log("Data: ", data)
    const prompt = `
You are an AI interview evaluator. Based on the following Q&A pairs, assess the candidate's conceptual understanding.

Conversation:
${JSON.stringify(data)}

Give a short summary of their understanding, and a final similarity score out of 100 based on how well the candidate's answers align with ideal technical expectations.

IMPORTANT: Keep the similarity score less than 70
Respond in JSON format:
{
  "summary": "...",
  "similarity": 78,
  "confidence": 50,
}
`;

    try {
        const result = await aiChat(prompt);
        const text = result.chatText;

        // Try to extract JSON from AI's response
        const jsonMatch = text?.match(/\{[\s\S]*?\}/);
        const parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { similarity: 0, summary: "Could not parse evaluation." };
        console.log(parsed);
        res.json(parsed);
    } catch (err) {
        console.error("Gemini evaluation error:", err);
        res.status(500).json({ error: "Failed to evaluate answers." });
    }
});

export default interviewRoute;