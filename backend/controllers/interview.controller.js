import convertAudioToText from "../utils/audioToText.js";
import { similarityFromLevenshtein } from "../utils/evaluateAnswer.js";
import axios from 'axios';

const handleInterview = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No audio file uploaded',
        message: 'Upload failed',
      });
    }

    // Access file details from req.file
    const { originalname, filename, path: filePath, size } = req.file;

    // Convert .webm audio to text
    const audioText = await convertAudioToText(filePath);

    console.log('Converted Text:', audioText);

    // Convert audioText to an array of keywords
    const keywords = extractKeywords(audioText);

    console.log('Keywords:', keywords);

    // Send keywords to external API
    const apiResponse = await axios.post('http://10.40.5.36:8000/generate-questions', {
      keywords: keywords,
    });

    // console.log('API Response',apiResponse.data);

    // Respond with success, API response, and file details
    let similarity = similarityFromLevenshtein(audioText, apiResponse.data.questions[0].context);
    res.status(200).json({
      similarity: similarity,
      convertedText: audioText,
      question: apiResponse.data.questions[0].question, // Send the API response to the user
    });
  } catch (error) {
    console.error('Error processing interview:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to process interview request',
    });
  }
};

/**
 * Extracts keywords from the given text
 * @param {string} text - The text to extract keywords from
 * @returns {string[]} - Array of keywords
 */
const extractKeywords = (text) => {
    // Simple keyword extraction: split text into words and filter out stopwords
    const stopwords = new Set(['a', 'an', 'the', 'is', 'are', 'and', 'or', 'in', 'on', 'at', 'to', 'of', 'for', 'with', 'as', 'by', 'about']);
    const words = text.toLowerCase().split(/\s+/); // Split text into words
    const keywords = words.filter((word) => !stopwords.has(word) && word.length > 2); // Filter out stopwords and short words
  
    // Sort keywords by length in descending order
    const sortedKeywords = keywords.sort((a, b) => b.length - a.length);
  
    // Take only the first 5 keywords
    const top5Keywords = sortedKeywords.slice(0, 4);
  
    return top5Keywords;
  };

export { handleInterview };