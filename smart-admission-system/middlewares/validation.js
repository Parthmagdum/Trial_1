const { body, validationResult } = require('express-validator');

const validateStudentRegistration = [
    body('fullName').notEmpty().withMessage('Full Name is required.'),
    body('dateOfBirth').isDate().withMessage('Date of Birth must be a valid date.'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other.'),
    body('category').isIn(['General', 'OBC', 'SC', 'ST']).withMessage('Category must be General, OBC, SC, or ST.'),
    body('aadhaarNumber').isLength({ min: 12, max: 12 }).withMessage('Aadhaar Number must be 12 digits.').isNumeric().withMessage('Aadhaar Number must be numeric.'),
    body('nationality').notEmpty().withMessage('Nationality is required.'),
    body('email').isEmail().withMessage('Email must be a valid email address.'),
    body('mobileNumber').isLength({ min: 10, max: 10 }).withMessage('Mobile Number must be 10 digits.').isNumeric().withMessage('Mobile Number must be numeric.'),
    body('address').notEmpty().withMessage('Complete Address is required.'),
    body('parentGuardianName').notEmpty().withMessage('Parent/Guardian Name is required.'),
    body('parentGuardianOccupation').notEmpty().withMessage('Parent/Guardian Occupation is required.'),
    body('parentGuardianContact').isLength({ min: 10, max: 10 }).withMessage('Parent/Guardian Contact must be 10 digits.').isNumeric().withMessage('Parent/Guardian Contact must be numeric.'),
    body('tenthMarks').isFloat({ min: 0, max: 100 }).withMessage('10th Marks must be a percentage between 0 and 100.'),
    body('tenthBoard').notEmpty().withMessage('10th Board is required.'),
    body('tenthYear').isNumeric().withMessage('10th Year must be a valid year.'),
    body('twelfthMarks').isFloat({ min: 0, max: 100 }).withMessage('12th Marks must be a percentage between 0 and 100.'),
    body('twelfthBoard').notEmpty().withMessage('12th Board is required.'),
    body('twelfthYear').isNumeric().withMessage('12th Year must be a valid year.'),
    body('entranceExamName').notEmpty().withMessage('Entrance Exam Name is required.'),
    body('rankPercentile').notEmpty().withMessage('Rank/Percentile is required.'),
    body('primaryChoice').notEmpty().withMessage('Primary Course Choice is required.'),
    body('secondaryChoice').notEmpty().withMessage('Secondary Course Choice is required.'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateStudentRegistration,
    handleValidationErrors,
};