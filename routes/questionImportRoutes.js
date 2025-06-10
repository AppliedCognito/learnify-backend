import express from 'express';
import { importQuestionsFromExcel } from '../controllers/questionImportController.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.post('/import', upload.single('file'), importQuestionsFromExcel);

export default router;
