import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { logout } from "../../services/operations/AuthApi";
import ConfirmationModal from "../common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to keep track of confirmation model
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh - 3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <>
      <div className="flex h-[calc(100vh - 3.5rem)] min-w-[220px] flex-col rounded-[8px] bg-white py-10 border-r-[1px] border-black">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700"></div>
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you Sure ?",
                text2: "You will be logged out of your account",
                btn1text: "Logout",
                btn2text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 duration-1000 hover:scale-95 scale-90 text-sm font-medium text-richblack-300 "
          >
            <div className="flex items-center text-white font-walsheimMed gap-x-2">
              <VscSignOut className="text-lg text-[#4f547b]" />
              <span className="text-[#4f547b]">Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
