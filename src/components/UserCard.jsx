import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, editable = false }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700 transition-transform transform hover:scale-[1.01] duration-300 flex flex-col">
      {/* Image section */}
      <div className="h-[400px] relative">
        <img
          src={photoUrl}
          alt={`${firstName}'s photo`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h2 className="text-xl font-semibold">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm">
              {age} years old, {gender}
            </p>
          )}
        </div>
      </div>

      {/* Details section */}
      <div className="flex-1 flex flex-col justify-between h-full p-5">
        <p className="text-gray-300 text-sm mb-6 min-h-[100px]">{about}</p>

        {!editable ? (
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <button
              className="btn btn-outline border-gray-600 text-gray-200 hover:bg-gray-700"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        ) : (
          <div className="pt-4 border-t border-gray-700 text-xs text-gray-400 text-center">
            This is a preview of your profile
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
