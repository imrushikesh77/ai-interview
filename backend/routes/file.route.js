import express from 'express';
import { fileUpload } from '../utils/multer.js';
import { handleUpload } from '../controllers/file.controller.js';

const fileRoute = express.Router();

fileRoute.post('/upload', fileUpload.single('resume'), handleUpload);



export default fileRoute;