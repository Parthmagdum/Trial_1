// This file contains helper functions used throughout the application.

// Function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Function to validate phone number format
function validatePhoneNumber(phone) {
    const re = /^\d{10}$/; // Assuming a 10-digit phone number
    return re.test(String(phone));
}

// Function to check if a value is empty
function isEmpty(value) {
    return !value || value.trim().length === 0;
}

// Function to format date to YYYY-MM-DD
function formatDate(date) {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

// Function to generate a unique ID for documents
function generateUniqueId() {
    return 'doc_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}

// Exporting the helper functions
module.exports = {
    validateEmail,
    validatePhoneNumber,
    isEmpty,
    formatDate,
    generateUniqueId
};