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
        onClick={handleUpload}
        className={`btn btn-outline-${
          uploadedFileName ? "success" : "primary"
        }`}
      >
        {uploadedFileName || "Upload"}
      </button>
      {uploadedFileName && <span className="mx-2">{uploadedFileName}</span>}
    </div>
  );
}

export default UploadButton;
