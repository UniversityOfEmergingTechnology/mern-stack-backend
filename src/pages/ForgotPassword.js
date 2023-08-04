import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/AuthApi";
import Navbar from "../components/common/Navbar";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const disptach = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    disptach(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <>
      <Navbar theme={"dark"} />
      <div className="grid min-h-[calc(100vh-3.5rem)] bg-black place-items-center">
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              {!emailSent ? "Reset Your Password" : "Check Email"}
            </h1>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
              {!emailSent
                ? "Have no fear, We'll email you instructions to reset your password. If you don't have access to your email we can try account recovery,"
                : `We have sent the reset email to ${email}`}
            </p>

            <form onSubmit={handleOnSubmit}>
              {!emailSent && (
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-walsheimCon text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    required
                    name="email"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-[0.5rem] bg-richblack-800 font-walsheimReg p-[12px] text-[#f5f5dc] focus:bg-white focus:text-black"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
                    }}
                  />
                </label>
              )}
              <button
                type="submit"
                className="mt-6 w-full rounded-[8px] duration-300 hover:scale-90 bg-yellow-50 p-[12px] font-medium text-richblack-900"
              >
                {!emailSent ? "Submit" : "Resend Email"}
              </button>
            </form>
            <div className="mt-6 items-center flex justify-between">
              <Link to="/login">
                <p className="flex items-center gap-x-2 text-richblack-5">
                  <BiArrowBack /> Back to Login
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
