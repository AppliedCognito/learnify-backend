import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    text:        { type: String, required: true },
    img_url:     { type: String },
    paper_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'Paper' },
    subject_id:  { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    module_id:   { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
    sub_module_id:{ type: mongoose.Schema.Types.ObjectId, ref: 'SubModule' },
    year:        { type: Number },
    difficulty:  { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    explanation: { type: String },

    // 🎯 Options as fixed A–D
    options: {
      A: { type: String, required: true },
      B: { type: String, required: true },
      C: { type: String, required: true },
      D: { type: String, required: true }
    },

    // 🎯 Store the correct answer as a letter
    correct_option: {
      type: String,
      enum: ['A', 'B', 'C', 'D'],
      required: true
    }
  },
  { timestamps: true }
);

export const Question = mongoose.model('Question', questionSchema);
