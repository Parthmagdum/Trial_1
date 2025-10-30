const db = require('./db');

// Function to create a new student record
const createStudent = async (studentData) => {
    const query = `INSERT INTO students (full_name, date_of_birth, gender, category, aadhaar_number, nationality, email, mobile_number, address, parent_name, parent_occupation, parent_contact) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        studentData.fullName,
        studentData.dateOfBirth,
        studentData.gender,
        studentData.category,
        studentData.aadhaarNumber,
        studentData.nationality,
        studentData.email,
        studentData.mobileNumber,
        studentData.address,
        studentData.parentName,
        studentData.parentOccupation,
        studentData.parentContact
    ];
    return db.query(query, values);
};

// Function to get all students
const getAllStudents = async () => {
    const query = `SELECT * FROM students`;
    return db.query(query);
};

// Function to get a student by ID
const getStudentById = async (studentId) => {
    const query = `SELECT * FROM students WHERE id = ?`;
    return db.query(query, [studentId]);
};

// Function to update a student record
const updateStudent = async (studentId, studentData) => {
    const query = `UPDATE students SET full_name = ?, date_of_birth = ?, gender = ?, category = ?, aadhaar_number = ?, nationality = ?, email = ?, mobile_number = ?, address = ?, parent_name = ?, parent_occupation = ?, parent_contact = ? WHERE id = ?`;
    const values = [
        studentData.fullName,
        studentData.dateOfBirth,
        studentData.gender,
        studentData.category,
        studentData.aadhaarNumber,
        studentData.nationality,
        studentData.email,
        studentData.mobileNumber,
        studentData.address,
        studentData.parentName,
        studentData.parentOccupation,
        studentData.parentContact,
        studentId
    ];
    return db.query(query, values);
};

// Function to delete a student record
const deleteStudent = async (studentId) => {
    const query = `DELETE FROM students WHERE id = ?`;
    return db.query(query, [studentId]);
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};