import React, { useState } from 'react';
import axios from 'axios';

const MultiImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);

    setPredictions([]);
  };

  const handleClear = () => {
    setSelectedFiles([]);
    setPredictions([]);
    setPreviews([]);
  };

  const handleSubmit = async () => {
    const newPredictions = [];
    
    for (let file of selectedFiles) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData);
        newPredictions.push({
          name: file.name,
          prediction: response.data.prediction,
          confidence: response.data.confidence,
        });
      } catch (error) {
        console.error('Error:', error);
        newPredictions.push({
          name: file.name,
          prediction: 'Error in prediction',
          confidence: 0,
        });
      }
    }

    setPredictions(newPredictions);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center pt-14">
      <p className="text-center text-gray-300 mt-8 max-w-2xl pb-7">
        To get started, upload multiple images by clicking to browse your files. Once uploaded, 
        click on "Process" to analyze all images and view their predictions. 
        Clear the images to upload new ones.
      </p>

      <div className="flex flex-col items-center justify-center p-4">
        <div className="border-dashed border-2 border-gray-500 rounded-lg min-w-64 h-64 flex items-center justify-center relative">
          {previews.length > 0 ? (
            <div className="flex space-x-4">
              {previews.map((preview, index) => (
                <img
                  key={index}
                  src={preview}
                  alt={`preview-${index}`}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              ))}
            </div>
          ) : (
            <label
              htmlFor="multiImageUpload"
              className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-300"
            >
              <span className="text-xs">Drop Images Here</span>
              <span className="text-xs">or</span>
              <span className="text-xs underline">Click to Upload</span>
            </label>
          )}
          <input
            id="multiImageUpload"
            type="file"
            accept="image/*"
            multiple
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleClear}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Process
          </button>
        </div>
      </div>

      <div className="mt-4 w-full max-w-md">
        {predictions.length > 0 && (
          <div className="bg-gray-800 p-4 rounded-lg">
            {predictions.map((prediction, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-300">File: {prediction.name}</p>
                <p>Prediction: {prediction.prediction}</p>
                <p>Confidence: {prediction.confidence.toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUpload;
