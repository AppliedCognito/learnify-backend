import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    // Reference fields
    subject_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true,
    },
    module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
    },
    sub_module_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubModule',
    },

    // Question references
    question_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true,
      }
    ],

    totalQuestions: {
      type: Number,
      default: 0,
    },

    timeLimit: {
      type: Number, // in minutes
      default: 0,   // 0 = no time limit
    },
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
