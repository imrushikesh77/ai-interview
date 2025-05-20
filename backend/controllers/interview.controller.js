import convertAudioToText from "../utils/audioToText.js";
import { similarityAndConfidence } from "../utils/evaluateAnswer.js";
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
      'Act as a technical interviewer. Start with very basic conceptual questions based on the candidate\'s resume and the job description.\n' +
      'Resume: ' + JSON.stringify(resumeArray) + '\n' +
      'Job Description: ' + req.body.jobDescription + '\n' +
      'Conversation so far: ' + JSON.stringify(data) + '\n' +
      'Ask only one conceptual question at a time. Start from the basics of each topic.\n' +
      'Use a mix of "what", "why", "how", "when", and "can" questions. Keep each question short and simple (under 10 words).\n' +
      'In your response, give only the next question. No explanation or extra text.' +
      'IMPORTANT: Ask only 3 questions per topic before switching to a new one.'
    );

    data.push({
      text: chatText?.chatText || chatText,
      sender: 'ai',
    });
    // let conf = similarityAndConfidence();
    // console.log('Similarity:', conf.similarity);

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