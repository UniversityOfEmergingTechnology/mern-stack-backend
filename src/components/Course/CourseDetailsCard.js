import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import copy from "copy-to-clipboard";
import {BsFillCaretRightFill} from 'react-icons/bs'
import {FaShareSquare} from 'react-icons/fa'
import {addToCart} from '../../slices/cartSlice'
import {ACCOUNT_TYPE} from '../../utils/constants'

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    thumbnail: ThumnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course;

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleAddToCart = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an instructor. You cannot buy a course")
    } 
    if(token){
      dispatch(addToCart(course))
      return;
    }
    setConfirmationModal({
      text1 : "You are no logged in",
      text2: "Please login to add to cart",
      btn1text : "Login",
      btn2text : "Cancel",
      btn1Handler : () => navigate('/login'),
      btn2Handler : () => setConfirmationModal(null)
    })
  };

  return (
    <>
      <div className="flex flex-col rounded-md gap-4 border-[2px] border-darkblue bg-white p-4 text-darkblue">
        <img
          src={ThumnailImage}
          className="max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover"
          alt=""
        />
        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs {CurrentPrice}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={
                user && course?.studentsEnrolled.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-courses")
                  : handleBuyCourse
              }
            >
              {user && course?.studentsEnrolled.includes(user?._id)
                ? "Go To Course"
                : "Buy Now"}
            </button>
            {(!user || !course?.studentsEnrolled.includes(user?.id)) && (
              <button className="blackButton" onClick={handleAddToCart}>
                Add To Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-300">30-Day Money-Back Guarantee</p>
          </div>

          <div>
            <p className="my-3 text-xl font-semibold">This Course Includes : </p>
            <div className="flex flex-col gap-3 text-sm text-caribbeangreen-500">
                {course?.instructions?.map((item , index) => (
                    <p className="flex gap-2" key={index}>
                        <BsFillCaretRightFill className="mt-1"/>
                        <span>{item}</span>
                    </p>
                ))}
            </div>
          </div>
          <div className="text-center">
                <button onClick={handleShare} className="mx-auto flex items-center gap-2 py-6 text-darkblue">
                    <FaShareSquare size={15}/>Share
                </button>                    
          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDetailsCard;
