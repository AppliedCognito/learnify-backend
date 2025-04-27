import mongoose from 'mongoose';

const subModuleSchema = new mongoose.Schema({
  module_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
  name: { type: String, required: true }
}, { timestamps: true });

export const SubModule = mongoose.model('SubModule', subModuleSchema);
