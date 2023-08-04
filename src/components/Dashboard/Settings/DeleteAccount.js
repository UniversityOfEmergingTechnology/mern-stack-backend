import React from 'react'
import { FiTrash2 } from 'react-icons/fi'
import {useDispatch , useSelector} from 'react-redux'
import {deleteProfile} from '../../../services/operations/SettingsApi'
import {useNavigate} from 'react-router-dom'

const DeleteAccount = () => {
  const{token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount(){
    try{
      dispatch(deleteProfile(token , navigate))
    }
    catch(error){
      console.log(error)
    }
  }

  return (
    <>

      <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-black px-12 py-8'>
          <div className='flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-white'>
            <FiTrash2 className='text-3xl text-black' />
          </div>
          <div className='flex flex-col space-y-2'>
            <h2 className='text-lg font-semibold text-white font-walsheimCon'>Delete Account</h2>
            <div className='text-white w-3/5 font-walsheimReg'>
              <p>Would you like to delete account?</p>
              <p>This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it</p>
            </div>
            <button type='button' onClick={handleDeleteAccount} className='w-fit cursor-pointer animate-pulse text-white font-walsheim'>I want to delete my account</button>
          </div>
      </div>
    </>
  )
}

export default DeleteAccount