const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('File type not allowed'), false);
};

// Initialize multer with storage and file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: fileFilter
});

// Controller to handle uploaded file metadata and respond to client
const uploadDocument = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Respond with file metadata
        const fileInfo = {
            originalName: req.file.originalname,
            storedName: req.file.filename,
            path: req.file.path,
            size: req.file.size,
            mimeType: req.file.mimetype
        };

        return res.json({ success: true, file: fileInfo });
    } catch (err) {
        console.error('Upload error:', err);
        return res.status(500).json({ success: false, message: 'Upload failed' });
    }
};

// Export both the multer middleware (for routes that need it) and the controller
module.exports = {
    uploadMiddleware: upload,
    uploadDocument
};