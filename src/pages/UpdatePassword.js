import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import { resetPassword } from "../services/operations/AuthApi";

import { BiArrowBack } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };
  return (
    <>
      <Navbar theme={"dark"}></Navbar>
      <div className="grid bg-black min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-0">
            <h1 className="text-[1.875rem] font-walsheimCon font-semibold leading-[2.375rem] text-richblack-5">
              Choose New Password
            </h1>
            <p className="my-4 text-[1.125rem] font-walsheimReg leading-[1.625rem] text-richblack-100">
              Almost Done. Enter your new password and you are all set.
            </p>
            <form onSubmit={handleOnSubmit}>
              <label className="relative">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  {" "}
                  New Password <sup className="text-pink-200">*</sup>
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
                  className="w-full rounded-[0.5rem] bg-richblack-800 font-walsheimReg p-[12px] focus:bg-white focus:text-black text-[#f5f5dc]"
                />
                <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {
                        showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf"></AiOutlineEyeInvisible>
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#afb2bf" ></AiOutlineEye>
                        )
                    }
                </span>
              </label>
              <label className="relative mt-3 block">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  {" "}
                  Confirm New Password <sup className="text-pink-200">*</sup>
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
                  className="w-full rounded-[0.5rem] bg-richblack-800 font-walsheimReg p-[12px] focus:bg-white focus:text-black text-[#f5f5dc]"
                />
                <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                    {
                        showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf"></AiOutlineEyeInvisible>
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#afb2bf" ></AiOutlineEye>
                        )
                    }
                </span>
              </label>
              <button type="submit" className="mt-6 w-full rounded-[8px] bg-yellow-50 p-[12px] font-medium text-richblack-900 duration-300 hover:scale-90">
                Reset Password
              </button>
            </form>
            <div className="mt-6 flex items-center justify-between">
            <Link to='/login'>
                    <p className="flex items-center gap-x-2 text-richblack-5"><BiArrowBack/> Back to login</p>

            </Link>

            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePassword;
