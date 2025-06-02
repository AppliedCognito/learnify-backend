import asyncHandler from 'express-async-handler';
import { Paper } from '../models/paperModel.js';

// @desc    Create a paper
// @route   POST /papers
const createPaper = asyncHandler(async (req, res) => {
  const paper = await Paper.create(req.body);
  res.status(201).json(paper);
});

// @desc    Get all papers
// @route   GET /papers
const getPapers = asyncHandler(async (req, res) => {
  const papers = await Paper.find();
  res.json(papers);
});

// @desc    Get a paper by ID
// @route   GET /papers/:id
const getPaperById = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id);
  if (!paper) throw new Error('Paper not found');
  res.json(paper);
});

// @desc    Update a paper
// @route   PUT /papers/:id
const updatePaper = asyncHandler(async (req, res) => {
  const updated = await Paper.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) throw new Error('Paper not found');
  res.json(updated);
});

// @desc    Delete a paper
// @route   DELETE /papers/:id
const deletePaper = asyncHandler(async (req, res) => {
  const deleted = await Paper.findByIdAndDelete(req.params.id);
  if (!deleted) throw new Error('Paper not found');
  res.json({ message: 'Paper deleted' });
});

// ✅ Export all functions at the bottom
export {
  createPaper,
  getPapers,
  getPaperById,
  updatePaper,
  deletePaper
};
