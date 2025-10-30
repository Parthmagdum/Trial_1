const db = require('../models/db');
const applicationsModel = require('../models/applicationsModel');

// Compose multiple analytics values into a single payload
exports.getAnalyticsData = async (req, res) => {
    try {
        const totalApplicants = await applicationsModel.getAllApplications();
        const branchDistribution = await getBranchPreferenceInternal();
        const categoryDistribution = await getCategoryWiseCountInternal();
        const meritScoreDistribution = await getMeritScoreDistributionInternal();

        res.json({
            totalApplicants: Array.isArray(totalApplicants) ? totalApplicants.length : 0,
            branchDistribution,
            categoryDistribution,
            meritScoreDistribution
        });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Internal helper: get branch preference counts
const getBranchPreferenceInternal = async () => {
    const query = `
        SELECT JSON_EXTRACT(course_preferences, '$.primary') AS primary_choice, COUNT(*) AS count
        FROM applications
        GROUP BY primary_choice
    `;

    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (err) {
        console.error('Error getting branch preference:', err);
        return [];
    }
};

// Internal helper: application trends over time (count per month)
const getApplicationTrendsInternal = async () => {
    const query = `
        SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) AS count
        FROM applications
        GROUP BY month
        ORDER BY month ASC
    `;
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (err) {
        console.error('Error getting application trends:', err);
        return [];
    }
};

// Internal helper: category-wise counts
const getCategoryWiseCountInternal = async () => {
    const query = `
        SELECT students.category, COUNT(*) AS count
        FROM applications
        JOIN students ON applications.student_id = students.id
        GROUP BY students.category
    `;
    try {
        const [rows] = await db.execute(query);
        return rows;
    } catch (err) {
        console.error('Error getting category-wise counts:', err);
        return [];
    }
};

// Internal helper: merit score distribution
const getMeritScoreDistributionInternal = async () => {
    const query = `
        SELECT (students.twelfth_marks * 0.6 + IFNULL(applications.entrance_score, 0) * 0.4) AS merit_score
        FROM applications
        JOIN students ON applications.student_id = students.id
    `;
    try {
        const [rows] = await db.execute(query);
        return rows.map(r => r.merit_score);
    } catch (err) {
        console.error('Error getting merit score distribution:', err);
        return [];
    }
};

// Export additional route handlers expected by routes/analytics.js
exports.getBranchPreference = async (req, res) => {
    const data = await getBranchPreferenceInternal();
    res.json(data);
};

exports.getApplicationTrends = async (req, res) => {
    const data = await getApplicationTrendsInternal();
    res.json(data);
};

exports.getCategoryWiseCount = async (req, res) => {
    const data = await getCategoryWiseCountInternal();
    res.json(data);
};

exports.getMeritScoreDistribution = async (req, res) => {
    const data = await getMeritScoreDistributionInternal();
    res.json(data);
};