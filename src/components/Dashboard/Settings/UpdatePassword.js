import React, { useState } from 'react'
import {AiOutlineEye , AiOutlineEyeInvisible} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import {changePassword} from '../../../services/operations/SettingsApi'
import IconBtn from '../../common/IconBtn'
import {useNavigate} from 'react-router-dom'

const UpdatePassword = () => {
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword , setShowNewPassword] = useState(false)

  const {register ,  handleSubmit , formState : {errors}} = useForm()

  const submitPasswordForm = async(data) => {
    try{
      await changePassword(token , data)
    }
    catch(error){
      console.log("Error message" , error.message)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className='my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 px-12 py-8'>
          <h2 className='text-lg font-semibold text-[#140432] text-[25px] font-walsheimCon'>Password</h2>

          <div className='flex flex-col gap-5 lg:flex-row'>
            <div className='relative flex flex-col gap-2 lg:w-[40%]'>
              <label htmlFor="oldPassword" className='lable-style'>
                Current Password
              </label>
              <input 
              type =  {showOldPassword ? "text" : "password"}
              name='oldPassword'
              id='oldPassword'
              placeholder='Enter current password'
              className='form-style2'
              {...register("oldPassword" , {required : true})}
              />
              <span className='absolute right-3 top-[44px] z-[10] cursor-pointer'
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'/>
                ) : (
                  <AiOutlineEye fontSize={24} fill='#afb2bf'/>
                )}
              </span>
              {
                errors.oldPassword && (
                  <span className='-mt-1 text-[12px] text-yellow-500'>
                    Please enter your current password
                  </span>
                )
              }
            </div>
            <div className='relative flex flex-col gap-2 lg:w-[40%]'>
              <label htmlFor="newPassword" className='lable-style'>
                New Password
              </label>
              <input 
              type =  {showNewPassword ? "text" : "password"}
              name='newPassword'
              id='newPassword'
              placeholder='Enter new password'
              className='form-style2'
              {...register("newPassword" , {required : true})}
              />
              <span className='absolute right-3 top-[44px] z-[10] cursor-pointer'
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill='#afb2bf'/>
                ) : (
                  <AiOutlineEye fontSize={24} fill='#afb2bf'/>
                )}
              </span>
              {
                errors.newPassword && (
                  <span className='-mt-1 text-[12px] text-yellow-500'>
                    Please enter your new password
                  </span>
                )
              }
            </div>
          </div>
 
      </div>

      <div className='flex justify-end gap-2'>
          <button onClick={() => {
            navigate('/dashboard/my-profile')
          }}
            className='cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50'
          >Cancel</button>

          <IconBtn type='submit' text="Update"/>
      </div>

    </form>
  )
}

export default UpdatePassword