/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ApplyJob = () => {
  const { id } = useParams(); // Job ID from URL
  const token = useSelector((state: any) => state.auth.token);
  const [resume, setResume] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const handleApply = async () => {
    if (!resume) return alert("Please upload a resume");

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobId", id!);

    try {
      await axios.post("http://localhost:9087/applications", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Application submitted successfully!");
      navigate("/my-applications"); // Redirect to candidate dashboard
    } catch (error) {
      console.error("Error applying for job", error);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold">Apply for Job</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mt-4 border p-2 w-full max-w-md"
      />
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        Submit Application
      </button>
    </div>
  );
};

export default ApplyJob;
