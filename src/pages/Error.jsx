import React from "react";
import Navbar from "../components/common/Navbar";
import Frame from "../assets/Frame.png";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <div className="bg-[#FEFBF4] ">
        <div className="flex lg:flex-row gap-10 py-[120px] w-11/12 mx-auto  flex-col">
          <img src={Frame} alt="frame" />
          <div className="flex flex-col gap-4 items-center">
            <h1 className="font-walsheimCon leading-normal text-[100px] lg:text-[200px] text-[#1A064F]">
              40<span className="text-[#6440FB]">4</span>
            </h1>
            <h3 className="font-walsheimReg text-[#140342] leading-normal text-[20px] lg:text-[35px] font-[400]">
              Oops! It looks like you're lost.
            </h3>
            <p className="leading-[26px] font-walsheimReg text-[#4F547B] text-[10px] lg:text-[16px]">
              The page you're looking for isn't available. Try to search again
              or use the go to.
            </p>
            <Link to="/">
              <button className="text-white bg-[#6440FB] w-[266px] h-[60px] flex justify-center items-center font-walsheimMed duration-300 hover:scale-95">
                Go Back to Homepage
              </button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Error;
