import React, { useState , useEffect } from "react";
import Navbar from "../components/common/Navbar";
import OtpInput from "react-otp-input";
import {Link  , useNavigate } from "react-router-dom";
import {sendOtp , signup} from '../services/operations/AuthApi'
import {RxCountdownTimer} from 'react-icons/rx'
import {BiArrowBack} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const {signupData , loading} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(!signupData){
        navigate('/signup')
    }
  },[])


  const handleVerifyAndSignup = (e) => {
    e.preventDefault()

    const {
        accountType ,
        firstName , 
        lastName ,
        email ,
        password , 
        confirmPassword
    } = signupData
    dispatch(
        signup(
            accountType ,
            firstName ,
            lastName ,
            email ,
            password ,
            confirmPassword ,
            otp,
            navigate
        )
    )
  };
  return (
    <div className="flex flex-col bg-black w-screen h-screen">
      <Navbar theme={"dark"} />
      <div className="flex flex-row w-screen h-screen items-center justify-center">
        {loading ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          <div className="max-w-[500px] font-walsheimReg p-4 lg:p-0">
            <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[26px]">
              Verify Email
            </h1>
            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
              A verification code has been sent to you. Enter the code below
            </p>
            <form onSubmit={handleVerifyAndSignup}>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
                    }}
                    className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-[#f5f5dc] aspect-square text-center focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                    justifyContent : "space-between",
                    gap : "0 6px"
                }}
              />
              <button type="submit" className="bg-yellow-50 py-[12px] w-full duration-300 hover:scale-90 rounded-[8px] mt-6 font-medium text-richblack-900">Verify Email</button>
            </form>
            <div className="flex mt-6 items-center justify-between">
                <Link to='/signup'>
                    <p className="text-richblack-5 flex items-center gap-x-2">
                        <BiArrowBack/> Back To Signup
                    </p>
                </Link>
                <button className="flex items-center text-blue-100 gap-x-2" onClick={() => dispatchEvent(sendOtp(signupData.email , navigate))}>
                    <RxCountdownTimer/> Resend it
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
