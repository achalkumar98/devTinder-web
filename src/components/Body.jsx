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
      const res = await axios.get(BASE_URL + "/api/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* NavBar stays sticky on top */}
      <NavBar className="fixed top-0 left-0 w-full z-50 shadow-md bg-white dark:bg-gray-900" />

      {/* Main content */}
      <main className="flex-grow pt-24 sm:pt-28 px-4 sm:px-6 md:px-8 lg:px-16 transition-all duration-300">
        <Outlet />
      </main>

      {/* Footer with responsive padding */}
      <Footer className="mt-auto px-4 sm:px-6 md:px-8 py-6 bg-gray-100 dark:bg-gray-800 transition-colors duration-300" />
    </div>
  );
};

export default Body;
