const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

// Route to get analytics data
router.get('/data', analyticsController.getAnalyticsData);

// Route to get branch preference distribution
router.get('/branch-preference', analyticsController.getBranchPreference);

// Route to get application trends over time
router.get('/application-trends', analyticsController.getApplicationTrends);

// Route to get category-wise applicant count
router.get('/category-wise', analyticsController.getCategoryWiseCount);

// Route to get merit score distribution
router.get('/merit-score', analyticsController.getMeritScoreDistribution);

module.exports = router;