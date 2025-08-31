import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(`${BASE_URL}/api/feed`, { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (err) {
      setError(err.response?.data || "Failed to fetch feed");
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (error) {
    return (
      <h1 className="flex justify-center my-10 text-red-500 text-lg font-semibold">
        {error}
      </h1>
    );
  }

  if (!feed || feed.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-black dark:text-white text-lg font-medium">
        No New Users Found
      </h1>
    );
  }

  return (
    <div className="relative flex justify-center items-center my-10 px-4 sm:px-6 md:px-8 h-[70vh] sm:h-[60vh] md:h-[60vh]">
      {feed
        .slice(0)
        .reverse()
        .map((user, index) => (
          <UserCard
            key={user._id}
            user={user}
            zIndex={index + 1} // Top card has higher z-index
          />
        ))}
    </div>
  );
};

export default Feed;
