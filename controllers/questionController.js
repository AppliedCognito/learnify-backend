import asyncHandler from 'express-async-handler';
import { Question } from '../models/questionModel.js';

// @desc    Create a new Question
// @route   POST /questions
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const {
    text,
    statements = [],
    img_url,
    paper_id,
    subject_id,
    module_id,
    sub_module_id,
    year,
    difficulty,
    explanation,
    options, // { A, B, C, D }
    correct_option
  } = req.body;

  // Validation
  if (!text || !options || !correct_option) {
    res.status(400);
    throw new Error('Question text, options, and correct_option are required');
  }

  const question = await Question.create({
    text,
    statements,
    img_url,
    paper_id,
    subject_id,
    module_id,
    sub_module_id,
    year,
    difficulty,
    explanation,
    options,
    correct_option,
  });

  res.status(201).json({ message: 'Question created', question });
});

// @desc    Get all Questions
// @route   GET /questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()
    .populate('paper_id', 'name')
    .populate('subject_id', 'name')
    .populate('module_id', 'name')
    .populate('sub_module_id', 'name')
    .sort({ createdAt: -1 });

  res.status(200).json(questions);
});

// @desc    Get a single Question by ID
// @route   GET /questions/:id
// @access  Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)
    .populate('paper_id', 'name')
    .populate('subject_id', 'name')
    .populate('module_id', 'name')
    .populate('sub_module_id', 'name');

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
  const question = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.status(200).json({ message: 'Question updated', question });
});

// @desc    Delete a Question
// @route   DELETE /questions/:id
// @access  Public
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  await question.deleteOne();
  res.status(200).json({ message: 'Question deleted successfully' });
});

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
};
