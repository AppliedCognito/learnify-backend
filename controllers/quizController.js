import asyncHandler from 'express-async-handler';
import { Quiz } from '../models/quizModel.js';

// @desc    Create a new Quiz
// @route   POST /quizzes
// @access  Public
const createQuiz = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    subject_id,
    module_id,
    sub_module_id,
    question_ids,
    timeLimit
  } = req.body;

  if (!title || !subject_id || !question_ids || question_ids.length === 0) {
    res.status(400);
    throw new Error('Title, subject_id, and at least one question are required');
  }

  const quiz = await Quiz.create({
    title,
    description,
    subject_id,
    module_id,
    sub_module_id,
    question_ids,
    totalQuestions: question_ids.length,
    timeLimit
  });

  res.status(201).json({ message: 'Quiz created successfully', quiz });
});

// @desc    Get all Quizzes
// @route   GET /quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const quizzes = await Quiz.find()
    .populate('subject_id', 'name')
    .populate('module_id', 'name')
    .populate('sub_module_id', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json(quizzes);
});

// @desc    Get a Quiz by ID (with questions)
// @route   GET /quizzes/:id
// @access  Public
const getQuizById = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id)
    .populate('subject_id', 'name')
    .populate('module_id', 'name')
    .populate('sub_module_id', 'name')
    .populate({
      path: 'question_ids',
      select: 'text options correct_option',
    });

  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  res.status(200).json(quiz);
});

// @desc    Update a Quiz
// @route   PUT /quizzes/:id
// @access  Public
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  const updatedFields = req.body;

  // If questions updated, recalculate total
  if (updatedFields.question_ids) {
    updatedFields.totalQuestions = updatedFields.question_ids.length;
  }

  const updatedQuiz = await Quiz.findByIdAndUpdate(
    req.params.id,
    updatedFields,
    { new: true }
  );

  res.status(200).json({ message: 'Quiz updated', quiz: updatedQuiz });
});

// @desc    Delete a Quiz
// @route   DELETE /quizzes/:id
// @access  Public
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) {
    res.status(404);
    throw new Error('Quiz not found');
  }

  await quiz.deleteOne();
  res.status(200).json({ message: 'Quiz deleted successfully' });
});

export {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
