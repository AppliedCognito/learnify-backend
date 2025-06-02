import asyncHandler from "express-async-handler";
import { SubModule } from "../models/subModuleModel.js";

// Create a submodule
const createSubModule = asyncHandler(async (req, res) => {
  const subModule = await SubModule.create(req.body);
  res.status(201).json(subModule);
});

// Get all submodules or filtered by module_id (query param)
const getSubModules = asyncHandler(async (req, res) => {
  const { module_id } = req.query;

  let query = {};
  if (module_id) {
    query.module_id = module_id;
  }

  const subModules = await SubModule.find(query).populate("module_id", "name");
  res.json(subModules);
});

// Get submodule by ID
const getSubModuleById = asyncHandler(async (req, res) => {
  const subModule = await SubModule.findById(req.params.id).populate(
    "module_id",
    "name"
  );
  if (!subModule) {
    res.status(404);
    throw new Error("SubModule not found");
  }
  res.json(subModule);
});

// Update submodule
const updateSubModule = asyncHandler(async (req, res) => {
  const updated = await SubModule.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updated) {
    res.status(404);
    throw new Error("SubModule not found");
  }
  res.json(updated);
});

// Delete submodule
const deleteSubModule = asyncHandler(async (req, res) => {
  const deleted = await SubModule.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error("SubModule not found");
  }
  res.json({ message: "SubModule deleted" });
});

export {
  createSubModule,
  deleteSubModule,
  getSubModuleById,
  getSubModules,
  updateSubModule,
};
