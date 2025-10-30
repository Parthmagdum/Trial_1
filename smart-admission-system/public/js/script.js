// Frontend form + Supabase integration
// This script validates the registration form, uploads files to Supabase Storage,
// and inserts data into Supabase tables: students, applications, documents.

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // === Supabase init ===
    // NOTE: the project URL and anon key are required for the client to talk to Supabase.
    // You provided a Supabase project URL and anon key; they are used below.
    const SUPABASE_URL = 'https://fdadlxbeavjjkqnaqtdr.supabase.co';
    const SUPABASE_KEY = 'REPLACE_WITH_ANON_KEY';
    // The key above will be replaced by the deployment; avoid exposing service_role keys.

    // Create the client from the UMD build included in index.html
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        clearMessages();
        if (!validateForm()) return;

        try {
            loadingIndicator.style.display = 'block';

            // 1) Insert student
            const studentPayload = getStudentPayload(form);
            const { data: studentData, error: studentError } = await supabase
                .from('students')
                .insert([studentPayload])
                .select('id')
                .single();
            if (studentError) throw studentError;
            const studentId = studentData.id;

            // 2) Insert application
            const applicationPayload = getApplicationPayload(form, studentId);
            const { data: applicationData, error: appError } = await supabase
                .from('applications')
                .insert([applicationPayload])
                .select('id')
                .single();
            if (appError) throw appError;
            const applicationId = applicationData.id;

            // 3) Upload files to Supabase Storage (bucket: uploads) and insert documents metadata
            const files = collectFiles(form);
            const uploadedPaths = {};
            for (const key of Object.keys(files)) {
                const file = files[key];
                if (!file) continue;
                const filename = `${Date.now()}_${sanitizeFilename(file.name)}`;
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('uploads')
                    .upload(filename, file, { cacheControl: '3600', upsert: false });
                if (uploadError) throw uploadError;
                // Construct public URL (requires the bucket to be public or use signed URLs)
                const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/uploads/${encodeURIComponent(filename)}`;
                uploadedPaths[key] = publicUrl;
            }

            // 4) Insert documents record
            const documentsPayload = {
                application_id: applicationId,
                photo_path: uploadedPaths.photo || null,
                signature_path: uploadedPaths.signature || null,
                tenth_marksheet_path: uploadedPaths.tenthMarksheet || null,
                twelfth_marksheet_path: uploadedPaths.twelfthMarksheet || null,
                entrance_certificate_path: uploadedPaths.entranceCertificate || null
            };
            const { error: docError } = await supabase.from('documents').insert([documentsPayload]);
            if (docError) throw docError;

            loadingIndicator.style.display = 'none';
            successMessage.textContent = 'Application submitted successfully!';
            successMessage.style.display = 'block';
            form.reset();
        } catch (err) {
            console.error(err);
            loadingIndicator.style.display = 'none';
            errorMessage.textContent = 'Submission failed: ' + (err.message || JSON.stringify(err));
            errorMessage.style.display = 'block';
        }
    });

    // --- helpers ---
    function clearMessages() {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
    }

    function getStudentPayload(form) {
        return {
            full_name: form.fullName.value,
            date_of_birth: form.dob.value,
            gender: form.gender.value,
            category: form.category.value,
            aadhaar_number: form.aadhaar.value,
            nationality: form.nationality.value,
            email: form.email.value,
            mobile_number: form.mobile.value,
            complete_address: form.address.value,
            parent_name: form.guardianName.value,
            parent_occupation: form.guardianOccupation.value,
            parent_contact: form.guardianContact.value
        };
    }

    function getApplicationPayload(form, studentId) {
        return {
            student_id: studentId,
            tenth_marks: form.tenthMarks.value,
            tenth_board: form.tenthBoard.value,
            tenth_year: form.tenthYear.value,
            twelfth_marks: form.twelfthMarks.value,
            twelfth_board: form.twelfthBoard.value,
            twelfth_year: form.twelfthYear.value,
            entrance_exam_name: form.entranceExam.value,
            entrance_rank: form.rank.value,
            primary_choice: form.primaryChoice.value,
            secondary_choice: form.secondaryChoice.value
        };
    }

    function collectFiles(form) {
        return {
            photo: form.photo.files[0],
            signature: form.signature.files[0],
            tenthMarksheet: form.tenthMarksheet.files[0],
            twelfthMarksheet: form.twelfthMarksheet.files[0],
            entranceCertificate: form.entranceCertificate.files[0]
        };
    }

    function sanitizeFilename(name) {
        return name.replace(/[^a-z0-9_.-]/gi, '_');
    }

    function validateForm() {
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
        // ensure required files are present
        const files = collectFiles(form);
        if (!files.photo || !files.signature || !files.tenthMarksheet || !files.twelfthMarksheet || !files.entranceCertificate) {
            showError('Please upload all required documents.');
            return false;
        }
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
});