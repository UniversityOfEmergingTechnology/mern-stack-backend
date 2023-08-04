import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiEditBoxLine } from "react-icons/ri";
import { formatDate } from "../../services/formatDate";
import IconBtn from "../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-[#140342] text-[30px] font-walsheimCon">
        My Profile
      </h1>

      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 text-[#140342] p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            className="aspect-sqaure w-[78px] rounded-full object-cover"
            alt=""
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-[#140342] font-walsheimMed">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-[#4f547b] font-walsheimReg">
              {user?.email}
            </p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 text-[#140342] py-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#140432]">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-[#4f547b] font-walsheimReg"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-[#140432] font-walsheimMed">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                First Name
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                Email
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                Gender
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                Last Name
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                Phone Number
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-[#140432 font-walsheimMed]">
                Date of Birth
              </p>
              <p className="text-sm font-medium text-[#4f547b] font-walsheimReg">
                {formatDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
