import React from 'react'
import one from '../../assets/futureLearn/one.svg'
import two from '../../assets/futureLearn/two.svg'
import three from '../../assets/futureLearn/three.svg'
import four from '../../assets/futureLearn/fourth.svg'
import FutureCard from './FutureCard'

const futureLearnData = [
    {
        img : one,
        title : "Learn Anything" , 
        description : "The latest design trends meet hand-crafted templates in Sassio Collection"
    },
    {
        img : two,
        title : "Learn Together" , 
        description : "The latest design trends meet hand-crafted templates in Sassio Collection"
    },
    {
        img : three,
        title : "Learn With Experts" , 
        description : "The latest design trends meet hand-crafted templates in Sassio Collection"
    },
    {
        img : four,
        title : "Life Time Access " , 
        description : "The latest design trends meet hand-crafted templates in Sassio Collection"
    },

]

const WhyFutureLearn = () => {
  return (
    <div>
        <h2 className='text-[#140342] text-center font-walsheimCon font-[700] text-[30px]'>Why FutureLearn?</h2>
        <h5 className='font-walsheimReg leading-[26px] text-[15px] text-[#4f5478] text-center'>Embrace the Future with Future Learn</h5>
        {/* cards container */}
        <div className='flex w-[100%] flex-wrap sm:gap-5 xl:flex-nowrap flex-row mt-[100px] items-center justify-center'>
            {
                futureLearnData.map((card,index) => (
                    <FutureCard key={index} card={card}/>
                )) 
            }
        </div>
    </div>
  )
}

export default WhyFutureLearn