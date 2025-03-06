/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get("http://localhost:9087/jobs");
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        🔥 Latest Job Listings
      </h2>

      <div className="space-y-4">
        {jobs.map((job: any) => (
          <div
            key={job._id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {job.title}
              </h3>
              <p className="text-gray-600 mt-1">{job.description}</p>
            </div>
            {user?.role === "candidate" && (
              <button
                onClick={() => navigate(`/apply/${job._id}`)}
                className="mt-4 w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Apply Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
