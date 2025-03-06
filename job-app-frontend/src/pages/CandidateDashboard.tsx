/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CandidateDashboard = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token = useSelector((state: any) => state.auth.token);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await axios.get(
        "http://localhost:9087/applications/candidate",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApplications(data);
    };
    fetchApplications();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Applications</h2>
      {applications.map((app: any) => (
        <div key={app._id} className="border p-4 mt-2">
          <h3 className="text-lg font-semibold">{app.jobId.title}</h3>
          <p>
            Status:{" "}
            <span
              className={
                app.status === "accepted"
                  ? "text-green-500"
                  : app.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
              }
            >
              {app.status}
            </span>
          </p>
          <a
            href={`http://localhost:9087/uploads/${app.resumeUrl}`}
            className="text-blue-500 underline"
            download
          >
            Download Resume
          </a>
        </div>
      ))}
    </div>
  );
};

export default CandidateDashboard;
