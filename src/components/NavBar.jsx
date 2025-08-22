import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-base-100 shadow-md px-4 py-3 flex items-center justify-between">
      <Link
        to="/"
        className="text-2xl font-bold text-primary hover:opacity-80 transition"
      >
        👩‍💻 DevTinder
      </Link>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700 dark:text-gray-200 hidden sm:block">
            Welcome, <span className="font-semibold">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full border border-gray-300">
                <img
                  alt="user avatar"
                  src={user.photoUrl || "https://www.gravatar.com/avatar?d=mp"}
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-44"
            >
               <li>
                <Link to="/premium" className="hover:bg-base-200">
                Premium
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:bg-base-200">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-base-200">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-base-200">
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-base-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
