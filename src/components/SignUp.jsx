import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-3xl bg-gray-900/95 shadow-2xl rounded-2xl overflow-hidden border border-gray-800">
        
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src="https://images.pexels.com/photos/33647014/pexels-photo-33647014.jpeg"
            alt="Signup Banner"
            className="object-cover h-full w-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold text-center px-4">
            Join Us Today 🚀
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 px-6 py-10 sm:px-10 sm:py-12 text-gray-100">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-white">
            Create Your Account
          </h2>

          <form className="space-y-5">
            <div>
              <label className="label">
                <span className="label-text text-gray-300">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full bg-gray-800/80 text-gray-100 border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-300">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full bg-gray-800/80 text-gray-100 border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-300">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailID(e.target.value)}
                className="input input-bordered w-full bg-gray-800/80 text-gray-100 border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-300">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-gray-800/80 text-gray-100 border-gray-700 focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="button"
              className="btn btn-primary w-full text-white font-semibold tracking-wide"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-semibold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
