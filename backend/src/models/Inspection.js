const mongoose = require('mongoose');

const inspectionSchema = new mongoose.Schema({
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Institution', required: true },
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  score: { type: Number, required: true },
  status: { type: String, enum: ['Compliant', 'Non-Compliant', 'Pending'], default: 'Pending' },
  remarks: { type: String },
  location: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

const Inspection = mongoose.model('Inspection', inspectionSchema);
module.exports = Inspection;
