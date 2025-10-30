const applicationsModel = require('../models/applicationsModel');
const studentsModel = require('../models/studentsModel');

// Function to handle application submission
exports.submitApplication = async (req, res) => {
    try {
        const applicationData = req.body;
        const studentId = await studentsModel.createStudent(applicationData);
        applicationData.studentId = studentId;
        await applicationsModel.createApplication(applicationData);
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit application' });
    }
};

// Function to fetch all applications for admin review
exports.getAllApplications = async (req, res) => {
    try {
        const applications = await applicationsModel.getAllApplications();
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

// Function to generate merit list
exports.generateMeritList = async (req, res) => {
    try {
        const meritList = await applicationsModel.generateMeritList();
        res.status(200).json(meritList);
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate merit list' });
    }
};