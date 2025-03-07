/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state: any) => state.auth.token);
  const user = useSelector((state: any) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Determine if we're on an auth page (login or register)
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/my-applications" ||
    location.pathname === "/apply/:id";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled || isAuthPage
          ? "bg-white text-gray-800 shadow-md py-2"
          : "bg-transparent text-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className={`ml-2 text-xl font-bold ${scrolled || isAuthPage ? "text-blue-600" : "text-white"}`}
              >
                CareerHub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? scrolled || isAuthPage
                    ? "bg-blue-600 text-white"
                    : "bg-white/20 text-white"
                  : scrolled || isAuthPage
                    ? "text-gray-700 hover:bg-gray-100"
                    : "text-white/90 hover:bg-white/10"
              }`}
            >
              Jobs
            </Link>

            {token ? (
              <>
                {user?.role === "candidate" && (
                  <Link
                    to="/my-applications"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive("/my-applications")
                        ? scrolled || isAuthPage
                          ? "bg-blue-600 text-white"
                          : "bg-white/20 text-white"
                        : scrolled || isAuthPage
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    My Applications
                  </Link>
                )}

                {user?.role === "recruiter" && (
                  <Link
                    to="/dashboard"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      isActive("/dashboard")
                        ? scrolled || isAuthPage
                          ? "bg-blue-600 text-white"
                          : "bg-white/20 text-white"
                        : scrolled || isAuthPage
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="pl-4 border-l border-gray-200">
                  <button
                    onClick={() => dispatch(logout())}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      scrolled || isAuthPage
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-red-500/80 text-white hover:bg-red-500"
                    }`}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive("/login")
                      ? scrolled || isAuthPage
                        ? "bg-blue-600 text-white"
                        : "bg-white/20 text-white"
                      : scrolled || isAuthPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white/90 hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    scrolled || isAuthPage
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              <svg
                className={`h-6 w-6 ${scrolled || isAuthPage ? "text-gray-700" : "text-white"}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-full left-0 right-0 ${
          scrolled || isAuthPage ? "bg-white shadow-lg" : "bg-gray-900"
        } transition-all duration-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/")
                ? scrolled || isAuthPage
                  ? "bg-blue-600 text-white"
                  : "bg-white/20 text-white"
                : scrolled || isAuthPage
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-gray-800"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Jobs
          </Link>

          {token ? (
            <>
              {user?.role === "candidate" && (
                <Link
                  to="/my-applications"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/my-applications")
                      ? scrolled || isAuthPage
                        ? "bg-blue-600 text-white"
                        : "bg-white/20 text-white"
                      : scrolled || isAuthPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Applications
                </Link>
              )}

              {user?.role === "recruiter" && (
                <Link
                  to="/dashboard"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/dashboard")
                      ? scrolled || isAuthPage
                        ? "bg-blue-600 text-white"
                        : "bg-white/20 text-white"
                      : scrolled || isAuthPage
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

              <div className="pt-2 pb-1">
                <button
                  onClick={() => {
                    dispatch(logout());
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    scrolled || isAuthPage
                      ? "bg-red-500 text-white"
                      : "bg-red-500/80 text-white"
                  }`}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/login")
                    ? scrolled || isAuthPage
                      ? "bg-blue-600 text-white"
                      : "bg-white/20 text-white"
                    : scrolled || isAuthPage
                      ? "text-gray-700 hover:bg-gray-100"
                      : "text-white hover:bg-gray-800"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  scrolled || isAuthPage
                    ? "bg-blue-600 text-white"
                    : "bg-blue-500 text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
