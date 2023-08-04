import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium font-walsheimCon text-[#140432]">
        Edit Profile
      </h1>
      {/* change profile picture */}
      <ChangeProfilePicture />
      {/* Profile  */}
      <EditProfile />
      <UpdatePassword />
      <DeleteAccount />
    </>
  );
}
