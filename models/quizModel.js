import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, trim: true},
        description: {type: String, trim: true},

        subject_id:       { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
        module_id:        { type: mongoose.Schema.Types.ObjectId, ref: 'Module' },
        sub_module_id:    { type: mongoose.Schema.Types.ObjectId, ref: 'SubModule' },

        question_ids: [
            {type: mongoose.Schema.Types.ObjectId, ref:'Question', required: true}
        ],
        totalQuestions: {type: Number, default: 0},
        timeLimit: Number,

    },
    { timestamps: true}
);