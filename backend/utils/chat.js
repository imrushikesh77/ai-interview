import { GoogleGenerativeAI } from "@google/generative-ai";
import { aiConfig } from "./setup.js";

const genAI = new GoogleGenerativeAI(aiConfig.gemeni.apiKey);

const aiChat = async (prompt) => {
    const model = genAI.getGenerativeModel({
        model: aiConfig.gemeni.model,
        safetySettings: aiConfig.gemeni.safetySettings,
    });

    try {
        const result = await model.generateContent([prompt]);
        const chatText = result?.response?.text();

        // Wait for 3 seconds (3000 ms)
        await new Promise((resolve) => setTimeout(resolve, 3000));

        return {
            chatText,
        };
    } catch (error) {
        console.log("Error", error);
        return { Error: "Uh oh! Caught error while fetching data, try again later...!" };
    }
};

export { aiChat };
