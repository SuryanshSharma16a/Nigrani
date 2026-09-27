const Institution = require('../models/Institution');

const getInstitutions = async (req, res) => {
  try {
    const institutions = await Institution.find({});
    res.json(institutions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getInstitutionById = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    if (institution) {
      res.json(institution);
    } else {
      res.status(404).json({ message: 'Institution not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getInstitutions, getInstitutionById };
