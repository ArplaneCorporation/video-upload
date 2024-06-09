// script.js
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const fileInput = document.getElementById('videoInput');
  const videoContainer = document.getElementById('videoContainer');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.controls = true;
    videoContainer.appendChild(videoElement);
  }
});