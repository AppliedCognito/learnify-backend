import mongoose from 'mongoose';

const subModuleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  module_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,   
  },
});

export const SubModule = mongoose.model('SubModule', subModuleSchema);
