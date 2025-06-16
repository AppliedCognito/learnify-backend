import asyncHandler from "express-async-handler";
import { Module } from "../models/moduleModel.js";

// Create a module
const createModule = asyncHandler(async (req, res) => {
  const module = await Module.create(req.body);
  res.status(201).json(module);
});

// Get all modules or modules filtered by subject_id (query param)
const getModules = asyncHandler(async (req, res) => {
  const { subject_id } = req.query;

  let query = {};
  if (subject_id) {
    query.subject_id = subject_id;
  }

  const modules = await Module.find(query).populate("subject_id", "name");
  res.json(modules);
});

// Get module by ID
const getModuleById = asyncHandler(async (req, res) => {
  const module = await Module.findById(req.params.id).populate(
    "subject_id",
    "name"
  );
  if (!module) {
    res.status(404);
    throw new Error("Module not found");
  }
  res.json(module);
});

// Update module
const updateModule = asyncHandler(async (req, res) => {
  const { name, subject_id } = req.body;

  const module = await Module.findById(req.params.id);
  if (!module) {
    res.status(404);
    throw new Error("Module not found");
  }

  if (name) module.name = name;
  // Optional: allow subject change
  if (subject_id) module.subject_id = subject_id;
  const updated = await module.save();
  res.json(updated);
});

// Delete module
const deleteModule = asyncHandler(async (req, res) => {
  const deleted = await Module.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("Module not found");
  }
  res.json({ message: "Module deleted" });
});

export { createModule, deleteModule, getModuleById, getModules, updateModule };
