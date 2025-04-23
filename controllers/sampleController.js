import Sample from "../models/sample.js";

const getSamples = async (req, res) => {
  const samples = await Sample.find({});
  res.json(samples);
};

const createSample = async (req, res) => {
  const { name } = req.body;
  const sample = new Sample({ name });
  const createdSample = await sample.save();
  res.status(201).json(createdSample);
};

export { createSample, getSamples };
