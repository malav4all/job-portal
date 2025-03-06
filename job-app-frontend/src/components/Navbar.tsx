/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Job Portal</h1>
      <div>
        <Link to="/" className="mr-4">
          Jobs
        </Link>
        {token ? (
          <>
            {user?.role === "candidate" && (
              <Link to="/my-applications" className="mr-4">
                My Applications
              </Link>
            )}
            {user?.role === "recruiter" && (
              <Link to="/dashboard" className="mr-4">
                Dashboard
              </Link>
            )}
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
