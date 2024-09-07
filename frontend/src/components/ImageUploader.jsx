import React, { useState } from "react";

const ImageUploader = () => {
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
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
