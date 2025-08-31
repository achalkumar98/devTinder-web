import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/user/requests/received`, { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/api/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return <p className="text-center text-black dark:text-white text-lg my-10">Loading requests...</p>;
  
  if (!requests || requests.length === 0)
    return <h1 className="flex justify-center text-black dark:text-white text-lg my-10">No Requests Found</h1>;

  return (
    <div className="text-center my-10 px-4 sm:px-6 md:px-8">
      <h1 className="font-bold text-black dark:text-white text-3xl mb-6">Connection Requests</h1>
      <div className="flex flex-col gap-6">
        {requests.map((request) => {
          const { _id, fromUserId } = request;
          const { firstName, lastName, photoUrl, age, gender, about } = fromUserId;

          return (
            <div
              key={_id}
              className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl bg-gray-800 text-white border border-gray-700 shadow-md transition-transform hover:scale-105 hover:bg-gray-700 w-full md:w-2/3 lg:w-1/2 mx-auto"
            >
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border border-gray-600"
                src={photoUrl || "https://www.gravatar.com/avatar?d=mp"}
              />
              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold">{firstName} {lastName}</h2>
                {age && gender && <p className="text-sm text-gray-300">{age} years, {gender}</p>}
                {about && <p className="text-sm text-gray-300 line-clamp-2">{about}</p>}
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="px-4 py-2 rounded-lg border border-gray-600 text-gray-200 font-medium hover:bg-secondary hover:text-white transition"
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
