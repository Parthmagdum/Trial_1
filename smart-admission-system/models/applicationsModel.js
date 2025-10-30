const db = require('./db');

// Function to create a new application
const createApplication = async (applicationData) => {
    const { studentId, academicRecords, coursePreferences } = applicationData;
    const query = `INSERT INTO applications (student_id, academic_records, course_preferences) VALUES (?, ?, ?)`;
    const values = [studentId, JSON.stringify(academicRecords), JSON.stringify(coursePreferences)];
    
    try {
        const [result] = await db.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw new Error('Error creating application: ' + error.message);
    }
};

// Function to fetch all applications
const getAllApplications = async () => {
    const query = `SELECT * FROM applications`;
    
    try {
        const [applications] = await db.execute(query);
        return applications;
    } catch (error) {
        throw new Error('Error fetching applications: ' + error.message);
    }
};

// Function to generate merit list
const generateMeritList = async () => {
    const query = `
        SELECT student_id, (12th_marks * 0.6 + entrance_score * 0.4) AS merit_score
        FROM applications
        JOIN students ON applications.student_id = students.id
        ORDER BY merit_score DESC
    `;
    
    try {
        const [meritList] = await db.execute(query);
        return meritList;
    } catch (error) {
        throw new Error('Error generating merit list: ' + error.message);
    }
};

// Exporting the functions
module.exports = {
    createApplication,
    getAllApplications,
    generateMeritList
};