# Smart Admission Management System

## Overview
The Smart Admission Management System is a full-stack web application designed to streamline the student admission process. It allows students to register online, submit their applications, and upload necessary documents. Administrators can review applications, generate merit lists, and analyze data through an analytics dashboard.

## Features
- **Student Registration Form**: A comprehensive form for students to submit their personal, contact, and academic information.
- **Document Upload**: Students can upload required documents such as photos, signatures, and academic certificates.
- **Admin Dashboard**: An analytics dashboard that provides insights into application trends, branch preferences, and category-wise distributions.
- **API Endpoints**: RESTful API for handling application submissions, document uploads, and analytics data retrieval.

## Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **File Handling**: Multer for document uploads
- **Data Visualization**: Chart.js for analytics

## Project Structure
```
smart-admission-system
├── public
│   ├── index.html
│   ├── css
│   │   └── style.css
│   └── js
│       ├── script.js
│       └── charts.js
├── server.js
├── package.json
├── db.sql
├── .env.example
├── .gitignore
├── uploads
├── controllers
│   ├── applicationsController.js
│   ├── uploadController.js
│   └── analyticsController.js
├── routes
│   ├── applications.js
│   ├── upload.js
│   └── analytics.js
├── models
│   ├── db.js
│   ├── studentsModel.js
│   ├── applicationsModel.js
│   ├── documentsModel.js
│   └── streamsModel.js
├── middlewares
│   ├── multerConfig.js
│   ├── validation.js
│   └── errorHandler.js
├── config
│   └── index.js
├── utils
│   ├── logger.js
│   └── helpers.js
├── db
│   ├── migrations
│   │   └── 001_init_schema.sql
│   └── seeders
│       └── seed_streams.sql
└── README.md
```

## Setup Instructions
1. **Clone the Repository**: 
   ```bash
   git clone <repository-url>
   cd smart-admission-system
   ```

2. **Install Dependencies**: 
   ```bash
   npm install
   ```

3. **Configure Environment Variables**: 
   - Copy `.env.example` to `.env` and fill in the required database connection details.

4. **Initialize the Database**: 
   - Run the SQL commands in `db.sql` to create the necessary tables.

5. **Start the Server**: 
   ```bash
   node server.js
   ```

6. **Access the Application**: 
   - Open your browser and navigate to `http://localhost:3000`.

## Usage
- Students can fill out the registration form and submit their applications.
- Admins can log in to review applications and access the analytics dashboard.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.