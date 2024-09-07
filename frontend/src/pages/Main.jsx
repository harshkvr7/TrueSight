import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [image, setImage] = useState(null);
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key for resetting input

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData);
      setPrediction(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
    setPrediction(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setImage(null);
    setFileInputKey(Date.now()); // Reset input value
  };

  const handleCameraCapture = () => {
    document.getElementById('cameraUpload').click(); // Trigger file input click
  };

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center pt-14">
      <p className="text-center text-gray-300 mt-8 max-w-2xl pb-7">
        To get started, upload an image by dragging and dropping it into the box, clicking to browse your files, or taking a photo with your camera.
        Once uploaded, our AI will analyze the image and provide detailed predictions. Clear the image to upload a new one. 
        <span> </span> <Link to={"/try/multi"} className='underline font-bold'>Process multiple files ↗</Link>
      </p>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="border-dashed border-2 border-gray-500 rounded-lg w-64 h-64 flex items-center justify-center relative">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-300"
            >
              <span className="text-xs">Drop Image Here</span>
              <span className="text-xs">or</span>
              <span className="text-xs underline">Click to Upload</span>
            </label>
          )}
          <input
            id="imageUpload"
            key={fileInputKey} // Reset input on clear
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
          <input
            id="cameraUpload"
            type="file"
            accept="image/*"
            capture="environment" // Use "user" for front camera, "environment" for back camera
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleCameraCapture}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Use Camera
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      <div className="mt-4">
        {selectedFile && (
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-300">Selected file: {selectedFile.name}</p>

            {prediction && (
              <div className="mt-4">
                <p>Prediction: {prediction.prediction}</p>
                <p>Confidence: {prediction.confidence.toFixed(2)}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
