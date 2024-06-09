const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

document.getElementById('mergeButton').addEventListener('click', async () => {
    const videoInput = document.getElementById('videoInput').files[0];
    const audioInput = document.getElementById('audioInput').files[0];

    if (!videoInput || !audioInput) {
        alert('Please select both a video and an audio file.');
        return;
    }

    // Load ffmpeg.wasm
    await ffmpeg.load();

    // Write the files to the ffmpeg file system
    ffmpeg.FS('writeFile', 'video.mp4', await fetchFile(videoInput));
    ffmpeg.FS('writeFile', 'audio.mp3', await fetchFile(audioInput));

    // Run the ffmpeg command
    await ffmpeg.run('-i', 'video.mp4', '-i', 'audio.mp3', '-c:v', 'copy', '-c:a', 'aac', 'output.mp4');

    // Read the result
    const data = ffmpeg.FS('readFile', 'output.mp4');

    // Create a URL for the output video
    const video = document.getElementById('outputVideo');
    video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    video.load();
    video.play();
});