/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(""); // Clear previous error messages

    try {
      await axios.post("http://localhost:9087/auth/register", {
        email,
        password,
        role,
      });
      alert("Registration successful! You can now log in.");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold">Register</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        className="border p-2 m-2 w-80"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2 w-80"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="border p-2 m-2 w-80"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="candidate">Candidate</option>
        <option value="recruiter">Recruiter</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Register
      </button>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 underline">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Register;
