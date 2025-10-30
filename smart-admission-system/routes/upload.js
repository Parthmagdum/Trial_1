const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const multerConfig = require('../middlewares/multerConfig');

// Route for handling document uploads
router.post('/', multerConfig.single('document'), uploadController.uploadDocument);

module.exports = router;