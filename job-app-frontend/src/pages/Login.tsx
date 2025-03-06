/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:9087/auth/login", {
        email,
        password,
      });
      dispatch(setToken(data.token));
      dispatch(setUser({ email: data.user.email, role: data.user.role }));
      navigate("/");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-xl font-bold">Login</h2>
      <input
        className="border p-2 m-2"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 m-2"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
