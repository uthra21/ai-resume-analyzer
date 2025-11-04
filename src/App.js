import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume || !jobDesc) {
      alert("Please upload a resume and enter a job description!");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_desc", jobDesc);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://ai-resume-analyzer-backend-vnyb.onrender.com/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setResult(response.data);
    } catch (error) {
      alert("Error connecting to backend!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">AI Resume Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Upload Resume (PDF)</label>
          <input
            type="file"
            accept=".pdf"
            className="form-control"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Paste Job Description</label>
          <textarea
            className="form-control"
            rows="5"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && (
        <div className="mt-5 card p-4 shadow">
          <h4>Results:</h4>
          <p>
            <strong>Match Score:</strong> {result.match_score}%
          </p>
          <p>
            <strong>Feedback:</strong> {result.feedback}
          </p>
          <p>
            <strong>Missing Keywords:</strong>
          </p>
          <ul>
            {result.missing_keywords.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
