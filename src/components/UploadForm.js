import React, { useState } from "react";

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume file first!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze resume");

      const data = await response.json();
      console.log("Analysis Result:", data);
      alert("Resume analyzed successfully! Check console for details.");
    } catch (error) {
      console.error(error);
      alert("Error analyzing resume!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">AI Resume Analyzer</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light"
      >
        <div className="mb-3">
          <label htmlFor="resumeUpload" className="form-label">
            Upload your Resume (PDF/DOCX)
          </label>
          <input
            type="file"
            className="form-control"
            id="resumeUpload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Analyze Resume
        </button>
      </form>
    </div>
  );
}

export default UploadForm;
