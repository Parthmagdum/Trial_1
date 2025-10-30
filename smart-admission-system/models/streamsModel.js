const db = require('./db');

// Function to get all streams
const getAllStreams = async () => {
    const query = 'SELECT * FROM streams';
    const [rows] = await db.execute(query);
    return rows;
};

// Function to get a stream by ID
const getStreamById = async (id) => {
    const query = 'SELECT * FROM streams WHERE id = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
};

// Function to add a new stream
const addStream = async (streamData) => {
    const query = 'INSERT INTO streams (name) VALUES (?)';
    const [result] = await db.execute(query, [streamData.name]);
    return result.insertId;
};

// Function to update a stream
const updateStream = async (id, streamData) => {
    const query = 'UPDATE streams SET name = ? WHERE id = ?';
    await db.execute(query, [streamData.name, id]);
};

// Function to delete a stream
const deleteStream = async (id) => {
    const query = 'DELETE FROM streams WHERE id = ?';
    await db.execute(query, [id]);
};

module.exports = {
    getAllStreams,
    getStreamById,
    addStream,
    updateStream,
    deleteStream,
};