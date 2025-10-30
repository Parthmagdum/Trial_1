// This file contains JavaScript for rendering analytics charts using Chart.js.

document.addEventListener('DOMContentLoaded', function () {
    fetchAnalyticsData();
});

function fetchAnalyticsData() {
    fetch('/api/analytics')
        .then(response => response.json())
        .then(data => {
            renderBranchPreferenceChart(data.branchPreferences);
            renderApplicationTrendsChart(data.applicationTrends);
            renderCategoryWiseCountChart(data.categoryWiseCount);
            renderMeritScoreDistributionChart(data.meritScoreDistribution);
        })
        .catch(error => console.error('Error fetching analytics data:', error));
}

function renderBranchPreferenceChart(branchPreferences) {
    const ctx = document.getElementById('branchPreferenceChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: branchPreferences.labels,
            datasets: [{
                label: 'Branch Preference Distribution',
                data: branchPreferences.data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Branch Preference Distribution'
                }
            }
        }
    });
}

function renderApplicationTrendsChart(applicationTrends) {
    const ctx = document.getElementById('applicationTrendsChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: applicationTrends.labels,
            datasets: [{
                label: 'Applications Over Time',
                data: applicationTrends.data,
                borderColor: '#36A2EB',
                fill: false,
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Application Trends Over Time'
                }
            }
        }
    });
}

function renderCategoryWiseCountChart(categoryWiseCount) {
    const ctx = document.getElementById('categoryWiseCountChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categoryWiseCount.labels,
            datasets: [{
                label: 'Category Wise Applicant Count',
                data: categoryWiseCount.data,
                backgroundColor: '#FFCE56',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Category Wise Applicant Count'
                }
            }
        }
    });
}

function renderMeritScoreDistributionChart(meritScoreDistribution) {
    const ctx = document.getElementById('meritScoreDistributionChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meritScoreDistribution.labels,
            datasets: [{
                label: 'Merit Score Distribution',
                data: meritScoreDistribution.data,
                backgroundColor: '#4BC0C0',
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Merit Score Distribution'
                }
            }
        }
    });
}