const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'smart_admission_system',
    },
    uploadsPath: process.env.UPLOADS_PATH || 'uploads/',
};

module.exports = config;