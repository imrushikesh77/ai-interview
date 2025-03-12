import express from 'express';
import cors from 'cors';
import fileRoute from './routes/file.route.js';
import interviewRoute from './routes/interview.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/file', fileRoute);
app.use('/api/v1/interview', interviewRoute);
app.get('/', (req, res) => {
    res.send('Hello World');
});

export default app;