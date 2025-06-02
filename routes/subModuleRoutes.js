import express from 'express';
import {
  createSubModule,
  getSubModules,
  getSubModuleById,
  updateSubModule,
  deleteSubModule
} from '../controllers/subModuleController.js';

const router = express.Router();

router.post('/submodules', createSubModule);
router.get('/submodules', getSubModules);         // Optional query ?module_id=...
router.get('/submodules/:id', getSubModuleById);
router.put('/submodules/:id', updateSubModule);
router.delete('/submodules/:id', deleteSubModule);

export default router;
