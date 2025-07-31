import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [emailId, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL  + "/login", {emailId, password},
      { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-2xl bg-base-100 shadow-xl rounded-xl overflow-hidden">
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=800&q=80"
            alt="City View"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="w-full lg:w-1/2 px-6 py-6 sm:px-8 sm:py-8">
          <h2 className="text-2xl font-bold text-center mb-4">
            Login to your account
          </h2>

          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                value={emailId}
                onChange={(e) => setEmailID(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <label className="label cursor-pointer space-x-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="label-text">Remember me</span>
              </label>
              <a href="#" className="link link-hover text-sm">
                Forgot password?
              </a>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={handleLogin}
            >
              Login
            </button>

            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => alert("Google login not implemented yet")}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="link link-primary">
              Create new account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
