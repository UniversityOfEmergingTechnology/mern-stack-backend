import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";
import { createRating } from "../../services/operations/courseDetailsAPI";
import IconBtn from "../common/IconBtn";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-white ">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-white font-walsheim">
            Add Review
          </p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-white" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              className="aspect-square rounded-full w-[50px] object-cover"
              alt=""
            />
            <div>
              <p className="font-semibold text-darkblue font-walsheimCon">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-darkblue font-walsheimReg">
                Posting Publicly
              </p>
            </div>
          </div>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 flex flex-col items-center"
        >
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffd700"
          ></ReactStars>
          <div className="flex w-11/12 flex-col space-y-2">
            <label
              htmlFor="courseExperience"
              className="text-darkblue text-sm font-walsheimMed font-[600]"
            >
              Add Your Experience <sup className="text-pink-200">*</sup>
            </label>
            <textarea
              id="courseExperience"
              placeholder="Enter your experience"
              {...register("courseExperience", { required: true })}
              className="form-style2 resize-x-none min-h-[130px] w-full"
            />
            {errors.courseExperience && (
              <span className="ml-2 text-sx tracking-wide text-pink-200">
                Please add your experience
              </span>
            )}
          </div>
          <div className="mt-6 w-11/12 flex justify-end gap-x-2">
            <button
              onClick={() => setReviewModal(false)}
              className="flex cursor-pointer gap-x-2 items-center rounded-md bg-richblack-300 text-richblack-900 font-semibold py-[8px] px-[20px]"
            >
              Cancel
            </button>
            <IconBtn text="Save" />
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default CourseReviewModal;
