document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    
    const chooseFileButton = document.querySelector(".upload-panel button:nth-child(2)");
    const startRecordingButton = document.querySelector(".upload-panel button:nth-child(3)");
    const stopRecordingButton = document.querySelector(".upload-panel button:nth-child(4)");
    const uploadButton = document.querySelector(".upload-panel button:nth-child(5)");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    document.querySelector(".upload-panel").appendChild(deleteButton);
    
    const videoPreview = document.querySelector(".video-preview");
    const leftArrow = document.querySelector(".arrow.left");
    const rightArrow = document.querySelector(".arrow.right");
    
    let mediaRecorder;
    let recordedChunks = [];
    let videoStream;
    let uploadedVideos = [];
    let currentIndex = 0;
    let lastUploadedBlob = null;

    // Open video folder when clicking Choose File
    chooseFileButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            videoPreview.innerHTML = `<video src="${url}" controls width="100%" height="100%" style="object-fit: cover;"></video>`;
            lastUploadedBlob = file;
        }
    });

    // Start recording with camera
    startRecordingButton.addEventListener("click", async () => {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            videoPreview.innerHTML = `<video autoplay width="100%" height="100%" style="object-fit: cover;"></video>`;
            videoPreview.querySelector("video").srcObject = videoStream;

            mediaRecorder = new MediaRecorder(videoStream);
            recordedChunks = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            mediaRecorder.start();
        } catch (error) {
            console.error("Error accessing camera: ", error);
        }
    });

    // Stop recording
    stopRecordingButton.addEventListener("click", () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.onstop = () => {
                videoStream.getTracks().forEach(track => track.stop());
                const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
                const url = URL.createObjectURL(videoBlob);
                videoPreview.innerHTML = `<video src="${url}" controls width="100%" height="100%" style="object-fit: cover;"></video>`;
                lastUploadedBlob = videoBlob;
            };
        }
    });

    // Upload video (simulate storing in database)
    uploadButton.addEventListener("click", () => {
        if (lastUploadedBlob) {
            const url = URL.createObjectURL(lastUploadedBlob);
            uploadedVideos.push(url);
            alert("Video uploaded successfully (stored for later)");
        }
    });

    // Delete the current video
    deleteButton.addEventListener("click", () => {
        if (uploadedVideos.length > 0) {
            uploadedVideos.splice(currentIndex, 1);
            if (uploadedVideos.length > 0) {
                currentIndex = currentIndex % uploadedVideos.length;
                videoPreview.innerHTML = `<video src="${uploadedVideos[currentIndex]}" controls width="100%" height="100%" style="object-fit: cover;"></video>`;
            } else {
                videoPreview.innerHTML = "<p>No videos available</p>";
            }
        }
    });

    // Navigate videos
    leftArrow.addEventListener("click", () => {
        if (uploadedVideos.length > 0) {
            currentIndex = (currentIndex - 1 + uploadedVideos.length) % uploadedVideos.length;
            videoPreview.innerHTML = `<video src="${uploadedVideos[currentIndex]}" controls width="100%" height="100%" style="object-fit: cover;"></video>`;
        }
    });

    rightArrow.addEventListener("click", () => {
        if (uploadedVideos.length > 0) {
            currentIndex = (currentIndex + 1) % uploadedVideos.length;
            videoPreview.innerHTML = `<video src="${uploadedVideos[currentIndex]}" controls width="100%" height="100%" style="object-fit: cover;"></video>`;
        }
    });
});
