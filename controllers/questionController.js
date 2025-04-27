import asyncHandler from 'express-async-handler';
import { Question } from '../models/questionModel.js';

// @desc    Create a new Question
// @route   POST /questions
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const question = new Question(req.body);
  const savedQuestion = await question.save();
  res.status(201).json(savedQuestion);
});

// @desc    Get all Questions
// @route   GET /questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).json(questions);
});

// @desc    Get a single Question by ID
// @route   GET /questions/:id
// @access  Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }
  res.status(200).json(question);
});

// @desc    Update a Question
// @route   PUT /questions/:id
// @access  Public
const updateQuestion = asyncHandler(async (req, res) => {
  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updatedQuestion) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.status(200).json(updatedQuestion);
});

// @desc    Delete a Question
// @route   DELETE /questions/:id
// @access  Public
const deleteQuestion = asyncHandler(async (req, res) => {
  const deletedQuestion = await Question.findByIdAndDelete(req.params.id);

  if (!deletedQuestion) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.status(200).json({ message: 'Question deleted successfully' });
});

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
};
