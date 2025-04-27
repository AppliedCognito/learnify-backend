// server.js
import os from 'os';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import questionRoutes from './routes/questionRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/v1/', questionRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOSTNAME = os.hostname();  

app.listen(PORT, () => {
  console.log(` Server listening on http://${HOSTNAME}:${PORT}`);
});