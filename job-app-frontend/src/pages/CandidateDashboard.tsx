/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CandidateDashboard = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:9087/applications/candidate",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, [token]);

  const filteredApplications = applications.filter((app: any) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: any) => {
    const statusStyles: any = {
      pending: "bg-yellow-100 text-yellow-800",
      under_review: "bg-blue-100 text-blue-800",
      interview: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || "bg-gray-100 text-gray-800"}`}
      >
        {status.replace("_", " ")}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">
              Total Applications
            </p>
            <p className="text-3xl font-bold text-gray-900">
              {applications.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">
              {
                applications.filter((app: any) =>
                  ["pending", "under_review", "interview"].includes(app.status)
                ).length
              }
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">Accepted</p>
            <p className="text-3xl font-bold text-green-600">
              {
                applications.filter((app: any) => app.status === "accepted")
                  .length
              }
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <p className="text-3xl font-bold text-red-600">
              {
                applications.filter((app: any) => app.status === "rejected")
                  .length
              }
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="text-lg font-medium text-gray-900">
                Filter by status:
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "pending"
                      ? "bg-yellow-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("under_review")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "under_review"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Under Review
                </button>
                <button
                  onClick={() => setFilter("interview")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "interview"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Interview
                </button>
                <button
                  onClick={() => setFilter("accepted")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "accepted"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => setFilter("rejected")}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === "rejected"
                      ? "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Applications List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredApplications.length > 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredApplications.map((app: any) => (
                <li key={app._id}>
                  <div className="px-4 py-5 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-gray-100 rounded-full text-gray-500">
                          {app.jobId.company?.logo ? (
                            <img
                              src={`http://localhost:9087/uploads/${app.jobId.company.logo}`}
                              alt={app.jobId.company.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-xl font-bold">
                              {app.jobId.company?.name?.charAt(0) || "J"}
                            </span>
                          )}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {app.jobId.title}
                          </h3>
                          <div className="mt-1">
                            <p className="text-sm text-gray-500">
                              {app.jobId.company?.name || "Company"} •{" "}
                              {app.jobId.location || "Location"}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Applied on{" "}
                              {new Date(app.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        {getStatusBadge(app.status)}
                        <div className="flex space-x-2 mt-2">
                          <a
                            href={`http://localhost:9087/${app.resumeUrl}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            download
                          >
                            Resume
                          </a>
                          <a
                            href={`/application/${app._id}`}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">
              No applications found matching your filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateDashboard;
