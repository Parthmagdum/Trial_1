const fs = require('fs');
const path = require('path');

// Create a log directory if it doesn't exist
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

// Log levels
const levels = {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
};

// Function to log messages
function logMessage(level, message) {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} [${level}]: ${message}\n`;
    
    // Write log to a file
    fs.appendFile(path.join(logDirectory, 'app.log'), logEntry, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });
}

// Export logging functions
module.exports = {
    info: (message) => logMessage(levels.INFO, message),
    warn: (message) => logMessage(levels.WARN, message),
    error: (message) => logMessage(levels.ERROR, message),
};