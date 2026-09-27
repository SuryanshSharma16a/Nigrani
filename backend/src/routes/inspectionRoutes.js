const express = require('express');
const router = express.Router();
const { getInspections, createInspection } = require('../controllers/inspectionController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getInspections).post(protect, createInspection);

module.exports = router;
