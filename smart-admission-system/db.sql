CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    category ENUM('General', 'OBC', 'SC', 'ST') NOT NULL,
    aadhaar_number VARCHAR(12) UNIQUE NOT NULL,
    nationality VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile_number VARCHAR(15) NOT NULL,
    complete_address TEXT NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_occupation VARCHAR(255) NOT NULL,
    parent_contact VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    tenth_marks DECIMAL(5,2) NOT NULL,
    tenth_board VARCHAR(100) NOT NULL,
    tenth_year INT NOT NULL,
    twelfth_marks DECIMAL(5,2) NOT NULL,
    twelfth_board VARCHAR(100) NOT NULL,
    twelfth_year INT NOT NULL,
    entrance_exam_name VARCHAR(100) NOT NULL,
    entrance_rank DECIMAL(5,2) NOT NULL,
    primary_choice ENUM('Computer Science', 'Information Technology', 'Mechanical', 'Civil', 'Electrical', 'Electronics') NOT NULL,
    secondary_choice ENUM('Computer Science', 'Information Technology', 'Mechanical', 'Civil', 'Electrical', 'Electronics') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    signature VARCHAR(255) NOT NULL,
    tenth_marksheet VARCHAR(255) NOT NULL,
    twelfth_marksheet VARCHAR(255) NOT NULL,
    entrance_certificate VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

CREATE TABLE streams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Computer Science', 'Information Technology', 'Mechanical', 'Civil', 'Electrical', 'Electronics') UNIQUE NOT NULL
);