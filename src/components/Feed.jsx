import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try {
      const res = await axios.get(`${BASE_URL}/api/feed`, { withCredentials: true });

      if (res.data && Array.isArray(res.data)) {
        dispatch(addFeed(res.data));
      } else {
        setError("Invalid feed data");
        console.error("Unexpected feed response:", res.data);
      }
    } catch (err) {
      const message =
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch feed";
      setError(message);
      console.error(message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (error) {
    return <h1 className="flex justify-center my-10 text-red-500">{error}</h1>;
  }

  if (!feed) return null;

  if (feed.length <= 0) {
    return <h1 className="flex justify-center my-10 text-gray-300">No New Users Found</h1>;
  }

  return (
    <div className="flex justify-center my-10 px-4 sm:px-6 md:px-8">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
