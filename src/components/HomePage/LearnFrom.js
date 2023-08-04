import React from "react";
import phone from "../../assets/phone.png";
import { AiOutlineApple } from "react-icons/ai";
import { FaGooglePlay } from "react-icons/fa";

const LearnFrom = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          <img src={phone} alt="" />
        </div>

        <div className="flex flex-col gap-5 justify-center">
          <h3 className="text-[45px] text-[#140342] font-normal leading-[3.5rem] capitalize font-walsheimCon">
            Learn From <br /> <span className="text-[#6440fb]">Anywhere</span>
          </h3>
          <p className="text-[#140342] font-normal font-walsheimReg leading-[26px]">
            Take classes on the go with the Uniemtech app. Stream or download to
            watch on the plane, the subway , or wherever you learn best.
          </p>
          <div className="flex lg:flex-row gap-5 flex-col">
            <div className="bg-black px-[15px] justify-center lg:px-[45px] gap-5 items-center rounded-[8px] py-[10px] flex flex-row">
              <AiOutlineApple
                fill="white"
                className="w-[40px] h-[50px]"
              ></AiOutlineApple>
              <div className="flex flex-col justify-center text-white text-[14px] leading-normal font-walsheimReg">
                <p>
                  {" "}
                  Download on the <span className="lg:hidden">
                    Apple Store
                  </span>{" "}
                </p>

                <p className="hidden lg:block">Apple Store</p>
              </div>
            </div>
            <div className="bg-black px-[25px] justify-center lg:px-[60px] gap-5 items-center rounded-[8px] py-[10px] flex flex-row">
              <FaGooglePlay
                fill="white"
                className="w-[30px] h-[40px]"
              ></FaGooglePlay>
              <div className="flex flex-col justify-center text-white text-[14px] leading-normal font-walsheimReg">
                <p>
                  {" "}
                  Get it on <span className="lg:hidden">
                    Google Play
                  </span>{" "}
                </p>

                <p className="hidden lg:block">Google Play</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnFrom;
