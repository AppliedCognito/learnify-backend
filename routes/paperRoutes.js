import express from 'express';
import {
  createPaper,
  getPapers,
  getPaperById,
  updatePaper,
  deletePaper
} from '../controllers/paperController.js';

const router = express.Router();

router.post('/papers', createPaper);
router.get('/papers', getPapers);
router.get('/papers/:id', getPaperById);
router.put('/papers/:id', updatePaper);
router.delete('/papers/:id', deletePaper);

export default router;
