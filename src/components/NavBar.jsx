import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useState } from "react";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
      setDropdownOpen(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLinkClick = () => setDropdownOpen(false);

  return (
    <nav className="bg-gray-900 text-gray-100 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold text-white hover:opacity-80 transition truncate max-w-[50%] sm:max-w-full"
        >
          👩‍💻 DevTinder
        </Link>

        {user && (
          <div className="flex items-center gap-4 relative">
            <span className="text-sm text-gray-300 hidden sm:block truncate max-w-[120px]">
              Welcome, <span className="font-semibold">{user.firstName}</span>
            </span>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn btn-ghost btn-circle avatar focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full border border-gray-700 overflow-hidden">
                  <img
                    alt="user avatar"
                    src={user.photoUrl || "https://www.gravatar.com/avatar?d=mp"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              {dropdownOpen && (
                <ul className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-lg shadow-lg flex flex-col gap-1 p-2 z-50">
                  <li>
                    <Link
                      to="/premium"
                      className="hover:bg-gray-700 block px-3 py-1 rounded transition"
                      onClick={handleLinkClick}
                    >
                      Premium
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="hover:bg-gray-700 block px-3 py-1 rounded transition"
                      onClick={handleLinkClick}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/connections"
                      className="hover:bg-gray-700 block px-3 py-1 rounded transition"
                      onClick={handleLinkClick}
                    >
                      Connections
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/requests"
                      className="hover:bg-gray-700 block px-3 py-1 rounded transition"
                      onClick={handleLinkClick}
                    >
                      Requests
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:bg-gray-700 w-full text-left px-3 py-1 rounded transition"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
