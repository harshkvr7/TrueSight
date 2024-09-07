import React, { useState } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import ImageUploader from '../components/ImageUploader';

const Main = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

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

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClear = () => {
    setImage(null);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="border-dashed border-2 border-gray-300 rounded-lg w-64 h-64 flex items-center justify-center relative">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center cursor-pointer w-full h-full text-gray-500"
            >
              <span className="text-xs">Drop Image Here</span>
              <span className="text-xs">or</span>
              <span className="text-xs underline">Click to Upload</span>
            </label>
          )}
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
          />
        </div>

        <div className="mt-4 flex space-x-4">
          <button
            onClick={handleClear}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded"
          >
            Clear
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>



      <div>
        <Dropzone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          )}
        </Dropzone>
        {selectedFile && (
          <div>
            <p>Selected file: {selectedFile.name}</p>
            <button onClick={handleSubmit}>Submit</button>
            {prediction && <p>Prediction: {prediction.prediction}</p>}
            {prediction && <p>Confidence: {prediction.confidence.toFixed(2)}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main