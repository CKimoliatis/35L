import React, { useState, useRef } from "react";
import Zlib from "react-zlib-js";

function UploadButton({ onFileSelect }) {
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
      onFileSelect(file) //call the pass function with the selected file
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
    <div className="m-2">
      <label className="mx-3">Choose file:</label>
      <input
        ref={inputRef}
        onChange={handleDisplayFileDetails}
        type="file"
        className="d-none"
      />
      <button
        onClick={(e) => {
          e.preventDefault(); // This will prevent the default form submit action
          handleUpload();
        }}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
        type="button" // Explicitly set the button type to 'button'
      >
        {fileUploaded ? "File Successfully Uploaded" : "Upload"}
      </button>
    </div>
  );
}

export default UploadButton;