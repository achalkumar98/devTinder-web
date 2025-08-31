import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed, please try again");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-3xl bg-gray-900/95 shadow-2xl rounded-2xl overflow-hidden border border-gray-800 transition-transform hover:scale-[1.01] duration-300">
        
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/2346289/pexels-photo-2346289.jpeg"
            alt="City View"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold text-center px-4">
            Welcome Back 👋
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 px-6 py-10 sm:px-10 sm:py-12 text-gray-100">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
            Login to your account
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={emailId}
                onChange={(e) => setEmailID(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input type="checkbox" className="checkbox checkbox-sm checkbox-secondary" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="text-blue-400 hover:underline">
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleLogin}
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-400">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 font-semibold hover:underline">
              Create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
