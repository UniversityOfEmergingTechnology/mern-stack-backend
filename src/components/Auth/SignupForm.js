import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../services/operations/AuthApi";
import { setSignupData } from "../../slices/AuthSlice";
import Tab from "../common/Tab";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    // setting signup data
    // we have to use this after otp verification
    dispatch(setSignupData(signupData));
    // send otp to user for verification
    dispatch(sendOtp(formData.email, navigate));

    // reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* form */}
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-4 w-full">
        <div className="flex lg:flex-row flex-col gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] font-walsheimCon leading-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] focus:text-black focus:bg-white font-walsheimReg bg-richblack-800 p-[12px] text-[#f5f5dc]"
            />
          </label>
          <label>
            <p className="mb-1 text-[0.875rem] font-walsheimCon leading-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] focus:text-black focus:bg-white font-walsheimReg bg-richblack-800 p-[12px] text-[#f5f5dc]"
            />
          </label>
        </div>
        <label>
          <p className="mb-1 text-[0.875rem] font-walsheimCon leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="focus:text-black focus:bg-white font-walsheimReg w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-[#f5f5dc]"
          />
        </label>

        <div className="flex gap-x-4 lg:flex-row flex-col">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] font-walsheimCon leading-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] focus:text-black focus:bg-white font-walsheimReg bg-richblack-800 p-[12px] text-[#f5f5dc]"
            />
            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            > 
                {
                  showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                  )
                }
            </span>
          </label>
          <label className="relative">
            <p className="mb-1 text-[0.875rem] font-walsheimCon leading-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] focus:text-black focus:bg-white font-walsheimReg bg-richblack-800 p-[12px] text-[#f5f5dc]"
            />
            <span className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            > 
                {
                  confirmPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>
                  ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                  )
                }
            </span>
          </label>
        </div>
        <button
        type="submit"
        className="mt-6 rounded-[8px] hover:scale-90 duration-300 bg-yellow-50 p-[12px] font-medium text-richblack-900 font-walsheimCon "
      >
        Create Account
      </button>
      </form>
    </div>
  );
};

export default SignupForm;
