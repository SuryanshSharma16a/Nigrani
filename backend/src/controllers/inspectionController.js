const Inspection = require('../models/Inspection');

const getInspections = async (req, res) => {
  try {
    const inspections = await Inspection.find({}).populate('institutionId', 'name district state').populate('inspectorId', 'name email');
    res.json(inspections);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createInspection = async (req, res) => {
  try {
    const { institutionId, date, score, status, remarks, location } = req.body;
    
    const inspection = new Inspection({
      institutionId,
      inspectorId: req.user.id,
      date,
      score,
      status,
      remarks,
      location
    });

    const createdInspection = await inspection.save();
    res.status(201).json(createdInspection);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getInspections, createInspection };
