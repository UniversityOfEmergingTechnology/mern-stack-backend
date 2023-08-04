import React from 'react'

const FutureCard = ({card}) => {
  return (
    <div className='flex flex-col items-center gap-[1rem]'>
        <div className='rounded-[120px] flex items-center justify-center w-[120px] h-[120px] flex-shrink-0 border-[2px] border-[#e0e0e0]'
        style={{boxShadow : '0px 25px 70px 0px rgba(1,33,58,0.07)'}}
        >
            <img src={card.img} alt="card" />
        </div>
        <div className='text-[#140342] font-bold capitalize text-[18px] font-walsheimMed'>{card.title}</div>
        <div className='text-[#140342] text-[14px] leading-[24px] text-center font-walsheimReg'>{card.description}</div>
    </div>
  )
}

export default FutureCard