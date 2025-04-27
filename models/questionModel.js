import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  img_url: { type: String },
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  sub_module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SubModule', required: true },
  paper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Paper', required: true },
  year: { type: Number },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
  explanation: { type: String },
  tags: [{ type: String }]
}, { timestamps: true });

export const Question = mongoose.model('Question', questionSchema);
