import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Failed to fetch connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading)
    return (
      <p className="text-center text-white my-10">Loading connections...</p>
    );

  if (!connections || connections.length === 0)
    return (
      <h1 className="flex justify-center text-white my-10">
        No Connections Found
      </h1>
    );

  return (
    <div className="text-center my-10 px-4">
      <h1 className="font-bold text-white text-3xl mb-6">Connections</h1>

      {connections.map(({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
        <div
          key={_id}
          className="flex items-center gap-4 m-4 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 w-full md:w-2/3 lg:w-1/2 mx-auto"
        >
          <img
            alt="profile"
            className="w-20 h-20 object-cover rounded-full border border-gray-600"
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
        </div>
      ))}
    </div>
  );
};

export default Connections;
