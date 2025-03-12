// routes/interview.route.js
import express from 'express';
import { voiceUpload } from '../utils/multer.js';
import { handleInterview } from '../controllers/interview.controller.js';

const interviewRoute = express.Router();

interviewRoute.post('/voice-upload', voiceUpload.single('audio'), handleInterview);

export default interviewRoute;