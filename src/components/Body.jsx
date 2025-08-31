import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData && userData.emailId) return;

    try {
      const res = await axios.get(`${BASE_URL}/api/profile/view`, {
        withCredentials: true,
      });

      // Ensure res.data is an object with expected keys
      if (res.data && typeof res.data === "object") {
        dispatch(addUser(res.data));
      } else {
        console.error("Unexpected profile response:", res.data);
      }
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch user";

      console.error(message);

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <main className="flex-grow pt-20 sm:pt-24 px-4 sm:px-6 md:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
