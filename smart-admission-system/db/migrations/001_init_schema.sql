CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    category ENUM('General', 'OBC', 'SC', 'ST') NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL UNIQUE,
    nationality VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    mobile_number VARCHAR(15) NOT NULL,
    complete_address TEXT NOT NULL,
    parent_name VARCHAR(255) NOT NULL,
    parent_occupation VARCHAR(255) NOT NULL,
    parent_contact VARCHAR(15) NOT NULL
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
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    photo_path VARCHAR(255) NOT NULL,
    signature_path VARCHAR(255) NOT NULL,
    tenth_marksheet_path VARCHAR(255) NOT NULL,
    twelfth_marksheet_path VARCHAR(255) NOT NULL,
    entrance_certificate_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

CREATE TABLE streams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name ENUM('Computer Science', 'Information Technology', 'Mechanical', 'Civil', 'Electrical', 'Electronics') NOT NULL
);