import React, { useState, useRef } from "react";
import Zlib from "react-zlib-js";

function UploadButton({ onFileSelect }) {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false); // New state variable
  const inputRef = useRef(null);

  const handleUpload = async () => {
    inputRef.current.click(); // trigger the file input click event
  };

  const handleDisplayFileDetails = async (event)   => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFileName(file.name);
      // Convert the file to a blob
      const blobData = await convertFileToBlob(file);
      // Compress the data
     // const compressedData = Zlib.deflate(blobData);    
      // Call the parent component's function with the compressed data
      onFileSelect(blobData);
    }
  };

  const convertFileToBlob = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="m-3">
      <label className="mx-3">Choose file:</label>
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        type="file"
        className="d-none"
      />
      <button
        onClick={handleUpload}
        className={`btn btn-outline-${fileUploaded ? "success" : "primary"}`}
      >
        {fileUploaded ? "File Successfully Uploaded" : "Upload"}
      </button>
      {uploadedFileName && <span className="mx-2">{uploadedFileName}</span>}
    </div>
  );
}

export default UploadButton;
