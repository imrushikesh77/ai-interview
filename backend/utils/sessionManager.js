import { aiChat } from "./chat.js";

class InterviewSessionManager {
    constructor() {
        this.sessions = {}; // Object to store interview sessions, keyed by session ID
    }

    createSession(userId) {
        const sessionId = this.generateUniqueId();
        this.sessions[sessionId] = {
            userId: userId,
            conversationHistory: [],
            userContext: {},
        };
        console.log(`Created new session ${sessionId} for user ${userId}`);
        return sessionId;
    }

    getSession(sessionId) {
        return this.sessions[sessionId] || null;
    }

    addConversationTurn(sessionId, role, text) {
        const session = this.getSession(sessionId);
        if (session) {
            session.conversationHistory.push({ role, text });
            console.log(`Session ${sessionId}: Added turn - ${role}: ${text}`);
        } else {
            console.error(`Session ${sessionId} not found.`);
        }
    }


    updateUserContext(sessionId, contextData) {
        const session = this.getSession(sessionId);
        if (session) {
            session.userContext = { ...session.userContext, ...contextData };
            console.log(`Session ${sessionId}: Updated user context - ${JSON.stringify(session.userContext)}`);
        } else {
            console.error(`Session ${sessionId} not found.`);
        }
    }

    generateUniqueId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    async generateQuestion(sessionId, prompt) {
        const session = this.getSession(sessionId);
        if (!session) {
            console.error(`Session ${sessionId} not found for question generation.`);
            return null;
        }

        try {
            console.log(`Session ${sessionId}: Sending prompt to Gemini - ${prompt.substring(0, 100)}...`); // Log part of the prompt
            // In a real application, you would use a proper HTTP client (like fetch or axios)
            // and the official Gemini API library.

            let chatText = await aiChat(prompt);

            if (chatText) {
                this.addConversationTurn(sessionId, 'ai', chatText);
                return chatText;
            } else {
                console.warn(`Gemini API response for session ${sessionId} did not contain a question.`);
                return null;
            }

        } catch (error) {
            console.error(`Error calling Gemini API for session ${sessionId}:`, error);
            return null;
        }
    }

    constructPrompt(sessionId, latestUserResponse = "") {
        const session = this.getSession(sessionId);
        if (!session) {
            console.error(`Session ${sessionId} not found for prompt construction.`);
            return null;
        }

        let prompt = "";

        // Include user-specific context
        if (session.userContext && Object.keys(session.userContext).length > 0) {
            prompt += "Consider the following background information about the candidate: ";
            for (const key in session.userContext) {
                prompt += `${key}: ${session.userContext[key]}. `;
            }
            prompt += "\n\n";
        }

        // Include conversation history
        if (session.conversationHistory.length > 0) {
            prompt += "Here is the conversation history so far:\n";
            session.conversationHistory.forEach(turn => {
                prompt += `${turn.role === 'ai' ? 'AI:' : 'User:'} ${turn.text}\n`;
            });
            prompt += "\n";
        }

        // Add instructions for the next question
        if (latestUserResponse) {
            prompt += `The user's last response was: "${latestUserResponse}". Generate a relevant follow-up interview question.`;
        } else {
            prompt += "Generate the next interview question.";
        }

        return prompt;
    }
}

export default InterviewSessionManager;