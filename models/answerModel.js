import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  option_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Option', required: true }
}, { timestamps: true });

export const Answer = mongoose.model('Answer', answerSchema);
