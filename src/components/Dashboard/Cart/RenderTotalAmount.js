import React from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { buyCourse } from '../../../services/operations/StudentPayment'
import '../../../pages/Payment.css'

const RenderTotalAmount = ({setClientSecret , setFormData}) => {
  const {total , cart} = useSelector((state) => state.cart)
  const {token} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = async () => {
    if (token) {
      const courses = cart.map((course) => course._id)
      const response = await buyCourse(token, courses );

      if (response === undefined) {
        console.log(response);
      } else {
        console.log("Response recieved in the component", response);
        setClientSecret(response.clientSecret);
        setFormData(response);
      }
      return;
    }
  };


  return (
    <>
      <div className='min-w-[250px] rounded-md border-[1px] border-richblack-700 bg-white p-6'>
        <p className='mb-1 text-sm font-medium text-darkblue font-walsheimCon'>Total :</p>
        <p className='mb-6 text-3xl font-medium text-darkblue font-walsheim'>{total}</p>
        <IconBtn
          text="Buy Now"
          onclick={handleBuyCourse}
          customClasses="w-full justify-center"
        />
      </div>
    </>
  )
}

export default RenderTotalAmount