import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  img_url: { type: String },
  paper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
  subject_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },          // ✅ newly added
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
  sub_module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubModule' },
  year: { type: Number },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  explanation: { type: String }
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
