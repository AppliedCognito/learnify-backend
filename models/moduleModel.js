import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  paper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  name: { type: String, required: true }
}, { timestamps: true });

export const Module = mongoose.model('Module', moduleSchema);
