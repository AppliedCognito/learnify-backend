import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',  // linked to Subject model
    required: true,
  },
});

export const Module = mongoose.model('Module', moduleSchema);
