import vosk from 'vosk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpeg from 'fluent-ffmpeg';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to the Vosk model
const MODEL_PATH = path.join(__dirname, '..', 'vosk-model-small-en-us-0.15');

// Check if the model exists
if (!fs.existsSync(MODEL_PATH)) {
  console.error('Vosk model not found at:', MODEL_PATH);
  process.exit(1);
}

// Check if FFmpeg is installed
ffmpeg.getAvailableFormats((err, formats) => {
  if (err) {
    console.error('FFmpeg is not installed or not found in PATH. Please install FFmpeg.');
    process.exit(1);
  }
  console.log('FFmpeg is available.');
});

/**
 * Converts audio file to WAV format
 * @param {string} inputPath - Path to the input audio file
 * @param {string} outputPath - Path to save the converted WAV file
 * @returns {Promise<string>} - Path to the converted WAV file
 */
const convertToWav = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .audioFrequency(16000) // Set sample rate to 16kHz
      .audioChannels(1) // Convert to mono
      .format('wav')
      .on('end', () => resolve(outputPath))
      .on('error', (err) => reject(err))
      .save(outputPath);
  });
};

/**
 * Converts audio file to text using Vosk
 * @param {string} filePath - Path to the audio file
 * @returns {Promise<string>} - Converted text
 */
const convertAudioToText = async (filePath) => {
  const wavFilePath = filePath.replace('.webm', '.wav');
  await convertToWav(filePath, wavFilePath); // Convert to .wav

  return new Promise((resolve, reject) => {
    try {
      const model = new vosk.Model(MODEL_PATH);

      // Create a readable stream from the audio file
      const audioStream = fs.createReadStream(wavFilePath, { highWaterMark: 4096 });

      // Initialize the recognizer
      const recognizer = new vosk.Recognizer({ model: model, sampleRate: 16000 });

      let text = '';

      // Process the audio stream
      audioStream.on('data', (chunk) => {
        if (recognizer.acceptWaveform(chunk)) {
          text += recognizer.result().text + ' ';
        }
      });

      // Handle end of stream
      audioStream.on('end', () => {
        text += recognizer.finalResult().text;
        recognizer.free(); // Free up resources
        fs.unlinkSync(wavFilePath); // Delete the temporary .wav file
        resolve(text.trim());
      });

      // Handle errors
      audioStream.on('error', (err) => {
        recognizer.free();
        fs.unlinkSync(wavFilePath); // Delete the temporary .wav file
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default convertAudioToText;