import React from 'react'
import Navbar from '../components/common/Navbar'
import Hero from '../components/HomePage/Hero'
import WhyFutureLearn from '../components/HomePage/WhyFutureLearn'
import LearnCourses from '../components/HomePage/LearnCourses'
import Categories from '../components/HomePage/Categories'
import WhatPeopleSay from '../components/HomePage/WhatPeopleSay'
import StartLearning from '../components/HomePage/StartLearning'
import LearnFrom from '../components/HomePage/LearnFrom'
import Footer from '../components/common/Footer'
import wave from '../assets/wave4.png'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar theme={"dark"}/>

      {/* hero section */}
      <div className='relative flex flex-col'>
        <Hero/>
        <div className='wave-container lg:block hidden'>
          <img src={wave} alt="" />
        </div>
      </div>

      {/* why future learn */}
      <div className='mt-[50px] w-[90%] mx-auto lg:mt-0'>
        <WhyFutureLearn/>
      </div>
      <div className='mt-[100px] bg-black opacity-90'>
        <LearnCourses/>
      </div>

      {/* top categories */}
      <div className='py-[100px] lg:px-[100px] bg-white'>
        <Categories/>
      </div>
      {/* What People say */}
      <div className='py-[100px] bg-[#6440fb] px-[50px] lg:px-[100px]'>
        <WhatPeopleSay/>
      </div>
      <div className='py-[100px]  lg:px-[100px] bg-[#eef2f6]'>
        <LearnFrom/>
      </div>
      <div className='py-[100px] px-[50px] lg:px-[100px] bg-[#6440fb]'>
        <StartLearning/>
      </div>
      <div className="py-[100px] px-[50px] lg:px-[100px]  bg-black text-white">
        <Footer/>
      </div>
    </div>
  )
}

export default HomePage