const db = require('./db');

// Function to create a new document entry
const createDocument = async (studentId, filePath, fileType) => {
    const query = 'INSERT INTO documents (student_id, file_path, file_type) VALUES (?, ?, ?)';
    const values = [studentId, filePath, fileType];
    try {
        const [result] = await db.execute(query, values);
        return result.insertId;
    } catch (error) {
        throw new Error('Error creating document: ' + error.message);
    }
};

// Function to get documents by student ID
const getDocumentsByStudentId = async (studentId) => {
    const query = 'SELECT * FROM documents WHERE student_id = ?';
    try {
        const [documents] = await db.execute(query, [studentId]);
        return documents;
    } catch (error) {
        throw new Error('Error fetching documents: ' + error.message);
    }
};

// Function to delete a document by ID
const deleteDocumentById = async (documentId) => {
    const query = 'DELETE FROM documents WHERE id = ?';
    try {
        const [result] = await db.execute(query, [documentId]);
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error('Error deleting document: ' + error.message);
    }
};

module.exports = {
    createDocument,
    getDocumentsByStudentId,
    deleteDocumentById,
};