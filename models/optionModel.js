import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  option_text: { type: String, required: true }
}, { timestamps: true });

export const Option = mongoose.model('Option', optionSchema);
