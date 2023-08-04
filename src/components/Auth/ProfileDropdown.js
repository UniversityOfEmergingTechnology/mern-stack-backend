import React from "react";
import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { logout } from "../../services/operations/AuthApi";

const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null)

  useOnClickOutside(ref , () => setOpen(false))

  if(!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt=""
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div className="absolute top-[118%] right-0 z-[1000] bg-white border-richblack-700 border-[1px] rounded-md overflow-hidden divide-y-[1px] divide-richblack-700" ref={ref}
        onClick={(e) => e.stopPropagation()}
        >
          <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
            <div
              className={`flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#4547b] hover:bg-richblack-700 hover:text-richblack-5`}
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>
          <div
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-[#4547b] hover:bg-richblack-700 hover:text-richblack-5"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
