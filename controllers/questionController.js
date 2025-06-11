import asyncHandler from 'express-async-handler';
import { Question } from '../models/questionModel.js';
import { Option } from '../models/optionModel.js';
import { Answer } from '../models/answerModel.js';

// @desc    Create a new Question with options and correct answer
// @route   POST /questions
// @access  Public
const createQuestion = asyncHandler(async (req, res) => {
  const {
    text,
    img_url,
    subject_id,        // ✅ added here
    module_id,
    sub_module_id,
    paper_id,
    year,
    difficulty,
    explanation,
    options,
    correct_option_index
  } = req.body;

  if (!options || options.length < 2) {
    res.status(400);
    throw new Error('At least two options are required');
  }

  const question = await Question.create({
    text,
    img_url,
    subject_id,       // ✅ saved here
    module_id,
    sub_module_id,
    paper_id,
    year,
    difficulty,
    explanation
  });

  const savedOptions = await Promise.all(
    options.map(opt =>
      Option.create({ question_id: question._id, option_text: opt })
    )
  );

  const correctOption = savedOptions[correct_option_index];

  if (!correctOption) {
    res.status(400);
    throw new Error('Correct option index is invalid');
  }

  await Answer.create({
    question_id: question._id,
    option_id: correctOption._id
  });

  res.status(201).json({
    message: 'Question created',
    question,
    options: savedOptions,
    correct_option_id: correctOption._id
  });
});

// @desc    Get all Questions with options
// @route   GET /questions
// @access  Public
const getQuestions = asyncHandler(async (req, res) => {
  // Sort questions by createdAt in descending order (latest first)
  const questions = await Question.find().sort({ createdAt: -1 });

  const results = await Promise.all(
    questions.map(async (q) => {
      const options = await Option.find({ question_id: q._id });
      const answer = await Answer.findOne({ question_id: q._id });
      return {
        ...q.toObject(),
        options,
        correct_option_id: answer?.option_id,
      };
    })
  );

  res.status(200).json(results);
});


// @desc    Get a single Question by ID with options
// @route   GET /questions/:id
// @access  Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  const options = await Option.find({ question_id: question._id });
  const answer = await Answer.findOne({ question_id: question._id });

  res.status(200).json({
    ...question.toObject(),
    options,
    correct_option_id: answer?.option_id
  });
});

// @desc    Update a Question (basic fields only)
// @route   PUT /questions/:id
// @access  Public
const updateQuestion = asyncHandler(async (req, res) => {
  const updated = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!updated) {
    res.status(404);
    throw new Error('Question not found');
  }

  res.status(200).json(updated);
});

// @desc    Delete a Question + its options + answer
// @route   DELETE /questions/:id
// @access  Public
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);
  if (!question) {
    res.status(404);
    throw new Error('Question not found');
  }

  await Option.deleteMany({ question_id: question._id });
  await Answer.deleteMany({ question_id: question._id });

  await question.deleteOne();

  res.status(200).json({ message: 'Question and related data deleted' });
});

export {
  createQuestion,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion
};
