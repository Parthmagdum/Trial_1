/*
  TypeScript server entrypoint.

  Purpose:
  - Replace the existing `server.js` with a TypeScript-compatible entrypoint.
  - Uses existing route files in the project (commonJS modules under `routes/`).

  Notes / Setup:
  - Environment variables are loaded from a `.env` file using `dotenv`.
  - To run in development: `npm run dev` (uses ts-node-dev, no build required).
  - To build for production: `npm run build` then `npm start` (will run `dist/server.js`).
  - Ensure `uploads/` and `public/` directories exist and are writable by the server user.
  - Database connection code remains in model files; ensure `.env` contains DB credentials.

  Required environment variables (example in `.env.example`):
    PORT=3000
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=admissions_user
    DB_PASSWORD=your_db_password
    DB_NAME=smart_admissions
    UPLOAD_DIR=./uploads

*/

import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend and uploads
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

/*
  The existing project uses CommonJS modules for routes (module.exports).
  We require them here so we don't need to convert every route/controller to TS immediately.
*/
const applicationsRoutes = require('../routes/applications');
const uploadRoutes = require('../routes/upload');
const analyticsRoutes = require('../routes/analytics');

// Mount API routes
app.use('/api/applications', applicationsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);

// Basic health route
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Simple error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
