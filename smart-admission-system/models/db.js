/**
 * Robust DB module
 * - Uses mysql2/promise pool for stable connections
 * - Falls back to a safe stub if DB is unavailable so the server can start
 * - Exports `query(sql, params)` which returns a Promise
 *
 * Notes:
 * - Environment variables are read from process.env (use .env in development)
 * - For production use a managed MySQL (or update credentials in environment)
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    timezone: 'Z'
};

let pool = null;

async function createPool() {
    try {
        pool = mysql.createPool(config);
        // test a connection
        const conn = await pool.getConnection();
        await conn.ping();
        conn.release();
        console.log('Connected to MySQL database.');
    } catch (err) {
        console.error('Database connection failed:', err && err.message ? err.message : err);
        // keep pool as null - exports a stub
        pool = null;
    }
}

// Immediately try to create pool but don't throw if it fails
createPool();

// Unified query function
async function query(sql, params) {
    if (!pool) {
        // Fail gracefully — return empty results for SELECT, or throw for others
        const sqlTrim = (sql || '').trim().toLowerCase();
        if (sqlTrim.startsWith('select')) {
            return [];
        }
        // For inserts/updates/deletes we throw so controllers can handle properly
        throw new Error('Database unavailable');
    }
    const [rows] = await pool.query(sql, params);
    return rows;
}

module.exports = {
    query,
    // expose pool for advanced usages if available
    getPool: () => pool
};