import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { motion, useMotionValue, useTransform } from "framer-motion";

const UserCard = ({ user, editable = false, zIndex = 1 }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const dispatch = useDispatch();

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -50, 50, 200], [0, 1, 1, 0]);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Failed to send request:", err);
    }
  };

  const handleDragEnd = (_, info) => {
    if (editable) return;

    if (info.offset.x > 120) {
      // Right swipe → Interested
      handleSendRequest("interested", _id);
    } else if (info.offset.x < -120) {
      // Left swipe → Ignored
      handleSendRequest("ignored", _id);
    }
  };

  return (
    <motion.div
      drag={!editable ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity, zIndex: editable ? "auto" : zIndex }}
      className={`
        ${editable ? "relative" : "absolute"}
        w-72 sm:w-[350px] md:w-[380px] lg:w-[400px]
        h-[70vh] sm:h-[480px] md:h-[490px] lg:h-[510px]
        bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-900 flex flex-col mx-auto
      `}
    >
      {/* Image / Cover */}
      <div className="h-72 sm:h-[280px] md:h-[290px] lg:h-[310px] relative">
        <img
          src={photoUrl || "https://www.gravatar.com/avatar?d=mp"}
          alt={`${firstName}'s photo`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
          <h2 className="text-xl sm:text-2xl font-bold truncate">
            {firstName} {lastName}
          </h2>
          {age && gender && (
            <p className="text-sm text-gray-200">
              {age} years old, {gender}
            </p>
          )}
        </div>
      </div>

      {/* About section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {about ? (
          <p className="text-gray-300 text-sm break-words">{about}</p>
        ) : (
          <p className="text-gray-500 text-sm italic">No additional information provided.</p>
        )}

        {editable && (
          <div className="pt-2 border-t border-gray-700 text-xs text-gray-400 text-center mt-2">
            This is a preview of your profile
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default UserCard;
