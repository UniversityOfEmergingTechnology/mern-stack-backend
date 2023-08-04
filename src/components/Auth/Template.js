import React from 'react'
import { useSelector } from 'react-redux'
import bg from '../../assets/bg2.mp4'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Template = ({title , description1 , description2 , formType}) => {
    const {loading} = useSelector((state) => state.auth)
  return (
    <div className='flex flex-row w-full h-full relative '>
        <video className='absolute top-0 left-0 min-w-full min-h-full object-cover z-[-1]'  autoPlay loop muted >
            <source src={bg} type='video/mp4' />
        </video>
        {
            loading ? 
            (<div className='loader'></div>)
            :(
                <div className='mx-auto flex w-11/12 lg:h-[750px] max-w-maxContent flex-col-reverse items-center justify-center gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>
                    <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
                        <h1 className='text-[1.875rem] text-white font-walsheimCon font-semibold leading-[2.375rem]'>{title}</h1>
                        <p className='mt-4 text-[1.125rem] text-white leading-[1.625rem]'>
                            <span className='font-walsheimMed font-semibold'>{description1}</span>{" "}
                            <span className='font-walsheimReg text-blue-100 font-bold italic'>{description2}</span>
                        </p>
                        {formType === "signup" ? <SignupForm/> : <LoginForm/> }
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default Template