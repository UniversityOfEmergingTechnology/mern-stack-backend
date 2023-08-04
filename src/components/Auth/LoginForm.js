import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/operations/AuthApi";
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const {email , password} = formData


  const handleOnChange = (e) => {
    setFormData((prevData) => ({
        ...prevData ,
        [e.target.name] : e.target.value
    }))
  };
  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email , password , navigate))
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Email Address <sup className="text-pink-300">*</sup>
        </p>
        <input
          type="text"
          required
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-[0.5rem] bg-richblack-800 font-walsheimReg p-[12px] text-[#f5f5dc] focus:bg-white focus:text-black"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18",
          }}
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
          Password <sup className="text-pink-300">*</sup>{" "}
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          name="password"
          // value={}
          onChange={handleOnChange}
          placeholder="Enter password"
          className="w-full rounded-[0.5rem] bg-richblack-800 font-walsheimReg p-[12px] text-[#f5f5dc] focus:bg-white focus:text-black"
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18",
          }}
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[38px] z-[10] cursor-pointer"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="/forgot-password">
          <p className="mt-1 ml-auto max-w-max font-walsheimCon text-xs text-blue-100">
            Forgot Password
          </p>
        </Link>
      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] hover:scale-90 duration-300 bg-yellow-50 p-[12px] font-medium text-richblack-900 font-walsheimCon "
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
