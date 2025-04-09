document.addEventListener("DOMContentLoaded", function () {
    const pdfUpload = document.getElementById("pdfUpload");
    const fileNameDisplay = document.getElementById("fileName");
    const previewContainer = document.getElementById("previewContainer");
    const draftBtn = document.getElementById("draftBtn");
    const submitBtn = document.getElementById("submitBtn");
    const deleteBtn = document.getElementById("deleteBtn");

    pdfUpload.addEventListener("change", function () {
        if (pdfUpload.files.length > 0) {
            const file = pdfUpload.files[0];

            // Ensure only PDF files are uploaded
            if (file.type !== "application/pdf") {
                alert("Please upload a valid PDF file.");
                pdfUpload.value = ""; // Reset input
                fileNameDisplay.textContent = "No file chosen";
                previewContainer.innerHTML = "<p>No file selected</p>"; // Reset preview
                return;
            }

            fileNameDisplay.textContent = file.name; // Show selected file name
            previewContainer.style.display = "block"; // Show preview section

            // Create PDF preview using an object URL
            const objectURL = URL.createObjectURL(file);
            previewContainer.innerHTML = `
                <p><strong>Preview:</strong> ${file.name}</p>
                <iframe src="${objectURL}" width="100%" height="400px"></iframe>
            `;
        } else {
            fileNameDisplay.textContent = "No file chosen";
            previewContainer.innerHTML = "<p>No file selected</p>";
        }
    });

    // Draft Button Functionality
    draftBtn.addEventListener("click", function () {
        if (pdfUpload.files.length > 0) {
            alert("Draft saved!");
        } else {
            alert("Please upload a file first.");
        }
    });

    // Submit Button Functionality
    submitBtn.addEventListener("click", function () {
        if (pdfUpload.files.length > 0) {
            alert("File submitted!");
            // Add actual upload logic (e.g., sending file to the server)
        } else {
            alert("Please upload a file first.");
        }
    });

    // Delete Button Functionality
    deleteBtn.addEventListener("click", function () {
        pdfUpload.value = ""; // Clear file input
        fileNameDisplay.textContent = "No file chosen"; // Reset text
        previewContainer.innerHTML = "<p>No file selected</p>"; // Reset preview
        previewContainer.style.display = "none"; // Hide preview
        alert("File deleted!");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const draftBtn = document.getElementById("draftBtn");
    const submitBtn = document.getElementById("submitBtn");
    const deleteBtn = document.getElementById("deleteBtn");
    const pdfUpload = document.getElementById("pdfUpload");
    const fileNameDisplay = document.getElementById("fileName");
    const previewContainer = document.getElementById("previewContainer");

    if (draftBtn) {
        draftBtn.addEventListener("click", function () {
            if (pdfUpload.files.length > 0) {
                alert("Draft saved!");
                // Here, you can implement actual draft-saving logic (e.g., saving file data to local storage)
            } else {
                alert("Please upload a file first.");
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener("click", function () {
            if (pdfUpload.files.length > 0) {
                alert("File submitted!");
                // Here, you can send the file to the server via an API
            } else {
                alert("Please upload a file first.");
            }
        });
    }

    if (deleteBtn) {
        deleteBtn.addEventListener("click", function () {
            pdfUpload.value = "";
            fileNameDisplay.textContent = "No file chosen";
            previewContainer.style.display = "none";
            alert("File deleted!");
        });
    }
});
