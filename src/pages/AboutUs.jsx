import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import video from "../assets/about-us.mp4";
import courses1 from "../assets/courses1.jpg";
import courses2 from "../assets/courses2.jpg";
import courses3 from "../assets/courses3.jpg";
import online1 from "../assets/online1.svg";
import online2 from "../assets/online2.svg";
import online3 from "../assets/online3.svg";
import line1 from "../assets/Line1.svg";
import line2 from "../assets/Line2.svg";
import {TiTick} from 'react-icons/ti'

import card1 from "../assets/card1.svg";
import card2 from "../assets/card2.svg";
import card3 from "../assets/card3.svg";
import card4 from "../assets/card4.svg";
import card5 from "../assets/card5.svg";
import quotation from "../assets/quotation.svg";
import things from "../assets/Others/skills.jpeg";
import instructor from '../assets/Others/instructor.jpeg'
import student from '../assets/Others/student.jpeg'

import amazon from '../assets/brands/amazon.svg'
import amd from '../assets/brands/amd.svg'
import cisco from '../assets/brands/cisco.svg'
import dropcam from '../assets/brands/dropcam.svg'
import logitech from '../assets/brands/logitech.svg'
import spotify from '../assets/brands/spotify.svg'

const worksData = [
  {
    img: online1,
    text: "Browse courses from our expert contributors.",
  },
  {
    img: online2,
    text: "Purchase quickly and securely.",
  },
  {
    img: online3,
    text: "That’s it! Start learning right away.",
  },
];

