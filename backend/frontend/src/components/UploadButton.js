import React, { useState, useRef } from "react";

function UploadButton() {
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const inputRef = useRef(null);

  const handleUpload = () => {
    inputRef.current.click(); // trigger the file input click event
  };

  const handleDisplayFileDetails = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFileName(file.name);
    }
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
        onClick={(e) => {
          e.preventDefault(); // This will prevent the default form submit action
          handleUpload();
        }}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
        type="button" // Explicitly set the button type to 'button'
      >
        {uploadedFileName || "Upload"}
      </button>
    </div>
  );
}

export default UploadButton;