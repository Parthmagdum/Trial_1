// This file contains client-side JavaScript for form validation, handling user interactions, and managing loading states.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        // Implement validation logic for each field
        const email = form.email.value;
        const mobile = form.mobile.value;
        const aadhaar = form.aadhaar.value;

        if (!validateEmail(email)) {
            showError('Invalid email format.');
            return false;
        }
        if (!validatePhone(mobile)) {
            showError('Invalid mobile number.');
            return false;
        }
        if (!validateAadhaar(aadhaar)) {
            showError('Invalid Aadhaar number.');
            return false;
        }
        // Additional validations for other fields can be added here

        return true;
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^[0-9]{10}$/;
        return regex.test(phone);
    }

    function validateAadhaar(aadhaar) {
        const regex = /^[0-9]{12}$/;
        return regex.test(aadhaar);
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }

    function submitForm() {
        loadingIndicator.style.display = 'block';
        const formData = new FormData(form);

        fetch('/api/applications', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            loadingIndicator.style.display = 'none';
            if (response.ok) {
                successMessage.textContent = 'Application submitted successfully!';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                form.reset();
            } else {
                showError('Failed to submit application. Please try again.');
            }
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            showError('An error occurred: ' + error.message);
        });
    }
});