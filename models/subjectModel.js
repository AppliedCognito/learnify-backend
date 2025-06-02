import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  paper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  name: { type: String, required: true }
}, { timestamps: true });

export const Subject = mongoose.model('Subject', subjectSchema);