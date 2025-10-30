const express = require('express');
const router = express.Router();
const applicationsController = require('../controllers/applicationsController');

// Route to submit a new application
router.post('/', applicationsController.submitApplication);

// Route to fetch all applications for admin review
router.get('/', applicationsController.getAllApplications);

// Route to generate merit list
router.get('/merit-list', applicationsController.generateMeritList);

module.exports = router;