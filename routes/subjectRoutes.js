import express from 'express';
import {
  createSubject,
  getSubjects,
  getAllSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject
} from '../controllers/subjectController.js';

const router = express.Router();

router.post('/subjects', createSubject);
router.get('/subjects', getSubjects);
router.get('/getAllSubjects', getAllSubjects);
router.get('/subjects/:id', getSubjectById);
router.put('/subjects/:id', updateSubject);
router.delete('/subjects/:id', deleteSubject);

export default router;
