import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return user ? (
    <div className="px-4 sm:px-6 md:px-8">
      <EditProfile user={user} />
    </div>
  ) : null;
};

export default Profile;
