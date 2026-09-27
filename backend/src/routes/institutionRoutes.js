const express = require('express');
const router = express.Router();
const { getInstitutions, getInstitutionById } = require('../controllers/institutionController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getInstitutions);
router.route('/:id').get(protect, getInstitutionById);

module.exports = router;
