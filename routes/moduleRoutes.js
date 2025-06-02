import express from 'express';
import {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule
} from '../controllers/moduleController.js';

const router = express.Router();

router.post('/modules', createModule);
router.get('/modules', getModules);               // Optional query ?subject_id=...
router.get('/modules/:id', getModuleById);
router.put('/modules/:id', updateModule);
router.delete('/modules/:id', deleteModule);

export default router;
