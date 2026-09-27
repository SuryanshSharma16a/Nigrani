const mongoose = require('mongoose');

const institutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schemeId: { type: String, required: true },
  schemeCode: { type: String },
  district: { type: String, required: true },
  state: { type: String, required: true },
  status: { type: String, enum: ['compliant', 'flagged', 'escalated'], default: 'compliant' },
  complianceScore: { type: Number, default: 0 },
  lastInspected: { type: String },
  capacity: { type: Number },
  currentInmates: { type: Number },
  grantAmount: { type: String },
  address: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  }
}, { timestamps: true });

const Institution = mongoose.model('Institution', institutionSchema);
module.exports = Institution;