const cardData = [
  {
    img: card1,
    title: "Learn with Experts",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
  {
    img: card3,
    title: "Learn Anything",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte..",
  },
  {
    img: card4,
    title: "Flexible Learning",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte.",
  },
  {
    img: card5,
    title: "Industrial Standard",
    desc: "Grursus mal suada faci lisis that ipsum ameti consecte..",
  },
];

const featuresData = [
  {
    title : 'Hand-picked authors'
  },
  {
    title : 'Easy to follow curriculum'
  },
  {
    title : 'Free courses'
  },
  {
    title : 'Money-back guarantee'
  },
]

const AboutUs = () => {
  return (
    <>
      <Navbar theme={"dark"} />

      <div className="flex flex-col relative">
        {/* first section */}
        <div className="relative flex flex-col h-[700px] justify-center items-center">
          <video
            autoPlay
            muted
            loop
            id="myVideo"
            className="absolute top-0 left-0 min-w-full h-[700px] object-cover z-[-1]"
          >
            <source src={video} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 min-w-full h-[700px] bg-black opacity-50 z-0"></div>
          <h1 className="text-white font-walsheim shadow-lg text-[40px] z-10 leading-normal font-[700]">
            About Us
          </h1>
          <p className="text-white text-[17px] capitalize z-10 shadow-lg leading-[36px] font-[400] font-walsheimReg">
            We’re on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        {/* second section */}
        <div className="flex  mx-auto w-[80%] flex-row py-[100px] gap-[100px]">
          <div className="flex flex-row gap-[20px] w-[50%]">
            <div className="flex flex-col items-center justify-center h-[500px]">
              <img
                src={courses2}
                className="rounded-[8px] object-cover bg-no-repeat h-[400px] w-[300px]"
                alt=""
              />
            </div>

            <div className="flex flex-col gap-[30px]">
              <img
                src={courses1}
                className="rounded-[8px] object-cover bg-no-repeat h-[200px] w-[200px]"
                alt=""
              />
              <img
                src={courses3}
                className="rounded-[8px] object-cover bg-no-repeat h-[279px] w-[342px]"
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col w-[40%] justify-center gap-[40px]">
            <h2 className="text-darkblue text-[30px] leading-[50px] font-[700] font-walsheimCon">
              Welcome to Uniemtech Enhance your skills with best Online courses
            </h2>
            <p className="font-walsheimReg leading-[26px] font-[400] text-[15px]">
              You can start and finish one of these popular courses in under a
              day – for free! Check out the list below.. Take the course for
              free
            </p>
            <p className="font-walsheimReg text-justify leading-[26px] font-[400] text-[15px] ">
            Enhance your skills and broaden your knowledge with our comprehensive courses. Whether you're a student, professional, or lifelong learner, UnimTech offers a wide range of courses designed to help you excel in your chosen field. From programming and data science to cybersecurity and cloud computing, our courses are crafted to provide you with the knowledge and practical skills needed to thrive in today's tech-driven world. Join us on this learning journey and unlock your true potential with UnimTech!
            </p>
            <button className="self-start px-[55px] py-[21px]  text-white bg-[#6440FB] font-walsheimCon duration-300 cursor-pointer hover:scale-90 rounded-lg">
              Start Learning For Free
            </button>
          </div>
        </div>

        {/* third section */}
        <div className="py-[100px] w-[80%] mx-auto flex flex-col gap-[10px] items-center">
          <h1 className="text-darkblue font-walsheim font-normal leading-normal text-[30px] ">
            How it Works?
          </h1>
          <p className="text-richblack-100 font-walsheimReg text-[15px] leading-[26px]">
            10,000+ unique online course list designs
          </p>
          <div className=" gap-[170px] relative  mt-[40px] w-full  flex flex-row">
            {worksData.map((work, index) => (
              <div
                key={index}
                className="flex flex-col gap-[20px] justify-center items-center"
              >
                <div className="w-[120px] h-[120px] relative bg-[#F7F8FB] rounded-[50%] flex items-center justify-center">
                  <img src={work.img} alt="Not found" />
                  <div className="bg-black  text-white rounded-[50%] px-1 absolute top-0 left-[1px]">
                    0{index + 1}
                  </div>
                </div>
                <p className="text-[15px] font-walsheimReg leading-[30px] text-darkblue">
                  {work.text}
                </p>
              </div>
            ))}
            <img
              className="absolute top-[50px] left-[280px]"
              src={line1}
              alt=""
            ></img>
            <img
              className="absolute right-[280px] top-[50px]"
              src={line2}
              alt=""
            ></img>
          </div>
        </div>
      </div>

      {/* fourth section */}
      <div className="py-[100px] h-[350px] relative flex flex-col  bg-[#282664] ">
        <h1 className="text-white font-walsheim text-[30px] font-[700] leading-normal text-center">
          Start your Learning Today
        </h1>
        <p className="text-white font-walsheimReg text-[15px] font-[400] leading-[25px] text-center">
          Lorem ipsum dolor sit amet, consectetur.
        </p>
        <div className="w-[80%] mx-auto gap-[30px] mt-[60px] flex flex-row">
          {cardData.map((card, index) => (
            <div
              key={index}
              style={{ boxShadow: "0px 25px 70px 0px rgba(1, 33, 58, 0.07)" }}
              className="flex bg-white justify-center items-center py-[40px] gap-[10px] flex-col rounded-[8px] "
            >
              <img className="w-[60px] h-[60px]" src={card.img} alt="" />
              <h3 className="text-darkblue text-[18px] leading-normal font-[400] font-walsheim">
                {card.title}
              </h3>
              <p className="text-center text-[14px] leading-[24px] font-normal font-walsheimReg">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* fifth section */}
      <div className="bg-white py-[200px] items-center flex flex-col">
        <h1 className="text-darkblue text-[30px] font-walsheim font-extrabold text-center">
          Testimonials
        </h1>
        <p className="text-[15px] leading-[26px] font-[400] font-walsheimReg text-center">
          10,000+ unique online course list designs
        </p>
        <img
          src={quotation}
          className="my-[50px] w-[60px] h-[42px] text-center"
          alt=""
        />
        <p className="text-darkblue w-[30%] mx-auto text-[15px] leading-[26px] font-[400] font-walsheimReg text-center">
          It is no exaggeration to say this Uniemtech experience was
          transformative–both professionally and personally. This workshop will
          long remain a high point of my life.
        </p>
        <p className="text-[15px] mt-[20px] leading-[26px] font-[400] font-walsheimReg text-center">
          Ali Tufan
        </p>
        <p className="text-[15px] text-richblack-200 my-[5px] leading-[26px] font-[400] font-walsheimReg text-center">
          Product Manager, Apple Inc
        </p>
        <div className="flex flex-row my-[50px] justify-between">
          <div className="flex flex-col gap-[20px] justify-center h-[600px w-[40%]">
            <h1 className="text-darkblue text-[45px] font-walsheimCon font-[700] leading-normal">
              <span className="text-[#6440FB]">Learn</span> new skills when and
              where you like.
            </h1>
            <p className="text-[15px] text-richblack-700  leading-[26px] font-[400] font-walsheimReg">
              Use the list below to bring attention to your product’s key <br />{" "}
              differentiator.
            </p>
            <button className="bg-black text-white self-start px-[55px] py-[15px]   font-walsheimCon duration-300 cursor-pointer hover:scale-90 rounded-lg">
              Join Free
            </button>
          </div>
          <div className="relative">
            <img src={things} className="w-[600px]  h-[612px] rounded-[10px]" alt="" />
            <div className="absolute top-[200px] -left-[220px] bg-black w-[300px] h-[355px] gap-[35px] flex flex-col justify-center rounded-lg pl-5">
              {
                featuresData.map((feature , index) => (
                  <div key={index} className="flex flex-row gap-[15px]">
                    <div className="bg-white text-[25px] rounded-[50%]"><TiTick fill="black" size={25}/></div>
                    <p className="text-white font-walsheimReg leading-normal font-[400] text-[15px]">{feature.title}</p>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div className="flex flex-row my-[50px] justify-between">
        <div className="w-[50%] flex justify-start">
            <img src={instructor}  className="w-[600px]  h-[442px] " alt="" />
          </div>
          <div className="flex flex-col gap-[20px]  justify-center h-[400px] w-[50%]">
            <h1 className="text-darkblue text-[45px] font-walsheimCon font-[700] leading-normal">
              Become an Instructor
            </h1>
            <p className="text-[15px] text-richblack-700  leading-[26px] font-[400] font-walsheimReg">
            Join millions of people from around the world learning together. Online learning is as easy and natural as chatting.
            </p>
            <button className="bg-white text-[#6440FB] self-start px-[55px] py-[15px]   font-walsheimCon duration-300 cursor-pointer border-[1px] border-[#6440FB] hover:scale-90 rounded-lg">
              Apply  Now
            </button>
          </div>
        </div>
        <div className="flex flex-row mt-[50px] justify-between">
          <div className="flex flex-col gap-[20px] justify-center items-start h-[600px w-[50%]">
            <h1 className="text-darkblue text-[45px] font-walsheimCon font-[700] leading-normal">
            Become a Student
            </h1>
            <p className="text-[15px] text-richblack-700  leading-[26px] font-[400] font-walsheimReg">
            Join millions of people from around the world learning together. Online learning is as easy and natural as chatting.
            </p>
            <button className="bg-white border-[1px] border-black text-black self-start px-[55px] py-[15px]   font-walsheimCon duration-300 cursor-pointer hover:scale-90 rounded-lg">
              Apply Now
            </button>
          </div>
          <div className="w-[50%]  flex justify-center">
            <img src={student} className="border-[1px] border-black rounded-[10px] w-[600px]  h-[512px] " alt="" />
          </div>
        </div>

        <div className="mt-[100px] w-[100%] flex flex-col gap-[30px]">
          <h3 className="text-center text-richblack-600  text-[18px] font-walsheimMed font-extrabold  leading-normal"> Trusted by companies of all sizes</h3>
          <div className="flex flex-row  justify-between items-center mx-auto w-[70%]">
            <img src={amazon} alt="" />
            <img src={amd} alt="" />
            <img src={cisco} alt="" />
            <img src={dropcam} alt="" />
            <img src={logitech} alt="" />
            <img src={spotify} alt="" />
          </div>


        </div>
      </div>

      <div className="bg-black">
        <Footer />
      </div>
    </>
  );
};

export default AboutUs;
