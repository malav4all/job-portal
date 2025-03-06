/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Dashboard = () => {
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);
  const [jobs, setJobs] = useState<any>([]);
  const [applications, setApplications] = useState<any>([]);
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");

  // Fetch Jobs and Applications
  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get("http://localhost:9087/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(data);
    };

    const fetchApplications = async () => {
      if (user?.role === "recruiter") {
        const { data } = await axios.get(
          "http://localhost:9087/applications/recruiter",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(data);
      }
    };

    fetchJobs();
    fetchApplications();
  }, [user, token]);

  // Create a New Job
  const handleCreateJob = async () => {
    try {
      await axios.post(
        "http://localhost:9087/jobs",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      alert("Job created successfully!");
      setJobs([...jobs, { title, description }]);
    } catch (error) {
      console.error("Error creating job", error);
    }
  };

  // Delete Job
  const handleDeleteJob = async (id: string) => {
    try {
      await axios.delete(`http://localhost:9087/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(jobs.filter((job: any) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job", error);
    }
  };

  // Update Application Status
  const updateStatus = async (id: string, status: string) => {
    await axios.put(
      `http://localhost:9087/applications/${id}/status`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setApplications(
      applications.map((app: any) =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Recruiter Dashboard</h2>

      {user?.role === "recruiter" ? (
        <>
          {/* Create Job Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Create New Job</h3>
            <input
              className="border p-2 mr-2 w-full max-w-md"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border p-2 mr-2 w-full max-w-md"
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleCreateJob}
              className="bg-blue-500 text-white px-4 py-2 mt-2"
            >
              Create Job
            </button>
          </div>

          {/* Job Listings */}
          <h3 className="text-xl font-semibold mt-6">Your Job Listings</h3>
          {jobs.map((job: any) => (
            <div key={job._id} className="border p-4 mt-2 flex justify-between">
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p>{job.description}</p>
              </div>
              <button
                onClick={() => handleDeleteJob(job._id)}
                className="bg-red-500 text-white px-4 py-2"
              >
                Delete
              </button>
            </div>
          ))}

          {/* Applications Section */}
          <h3 className="text-xl font-semibold mt-6">Applications</h3>
          {applications.length > 0 ? (
            applications.map((app: any) => (
              <div
                key={app._id}
                className="border p-4 mt-2 flex justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold">{app.jobId.title}</h3>
                  <p>Candidate: {app.candidateId.email}</p>
                  <p>Status: {app.status}</p>
                </div>
                <div>
                  <button
                    onClick={() => updateStatus(app._id, "reviewed")}
                    className="bg-yellow-500 text-white px-4 py-2 mr-2"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "accepted")}
                    className="bg-green-500 text-white px-4 py-2 mr-2"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus(app._id, "rejected")}
                    className="bg-red-500 text-white px-4 py-2"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4">No applications yet.</p>
          )}
        </>
      ) : (
        <p>You are not authorized to view this page.</p>
      )}
    </div>
  );
};

export default Dashboard;
