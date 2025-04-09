document.addEventListener("DOMContentLoaded", function () {

    // Redirect Login Button to Home Page
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission
            window.location.href = "home.html"; // Redirect to Home page
        });
    }

    // Redirect Sign-Up Button to Home Page
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            window.location.href = "home.html"; // Redirect to Home page
        });
    }

    // OTP Feature
    const sendOTPButton = document.getElementById("sendOTP");
    const otpInput = document.getElementById("otp");

    if (sendOTPButton) {
        sendOTPButton.addEventListener("click", function () {
            const email = document.getElementById("email").value;
            if (email.trim() === "") {
                alert("Please enter an email to receive OTP.");
                return;
            }

            // Simulate OTP Sending (In real projects, integrate with an email API)
            const generatedOTP = Math.floor(100000 + Math.random() * 900000); // Random 6-digit OTP
            alert(`Your OTP is: ${generatedOTP}`);

            otpInput.disabled = false; // Enable OTP input field
        });
    }

    // Redirect Sign Out to Login Page
    const signoutBtn = document.getElementById("signout");
    if (signoutBtn) {
        signoutBtn.addEventListener("click", function (event) {
            event.preventDefault();
            window.location.href = "index.html"; // Redirect to Login page
        });
    }

    // Toggle Dashboard Menu
    const dashboardBtn = document.getElementById("dashboardBtn");
    const dashboardMenu = document.getElementById("dashboardMenu");
    if (dashboardBtn && dashboardMenu) {
        dashboardBtn.addEventListener("click", function () {
            dashboardMenu.classList.toggle("show");
        });
    }

    // Toggle Profile Menu
    const profileBtn = document.getElementById("profileBtn");
    const profileMenu = document.getElementById("profileMenu");

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", function () {
            profileMenu.classList.toggle("show");
        });

        // Hide Profile Menu When Clicking Outside
        document.addEventListener("click", function (event) {
            if (!event.target.closest(".profile")) {
                profileMenu.classList.remove("show");
            }
        });
    }

});


document.addEventListener("DOMContentLoaded", function () {
    // Handling Save/Edit functionality on write.html
    const textArea = document.getElementById("textArea");
    const saveBtn = document.getElementById("saveBtn");
    const editBtn = document.getElementById("editBtn");

    if (textArea && saveBtn && editBtn) {
        // Save Button Click
        saveBtn.addEventListener("click", function () {
            textArea.setAttribute("readonly", "true"); // Disable editing
            saveBtn.disabled = true; // Disable Save button
            editBtn.disabled = false; // Enable Edit button
        });

        // Edit Button Click
        editBtn.addEventListener("click", function () {
            textArea.removeAttribute("readonly"); // Enable editing
            saveBtn.disabled = false; // Enable Save button again
            editBtn.disabled = true; // Disable Edit button until saved again
        });
    }
});


// upload pdf

// document.addEventListener("DOMContentLoaded", function () {
//     // Redirect to Upload PDF Page
//     const pdfUploadBtn = document.getElementById("pdfUploadBtn");
//     if (pdfUploadBtn) {
//         pdfUploadBtn.addEventListener("click", function () {
//             window.location.href = "upload.html"; // Ensure upload.html exists
//         });
//     }

//     // File Upload Name Display & Draft Handling
//     const pdfUpload = document.getElementById("pdfUpload");
//     const fileNameDisplay = document.getElementById("fileName");
//     const draftBtn = document.getElementById("draftBtn");
//     const deleteBtn = document.getElementById("deleteBtn");
//     const submitBtn = document.getElementById("submitBtn");

//     // Load draft file if exists
//     if (localStorage.getItem("draftPDF")) {
//         fileNameDisplay.textContent = localStorage.getItem("draftPDF");
//     }

//     if (pdfUpload && fileNameDisplay) {
//         pdfUpload.addEventListener("change", function () {
//             if (pdfUpload.files.length > 0) {
//                 const fileName = pdfUpload.files[0].name;
//                 fileNameDisplay.textContent = fileName; // Show selected file name
//             } else {
//                 fileNameDisplay.textContent = "No file chosen"; // Reset if no file is selected
//             }
//         });
//     }

//     // Save as Draft
//     if (draftBtn) {
//         draftBtn.addEventListener("click", function () {
//             if (pdfUpload.files.length > 0) {
//                 localStorage.setItem("draftPDF", pdfUpload.files[0].name);
//                 alert("Draft saved successfully!");
//             } else {
//                 alert("Please select a file before saving as draft.");
//             }
//         });
//     }

//     // Delete Draft
//     if (deleteBtn) {
//         deleteBtn.addEventListener("click", function () {
//             localStorage.removeItem("draftPDF");
//             fileNameDisplay.textContent = "No file chosen";
//             pdfUpload.value = ""; // Clear file input
//             alert("Draft deleted successfully!");
//         });
//     }

//     // Submit File (For Future Backend Integration)
//     if (submitBtn) {
//         submitBtn.addEventListener("click", function () {
//             if (pdfUpload.files.length > 0) {
//                 alert("File submitted successfully!"); // This should send data to backend later
//                 localStorage.removeItem("draftPDF"); // Clear draft after submission
//             } else {
//                 alert("Please select a file before submitting.");
//             }
//         });
//     }
// });

document.addEventListener("DOMContentLoaded", function () { 
    const imageUpload = document.getElementById("imageUpload");
    const fileNameDisplay = document.getElementById("fileName");
    const previewContainer = document.getElementById("previewContainer"); // Image preview area
    const previewImage = document.getElementById("previewImage"); // Image tag to show preview
    const uploadText = document.querySelector(".upload-area p"); // Target the text

    if (imageUpload && fileNameDisplay) {
        imageUpload.addEventListener("change", function () {
            if (imageUpload.files.length > 0) {
                const file = imageUpload.files[0];
                const validTypes = ["image/jpeg", "image/png"];

                if (validTypes.includes(file.type)) {
                    fileNameDisplay.textContent = file.name;
                    fileNameDisplay.style.display = "inline";

                    // Display the selected image in the upload area
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewImage.src = e.target.result;
                        previewContainer.style.display = "block"; // Show preview
                        uploadText.style.display = "none"; // Hide the text
                    };
                    reader.readAsDataURL(file);
                } else {
                    alert("Only JPEG and PNG files are allowed.");
                    imageUpload.value = ""; // Reset file input
                    fileNameDisplay.textContent = "No file chosen";
                    previewContainer.style.display = "none"; // Hide preview
                    uploadText.style.display = "block"; // Show text again if invalid file
                }
            } else {
                fileNameDisplay.textContent = "No file chosen";
                previewContainer.style.display = "none"; // Hide preview
                uploadText.style.display = "block"; // Show text if no file is chosen
            }
        });
    }
});
