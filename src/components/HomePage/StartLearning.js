import React from 'react'

const StartLearning = () => {
  return (
    <div className='flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-0 lg:items-center '>
        <p className='text-[30px] text-white font-walsheimCon leading-[46px] font-[700]'>Join more than <span className='text-[#00ff84]'>8 million <br /> learners</span> worldwide</p>
        <button className='flex items-center justify-center bg-[#00ff84] py-[21px] px-[55px] rounded-[8px] cursor-pointer font-walsheimCon text-[16px] duration-300 hover:scale-90 text-black'>Start learning for free</button>
    </div>
  )
}

export default StartLearning