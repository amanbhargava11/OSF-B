import mongoose from 'mongoose';

const AuditRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'contacted', 'completed'], default: 'pending' },
}, { timestamps: true });

const AuditRequestModel = mongoose.models.AuditRequest || mongoose.model('AuditRequest', AuditRequestSchema);
export default AuditRequestModel as any;
