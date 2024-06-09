// script.js
document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const videoInput = document.getElementById('videoInput');
  const audioInput = document.getElementById('audioInput');
  const videoContainer = document.getElementById('videoContainer');

  if (videoInput.files.length > 0) {
    const file = videoInput.files[0];
    const videoElement = document.createElement('video');
    videoElement.src = URL.createObjectURL(file);
    videoElement.controls = true;
 if (audioInput.files.length > 0) {
    const file = audioInput.files[0];
    const videoElement = document.createElement('audio');
    videoElement.src = URL.createObjectURL(file);
    videoElement.controls = true;
    videoContainer.appendChild(videoElement);
  }
});