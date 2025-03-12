import resumeParser from "../utils/parseResume.js";
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios'; // For making HTTP requests
import fs from 'fs'; // For reading the JSON file

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
        const parsedData = JSON.parse(jsonData);

        // Extract and clean the skills
        const skillsString = parsedData.skills;
        if (!skillsString || typeof skillsString !== 'string') {
            throw new Error('Skills not found or invalid format in JSON');
        }

        // Clean and extract skills as an array
        const skills = skillsString
            .split('\n') // Split by new lines
            .map(line => line.trim()) // Remove extra spaces
            .filter(line => line) // Remove empty lines
            .flatMap(line => line.split(':')[1] ? line.split(':')[1].split(',') : []) // Split by comma after the colon
            .map(skill => skill.trim()) // Trim each skill
            .filter(skill => skill); // Remove empty skills

        console.log('Extracted skills:', skills);

        // Sort keywords by length in descending order
        const sortedKeywords = skills.sort((a, b) => b.length - a.length);
    
        // Take only the first 5 keywords
        const top5Keywords = sortedKeywords.slice(0, 3);

        // Send skills to the external API
        const apiUrl = 'http://10.40.5.36:8000/generate-questions';
        const response = await axios.post(apiUrl, { keywords:top5Keywords });

        // Respond with the result from the external API
        res.status(200).json({
            message: 'File uploaded and processed successfully',
            filename: resume.filename,
            apiResponse: response.data
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