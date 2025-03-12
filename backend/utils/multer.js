// config/multer.config.js
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Common configuration for both file types
const createStorage = (subFolder) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join('uploads/', subFolder);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

// File filter for voice recordings
const voiceFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'), false);
  }
};

// Configure different upload handlers
const voiceUpload = multer({
  storage: createStorage('voices'),
  fileFilter: voiceFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit for audio
    files: 1
  }
});

const fileUpload = multer({
  storage: createStorage('files'),
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit for other files
  }
});

export { voiceUpload, fileUpload };