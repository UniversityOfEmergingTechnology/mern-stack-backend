import React from 'react'
import ReactStars from 'react-rating-stars-component'
import {useDispatch , useSelector} from 'react-redux'
import {removeFromCart} from '../../../slices/cartSlice'

import {RiDeleteBin6Line} from 'react-icons/ri'
import {FaStar} from 'react-icons/fa'

const RenderCartCourses = () => {
  const {cart} = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const getRatingsAvgCount = (course) => {
    let sum = 0

    course.ratingAndReviews.forEach((rate) => {
      sum += rate.rating
    } )

    let avgCount = course.ratingAndReviews.length > 0 ? sum /course.ratingAndReviews.length : 0;

    return avgCount
  }

  return (
    <div className='flex flex-1 flex-col'>
      {
        cart.map((course,index) => (
          <div key={course._id} className={`flex w-full flex-wrap items-start justify-between gap-6 
          ${index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"} ${index !== 0 && "mt-6"}`}>
            <div className='flex flex-1 flex-col gap-4 xl:flex-row'>
              <img src={course?.thumbnail} className='h-[148px] w-[220px] rounded-lg object-cover' alt="" />
              <div className='flex flex-col space-y-1'>
                 <p className='text-lg font-medium text-darkblue font-walsheimCon'>{course?.courseName}</p>
                 <p className='text-richblack-100 text-sm font-walsheimMed'>{course?.category?.name}</p>

              <div className='flex items-center gap-2'>
                <span>{getRatingsAvgCount(course).toPrecision(2)}</span>
                <ReactStars
                  count={5}
                  value={getRatingsAvgCount(course)}
                  size={20}
                  edit={false}
                  activeColor="#ffd700"
                  emptyIcon={<FaStar/>}
                  fullIcon={<FaStar/>}
                />
                <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
              </div>
              </div>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <button className='flex items-center gap-x-1 rounded-md border border-richblack-600 bg-white py-3 px-[12px] text-pink-200 duration-300 hover:scale-90'
              onClick={() => dispatch(removeFromCart(course._id))}
              >
                <RiDeleteBin6Line/>
                <span>Remove</span>
              </button>
              <p className='mb-6 text-3xl font-medium text-darkblue font-walsheimReg'>{course?.price}</p>
            </div>    
          </div>
        ))
      }
    </div>
  )
}

export default RenderCartCourses