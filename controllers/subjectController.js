import asyncHandler from 'express-async-handler';
import { Subject } from '../models/subjectModel.js';

// @desc    Create a new Subject
// @route   POST /subjects
// @access  Public
const createSubject = asyncHandler(async (req, res) => {
  const { paper_id, name } = req.body;

  if (!paper_id || !name) {
    res.status(400);
    throw new Error('paper_id and name are required');
  }

  const subject = new Subject({ paper_id, name });
  const createdSubject = await subject.save();

  res.status(201).json(createdSubject);
});

// @desc    Get all Subjects
// @route   GET /subjects
// @access  Public
const getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find().populate('paper_id', 'name');
  res.status(200).json(subjects);
});

// @desc    Get a single Subject by ID
// @route   GET /subjects/:id
// @access  Public
const getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id).populate('paper_id', 'name');

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  res.status(200).json(subject);
});

// @desc    Update a Subject
// @route   PUT /subjects/:id
// @access  Public
const updateSubject = asyncHandler(async (req, res) => {
  const { paper_id, name } = req.body;

  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  if (paper_id) subject.paper_id = paper_id;
  if (name) subject.name = name;

  const updatedSubject = await subject.save();
  res.status(200).json(updatedSubject);
});

// @desc    Delete a Subject
// @route   DELETE /subjects/:id
// @access  Public
const deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    res.status(404);
    throw new Error('Subject not found');
  }

  await subject.deleteOne(); // ✅ correct method

  res.status(200).json({ message: 'Subject deleted successfully' });
});


export {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
