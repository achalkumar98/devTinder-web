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
        BASE_URL + "/api/signup",
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
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-2xl bg-gray-900 shadow-xl rounded-xl overflow-hidden">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80"
            alt="City View"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2 px-6 py-6 sm:px-8 sm:py-8 text-gray-100">
          <h2 className="text-2xl font-bold text-center mb-4 text-white">
            Create Account
          </h2>

          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text text-gray-200">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-700"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-200">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-700"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-200">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailID(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-700"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text text-gray-200">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-gray-800 text-gray-100 border-gray-700"
                required
              />
            </div>

            <p className="text-error text-sm">{error}</p>

            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            <div className="divider text-gray-300">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full border-gray-700 text-gray-100 hover:bg-gray-700"
              onClick={() => alert("Google login not implemented yet")}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary text-blue-400">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
