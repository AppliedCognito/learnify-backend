// server.js
import os from 'os';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ Add this line
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import questionRoutes from './routes/questionRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import paperRoutes from './routes/paperRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js';
import moduleRoutes from './routes/moduleRoutes.js';
import subModuleRoutes from './routes/subModuleRoutes.js';
import questionImportRoutes from './routes/questionImportRoutes.js';

dotenv.config();

connectDB();

const app = express();

// ✅ Enable CORS
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/', questionRoutes);
app.use('/api/v1/', quizRoutes);
app.use('/api/v1/', paperRoutes);
app.use('/api/v1/', subjectRoutes);
app.use('/api/v1/', moduleRoutes);
app.use('/api/v1/', subModuleRoutes);
app.use('/api/v1/questions/', questionImportRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOSTNAME = os.hostname();  

app.listen(PORT, () => {
  console.log(` Server listening on http://${HOSTNAME}:${PORT}`);
});
