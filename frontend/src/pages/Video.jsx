import React, { useState, useRef } from 'react';

const VideoFrameExtractor = () => {
  const [frames, setFrames] = useState([]);  // To store the extracted frames
  const videoRef = useRef(null);             // Reference to the video element
  const canvasRef = useRef(null);            // Reference to the canvas element

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      videoRef.current.src = videoURL;  // Set the video source

      videoRef.current.onloadeddata = () => {
        extractFrames(videoRef.current, canvasRef.current, 1); // Extract 1 frame per second
      };
    }
  };

  const extractFrames = (video, canvas, frameRate) => {
    const context = canvas.getContext('2d');
    const fps = video.videoWidth / video.videoHeight;  // Get video FPS if available
    const interval = 1000 / frameRate;                 // Calculate interval for frame rate
    const duration = video.duration;                   // Get video duration

    canvas.width = video.videoWidth;                   // Set canvas size
    canvas.height = video.videoHeight;

    let currentTime = 0;
    video.currentTime = currentTime;                   // Start from the beginning

    video.addEventListener('seeked', function captureFrame() {
      // Draw current frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a data URL
      const imgDataUrl = canvas.toDataURL('image/jpeg');
      setFrames((prevFrames) => [...prevFrames, imgDataUrl]);  // Add to the frames array

      // Move to the next frame
      currentTime += interval / 1000;  // In seconds

      if (currentTime < duration) {
        video.currentTime = currentTime;
      } else {
        video.removeEventListener('seeked', captureFrame);  // Stop capturing when done
      }
    });
  };

  const downloadImage = (dataUrl, filename) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>Extract Frames from Video</h2>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <video ref={videoRef} style={{ display: 'none' }} controls />

      {/* Hidden canvas element */}
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

      {/* Display extracted frames */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {frames.map((frame, index) => (
          <div key={index} style={{ margin: '10px' }}>
            <img
              src={frame}
              alt={frame_`${index}`}
              style={{ width: '150px', height: 'auto' }}
            />
            <button onClick={() => downloadImage(frame, frame_`${index}`.jpg)}>
              Download Frame
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoFrameExtractor;