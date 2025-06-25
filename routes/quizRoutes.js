import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuizById,
  getQuizzes,
  updateQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

// Routes
router.post("/quizzes", createQuiz);
router.get("/quizzes", getQuizzes);
router.get("/quizzes/:id", getQuizById);
router.put("/quizzes/:id", updateQuiz);
router.delete("/quizzes/:id", deleteQuiz);

export default router;
