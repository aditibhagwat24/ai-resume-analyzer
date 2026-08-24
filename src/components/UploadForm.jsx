"use client";

import { useState } from "react";
import ResultCard from "./ResultCard";

export default function UploadForm() {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload a resume file");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      alert("Something went wrong .please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-[#16213E]/10 p-8 rounded-2xl space-y-6"
      >
        <div>
          <label className="block text-xs tracking-wide uppercase text-[#16213E]/60 mb-2">
            Resume (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full text-sm border border-[#16213E]/15 rounded-lg p-3 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:bg-[#16213E] file:text-white file:text-xs"
          />
        </div>

        <div>
          <label className="block text-xs tracking-wide uppercase text-[#16213E]/60 mb-2">
            Job Description (optional)
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={5}
            placeholder="paste job description here..."
            className="w-full text-sm border border-[#16213E]/15 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#E8A33D]/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#16213E] text-white py-3 rounded-full font-medium hover:bg-[#16213E]/90 disabled:opacity-50 transition-colors"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {result && !result.error && <ResultCard result={result} />}
      {result?.error && (
        <div className="mt-4 p-4 bg-[#D64545]/10 text-[#D64545] rounded-lg text-sm">
          {result.error}
        </div>
      )}
    </>
  );
}