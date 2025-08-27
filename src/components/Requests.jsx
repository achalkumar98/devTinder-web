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
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${_id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading)
    return (
      <p className="text-center text-white my-10">Loading requests...</p>
    );

  if (!requests || requests.length === 0)
    return (
      <h1 className="flex justify-center text-white my-10">
        No Requests Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-6">
        Connection Requests
      </h1>

      {requests.map((request) => {
        const { _id, fromUserId } = request;
        const { firstName, lastName, photoUrl, age, gender, about } = fromUserId;

        return (
          <div
            key={_id}
            className="flex flex-col md:flex-row justify-between items-center gap-4 m-4 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 w-full md:w-2/3 lg:w-1/2 mx-auto"
          >
            <img
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border border-gray-600"
              src={photoUrl}
            />
            <div className="text-left flex-1">
              <h2 className="text-xl font-bold text-white">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-300">
                  {age}, {gender}
                </p>
              )}
              <p className="text-sm text-gray-300">{about}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-secondary bg-red-600 hover:bg-red-700 border-none"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary bg-green-600 hover:bg-green-700 border-none"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
