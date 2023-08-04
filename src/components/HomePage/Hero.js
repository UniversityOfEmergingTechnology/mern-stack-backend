import React from "react";
import cross from "../../assets/cross.svg";
import Group from "../../assets/Group.png";
import banner from "../../assets/banner.mp4";
import "./Hero.css";
import group2 from "../../assets/group2.svg";
import group3 from "../../assets/group3.svg";
import badge from "../../assets/badge.svg";
import cap from "../../assets/cap.svg";
import play from "../../assets/play.svg";
import read from "../../assets/read.svg";
import star from "../../assets/star.svg";
import bag from "../../assets/bag.svg";

const infoArray = [
  {
    img: cap,
    descr: "Over 12 million students",
  },
  {
    img: play,
    descr: "More than 60,000 courses",
  },
  {
    img: read,
    descr: "Learn anything online",
  },
];

const Hero = () => {
  return (
    <div className=" bg-black pt-[90px] lg:pt-[150px] pb-[200px] lg:pb-[50px] px-[15px] lg:px-[50px] flex flex-col gap-4 relative">
      {/* absolute positioned elements */}
      <img
        src={cross}
        alt="Cross"
        className="w-[16px] absolute left-[50px] top-[40px] opacity-50 h-[16px]"
      />
      <img
        src={Group}
        alt="Cross"
        className="w-[16px] absolute left-[20px] top-[410px] opacity-50 h-[16px]"
      />
      <img
        src={group2}
        alt="Cross"
        className="w-[16px] absolute left-[320px] top-[360px] opacity-50 h-[16px]"
      />
      <img
        src={group3}
        alt="Cross"
        className="w-[16px] absolute left-[320px] top-[147px] opacity-50 h-[16px]"
      />
      <img
        src={cross}
        alt="Cross"
        className="w-[16px] hidden lg:block absolute left-[710px] top-[697px] opacity-50 h-[16px]"
      />
      <img
        src={star}
        alt="star"
        className="w-[16px] hidden lg:block absolute left-[510px] top-[597px] opacity-70 h-[16px]"
      />
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col lg:w-[50%]  gap-4">
          <h2 className="text-white text-[30px] lg:text-[55px] capitalize lg:leading-[80px] font-walsheim leading-[43px] font-[700]">
            Learn New Skills Online with Top{" "}
            <span className="text-[#00FF84] underline">Educators</span>{" "}
          </h2>

          <h5 className="text-[15px] leading-[26px] font-walsheimReg text-white ">
            Build skills with courses, certificates, and degrees online from
            world-class universities and companies.
          </h5>

          <div className="flex  flex-col gap-4 lg:flex-row">
            <button className="bg-[#6440FB] py-[21px] lg:px-[55px] px-[30px] font-bold cursor-pointer rounded-[8px] text-white duration-300 hover:scale-90">
              Join For Free
            </button>
            <button className=" text-[#00FF84] border-[1px] lg:px-[55px]  border-[#00FF84] py-[21px] px-[30px] font-bold cursor-pointer rounded-[8px]  duration-300 hover:scale-90 ">
              Find Courses
            </button>
          </div>
        </div>

        {/* video */}
        <div className="flex flex-col gap-4  relative lg:w-[80%] h-[20%] mt-[30px]  items-center">
          <div className="blob-video-wrapper relative">
            <video className="blob-video " src={banner} autoPlay loop muted ></video>
          </div>
          {/* boxes absolutely positioned over video */}
          <div
            className="flex h-[80px] md:h-[90px]   w-[267px] absolute -bottom-10 right-8 z-10 xl:py-[20px] px-[25px] py-[2px] md:py-[10px] md:px-[30px] justify-center xl:px-[30px] flex-col bg-white border-black border-[1px] rounded-[8px] "
            style={{ boxShadow: "0px 40px 30px 0px rgba(25, 25, 46, 0.04)" }}
          >
            <h3 className="text-[#6440FB] text-[16px] font-walsheimMed leading-normal ">
              Congrats!
            </h3>
            <h3 className="font-walsheimReg text-[15px] leading-[26px] opacity-70">
              Your Admission Completed
            </h3>
            <img
              src={badge}
              alt="badge"
              className="absolute top-[-15px] left-[-50px]"
            />
          </div>
          <div
            className="hidden lg:flex h-[90px]  w-[267px] absolute top-[5px] right-[0px] z-10  justify-center items-center flex-row bg-white border-black border-[1px] rounded-[8px] "
            style={{ boxShadow: "0px 40px 30px 0px rgba(25, 25, 46, 0.04)" }}
          >
          <div className="flex items-center justify-center">
            <img src={bag} className="w-[150px] h-[150px] absolute -left-7 top-3"   alt="" />
          </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-[#E8543E] text-[16px] font-walsheimMed leading-normal ">
                  3000+
                </h3>
                <h3 className="font-walsheimReg text-[15px] leading-[26px] opacity-70">
                  Free Courses
                </h3>
            </div>
          </div>
          <div
            className="hidden lg:flex h-[90px]  w-[267px] absolute bottom-[205px] -left-[70px] z-10  justify-center items-center flex-row bg-white border-black border-[1px] rounded-[8px] "
            style={{ boxShadow: "0px 40px 30px 0px rgba(25, 25, 46, 0.04)" }}
          >
          <div className="flex items-center justify-center">
            <img src={bag} className="w-[150px] h-[150px] absolute -left-7 top-3"   alt="" />
          </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-[#E8543E] text-[16px] font-walsheimMed leading-normal ">
                  3000+
                </h3>
                <h3 className="font-walsheimReg text-[15px] leading-[26px] opacity-70">
                  Free Courses
                </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:flex flex-row pt-[40px] gap-4 hidden ">
        {infoArray.map((info, index) => (
          <div className="flex flex-row gap-2 w-[18%]" key={index}>
            <img src={info.img} alt="" />
            <div className="text-[15px] font-walsheimReg font-[400] leading-normal text-white">
              {info.descr}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
