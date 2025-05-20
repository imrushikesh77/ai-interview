import resumeParser from "../utils/parseResume.js";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'; // For reading the JSON file
import { aiChat } from "../utils/chat.js";
import data from "../Data/data.js";
import resumeArray from "../Data/resume.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const handleUpload = async (req, res) => {
    try {
        const resume = req.file;
        if (!resume) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Construct correct file path
        const filePath = path.join(
            __dirname,
            '..',
            'uploads',
            'files', // Add the subdirectory if using previous multer config
            resume.filename
        );

        console.log('Processing file at:', filePath);

        // Parse the resume and generate JSON
        await resumeParser(filePath); // Ensure this completes before proceeding

        // Assuming resumeParser generates a JSON file in the same directory
        const jsonFilePath = path.join(
            __dirname,
            '..',
            'files',
            'compiled',
            `${resume.filename}.json` // Adjust based on the output of resumeParser
        );

        // Wait for the JSON file to be created
        await new Promise((resolve, reject) => {
            const checkFile = () => {
                if (fs.existsSync(jsonFilePath)) {
                    resolve();
                } else {
                    setTimeout(checkFile, 100); // Check again after 100ms
                }
            };
            checkFile();
        });

        // Read the generated JSON file
        const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
        // console.log(jsonData)
        const parsedData = JSON.parse(jsonData);
        // push the parsed data to the resume array
        resumeArray.push(parsedData);
        data.push({
            text: "Hello! I'm your interviewer. Let's get started.Give me your introduction.",
            sender: 'ai',
        });

        console.log("Sending data to AI chat:");
        let chatText = await aiChat(
            'Act as a technical interviewer. Based on the following context, ask only one question at a time.\n' +
            'Resume: ' + JSON.stringify(resume) + '\n' +
            'Job Title: ' + req.body.jobTitle + '\n' +
            'Job Description: ' + req.body.jobDescription + '\n' +
            'Conversation so far: ' + JSON.stringify(data) + '\n' +
            'Focus on asking technical and conceptual questions about topics like but not limited to inheritance and abstraction. ' +
            'Questions should start with "what" and be under 10 words. ' +
            'Keep questions very simple. Ask only one question at a time. Wait for a response before continuing.'
        );

        console.log('Chat response:', chatText);

        // Respond with the result from the external API
        res.status(200).json({
            message: 'File uploaded and processed successfully',
            filename: resume.filename,
            apiResponse: chatText,
            sessionId: 'tl8axwft7inqdijcoylnzs',
        });
    } catch (error) {
        console.error('Error in handleUpload:', error);
        res.status(500).json({
            message: 'An error occurred while processing the file',
            error: error.message
        });
    }
};

export { handleUpload };