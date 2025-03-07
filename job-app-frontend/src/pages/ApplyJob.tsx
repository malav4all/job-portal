/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams();
  const token = useSelector((state: any) => state.auth.token);
  const [resume, setResume] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState<any>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeName, setResumeName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9087/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    if (id) {
      fetchJobDetails();
    }
  }, [id, token]);

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      setResumeName(file.name);
    }
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setResume(file);
      setResumeName(file.name);
    }
  };

  const removeFile = () => {
    setResume(null);
    setResumeName("");
  };

  const handleApply = async () => {
    if (!resume) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return alert("Please upload a resume");
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", id as any);
    if (coverLetter.trim()) {
      formData.append("coverLetter", coverLetter);
    }

    try {
      await axios.post("http://localhost:9087/applications", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      navigate("/my-applications", {
        state: {
          success: true,
          message: "Application submitted successfully!",
        },
      });
    } catch (error) {
      setLoading(false);
      console.error("Error applying for job", error);
      alert(
        "There was an error submitting your application. Please try again."
      );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header with job info */}
        <div className="bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold">Apply for Position</h2>
          {jobDetails && (
            <div className="mt-2">
              <h3 className="text-xl font-semibold">{jobDetails.title}</h3>
              <p className="mt-1 opacity-90">
                {jobDetails.company?.name || "Company"} •{" "}
                {jobDetails.location || "Location"}
              </p>
            </div>
          )}
        </div>

        <div className="p-6 md:p-8">
          {/* Progress steps */}
          <div className="flex justify-between mb-8">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <span className="text-sm mt-2 text-blue-600 font-medium">
                Upload Resume
              </span>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-1 w-full bg-blue-200"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <span className="text-sm mt-2 text-gray-500">Review</span>
            </div>
            <div className="flex-1 flex items-center">
              <div className="h-1 w-full bg-gray-200"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <span className="text-sm mt-2 text-gray-500">Submit</span>
            </div>
          </div>

          {/* Resume upload area */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-bold mb-3">
              Resume/CV <span className="text-red-500">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              } ${resume ? "bg-blue-50 border-blue-300" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!resume ? (
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Drag and drop your resume here, or{" "}
                    <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                      />
                    </label>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Supported formats: PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {resumeName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(resume.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cover letter text area */}
          <div className="mb-8">
            <label
              htmlFor="coverLetter"
              className="block text-gray-700 text-sm font-bold mb-3"
            >
              Cover Letter <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              id="coverLetter"
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3 h-40"
              placeholder="Tell the employer why you're the perfect fit for this job..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => navigate(-1)}
              className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={loading}
              className={`px-5 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
