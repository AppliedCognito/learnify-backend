import mongoose from 'mongoose';

const paperSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

export const Paper = mongoose.model('Paper', paperSchema);
