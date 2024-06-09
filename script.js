document.getElementById('mergeButton').addEventListener('click', mergeMedia);

async function mergeMedia() {
    const videoInput = document.getElementById('videoInput').files[0];
    const audioInput = document.getElementById('audioInput').files[0];

    if (!videoInput || !audioInput) {
        alert('Please select both a video and an audio file.');
        return;
    }

    const videoData = await videoInput.arrayBuffer();
    const audioData = await audioInput.arrayBuffer();

    const videoBlob = new Blob([videoData], { type: videoInput.type });
    const audioBlob = new Blob([audioData], { type: audioInput.type });

    const ffmpeg = require('@ffmpeg/ffmpeg');
    const { createFFmpeg, fetchFile } = ffmpeg;
    const ffmpegInstance = createFFmpeg({ log: true });

    await ffmpegInstance.load();

    ffmpegInstance.FS('writeFile', 'video.mp4', await fetchFile(videoBlob));
    ffmpegInstance.FS('writeFile', 'audio.mp3', await fetchFile(audioBlob));

    await ffmpegInstance.run('-i', 'video.mp4', '-i', 'audio.mp3', '-c', 'copy', 'output.mp4');

    const data = ffmpegInstance.FS('readFile', 'output.mp4');
    const outputVideo = document.getElementById('outputVideo');
    const outputBlob = new Blob([data.buffer], { type: 'video/mp4' });

    outputVideo.src = URL.createObjectURL(outputBlob);
}