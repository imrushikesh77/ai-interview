import convertAudioToText from "../utils/audioToText.js";
import { similarityFromLevenshtein } from "../utils/evaluateAnswer.js";
import { aiChat } from "../utils/chat.js";
import data from "../Data/data.js";
import resumeArray from "../Data/resume.js";


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
    const audioText = await convertAudioToText(filename);

    console.log('Converted Text:', audioText);
    data.push({
      text: audioText,
      sender: 'user',
    });
    let sessionId = req.body.sessionId;

    let chatText = await aiChat(
      'Generate next interview question based on the resume and job description. Resume: ' +
      JSON.stringify(resumeArray) +
      ' and the following conversation: ' +
      JSON.stringify(data) +
      'NOTE: As a response ask only one question at a time and wait for the user to respond before asking the next question. The next question can be a follow up question on the answer or any other topic based on resume. keep the questions short and concise. '
    );

    data.push({
      text: chatText,
      sender: 'ai',
    });

    return res.status(200).json({
      sessionId: sessionId,
      apiResponse: chatText,
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