import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    if (!firstName || !lastName || !age || !gender) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const res = await axios.put(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto my-10 px-4">
      {/* Form */}
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Edit Profile
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-200">
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Photo URL
            </label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Age<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              Gender<span className="text-red-500">*</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-800 text-white border-gray-700"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-200">
              About
            </label>
            <textarea
              className="textarea textarea-bordered w-full bg-gray-800 text-white border-gray-700"
              rows="3"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center pt-4">
            <button className="btn btn-primary w-full" onClick={saveProfile}>
              Save Profile
            </button>
          </div>
        </form>
      </div>

      {/* UserCard preview */}
      <div className="w-full max-w-sm h-full flex flex-col justify-between my-8">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
          editable={true}
        />
      </div>

      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-lg">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
