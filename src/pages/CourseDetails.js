import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RatingStars from "../components/common/RatingStars";
import { BiInfoCircle } from "react-icons/bi";
import { formattedDate } from "../utils/dateFormatter";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import CourseDetailsCard from "../components/Course/CourseDetailsCard";
import CourseAccordianBar from "../components/Course/CourseAccordianBar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { buyCourse } from "../services/operations/StudentPayment";
import ConfirmationModal from "../components/common/ConfirmationModal";
import CheckoutForm from "../components/Payment/CheckoutForm";
import "./Payment.css";
import { ACCOUNT_TYPE } from "../utils/constants";
import { addToCart } from "../slices/cartSlice";
import {toast} from 'react-hot-toast'

const stripePromise = loadStripe(
  "pk_test_51NQqYfSBWpjG3pGK5fSz0iF6QBLnFqrFGkD0WadxLGTq7WShQorIDeqP5iIHyna5oBmciTwK9UbyTYPrCoE75hCN00wXnbz7vp"
);

const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courseId } = useParams();

  // declare a state to save the course details
  const [response, setResponse] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const [clientSecret, setClientSecret] = useState(null);
  const [formData, setFormData] = useState({});

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    // Calling fetchCourseDetails fucntion to fetch the details
    (async () => {
      try {
        const res = await fetchCourseDetails(courseId);
        console.log("course details res: ", res)
        setResponse(res.data);
      } catch (error) {
        console.log("Could not fetch Course Details");
      }
    })();
  }, [courseId]);

  // calculate avg review count
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(response?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count);
  }, [response]);

  const [isActive, setIsActive] = useState(Array(0));

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  useEffect(() => {
    let lectures = 0;
    response?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
  }, [response]);
  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent = [], // default to an empty array
    ratingAndReviews = [], // default to an empty array
    instructor,
    studentsEnrolled = [], // default to an empty array
    createdAt,
  } = response?.courseDetails || {};

  const handleBuyCourse = async () => {
    if (token) {
      const response = await buyCourse(token, [courseId]);

      if (response === undefined) {
        console.log(response);
      } else {
        console.log("Response recieved in the component", response);
        setClientSecret(response.clientSecret);
        setFormData(response);
      }

      return;
    }
    setConfirmationModal({
      text1: "You are not logged in !",
      text2: "Please login to purchase course.",
      btn1text: "Login",
      btn2text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleAddToCart = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
      toast.error("You are an instructor. You cannot buy a course")
    } 
    if(token){
      dispatch(addToCart(response?.courseDetails))
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

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh - 3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (loading || !response) {
    return (
      <div className="grid min-h[calc(100vh - 3.5rem)) place-items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {clientSecret ? (
      <div className="App">
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            formData={formData}
            token={token}
            dispatch={dispatch}
            navigate={navigate}
          />
        </Elements>
      </div>
      ) : (
      <>
        <div className="relative w-full bg-white text-darkblue">
          {/* hero section */}
          <div className="mx-auto box-content px-4 lg:w-[1250px] 2xl:relative">
            <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
              <div className="relative block max-h-[30rem] lg:hidden">
                <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                <img src={thumbnail} alt="" className="aspect-auto w-full" />
              </div>
              <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
                <div>
                  <p className="text-4xl font-bold text-richblack-800 sm:text-[42px]">
                    {courseName}
                  </p>
                </div>
                <p className="text-justify text-richblack-500">
                  {courseDescription}
                </p>
                <div className="text-md flex flex-wrap items-center gap-2">
                  <span className="text-yellow-700">{avgReviewCount}</span>
                  <RatingStars
                    Review_Count={avgReviewCount}
                    Star_Size={24}
                  ></RatingStars>
                  <span className="text-blue-400">
                    {" "}
                    {`(${
                      ratingAndReviews?.length
                        ? `${ratingAndReviews.length}`
                        : `0`
                    } reviews)`}
                  </span>
                  <span className="text-blue-400">{`${studentsEnrolled.length} students enrolled`}</span>
                </div>
                <div>
                  <p className="text-blue-600">
                    Created by{" "}
                    {`${instructor?.firstName} ${instructor?.lastName}`}
                  </p>
                </div>
                <div className="flex flex-wrap gap-5 text-lg">
                  <p className="flex items-center gap-2 text-richblack-600">
                    <BiInfoCircle /> Created at {formattedDate(createdAt)}
                  </p>
                  <p className="flex items-center gap-2 text-richblack-600">
                    <HiOutlineGlobeAlt /> English
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
                <p className="space-x-3 pb-4 text-3xl font-semibold text-darkblue">
                  Rs. {price}
                </p>
                <button className="yellowButton duration-300 hover:scale-90">
                  Buy Now
                </button>
                <button className="blackButton" onClick={handleAddToCart}>Add to cart</button>
              </div>
            </div>
            {/* Courses Card */}
            <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
              <CourseDetailsCard
                course={response?.courseDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto box-content px-4 text-start text-darkblue lg:w-[1260px]">
          <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
            {/* what you will learn section */}
            <div className="border border-richblack-800 p-8 my-8">
              <p className="text-3xl font-semibold text-darkblue">
                What you'll learn
              </p>
              <div className="mt-5">
                <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
              </div>
            </div>
            {/* course content section */}
            <div className="max-w-[830px]">
              <div className="flex flex-col gap-3">
                <p className="text-[20px] font-semibold">Course Content</p>
                <div className="flex flex-wrap justify-between gap-2">
                  <div className="flex gap-2">
                    <span>
                      {courseContent?.length} {`sections(s)`}
                    </span>
                    <span>
                      {totalNoOfLectures} {`lecture(s)`}
                    </span>
                    <span>{response?.totalDuration} total length</span>
                  </div>
                  <div>
                    <button
                      className="text-teal"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all section
                    </button>
                  </div>
                </div>
              </div>

              {/* course details accordian */}
              <div className="py-4">
                {courseContent.map((course, index) => (
                  <CourseAccordianBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                  />
                ))}
              </div>

              {/* author details */}
              <div className="mb-12 py-4">
                <p className="text-[28px] font-semibold">Author</p>
                <div className="flex items-center gap-4 py-4">
                  <img
                    src={instructor?.image}
                    alt=""
                    className="rounded-full h-14 w-14 object-cover"
                  />
                  <p className="text-lg">{`${instructor?.firstName} ${instructor?.lastName}`}</p>
                </div>
                <p className="text-richblack-500">
                  {instructor?.additionalDetails?.about}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
      )}
      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default CourseDetails;
