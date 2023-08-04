import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementsField from "./RequirementsField";
import {MdNavigateNext} from 'react-icons/md'
import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../utils/constants";
import IconBtn from "../../../common/IconBtn";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);

  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };
    // if form is in edit mode
    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }
    getCategories();
  }, []);

  const isFormUpdated = () =>{
    const currentValues = getValues()
    if(
        currentValues.courseTitle !== course.courseName || 
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseTags.toString() !== course.tag.toString() ||
        currentValues.courseBenefits !== course.whatYouWillLearn || 
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString() ||
        currentValues.courseImage !== course.thumbnail
    ){
        return true;
    }
    return false;
  } 

  const onSubmit = async(data) => {
    if(editCourse){
        if(isFormUpdated()){
            const currentValues = getValues()
            const formData = new FormData()

            formData.append("courseId" , course._id)
            if(currentValues.courseTitle !== course.courseName){
                formData.append("courseName" , data.courseTitle)
            }
            if(currentValues.courseShortDesc !== course.courseDescription){
                formData.append("courseDescription" , data.courseShortDesc)
            }
            if(currentValues.coursePrice !== course.price){
                formData.append("price" , data.coursePrice)
            }
            if(currentValues.courseTags.toString() !== course.tag.toString()){
                formData.append("tag",JSON.stringify(data.courseTags))
            }
            if(currentValues.courseBenefits !== course.whatYouWillLearn){
                formData.append("whatYouWillLearn" , data.courseBenefits)
            }
            if(currentValues.courseCategory._id !== course.category._id){
                formData.append("category" , data.courseCategory)
            }
            if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                formData.append("instructions" , JSON.stringify(data.courseRequirements))
            }
            if(currentValues.courseImage !== course.thumbnail){
                formData.append("thumbnailImage" , data.courseImage)
            }
            setLoading(true)
            const result = await editCourseDetails(formData , token)
            setLoading(false)

            if(result){
                dispatch(setStep(2))
                dispatch(setCourse(result))
            }
        }
        else{
            toast.error("No changes made to the form")
        }
        return;
    }
    const formData = new FormData()

    formData.append("courseName" , data.courseTitle)
    formData.append("courseDescription" , data.courseShortDesc)
    formData.append("price" , data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn" , data.courseBenefits)
    formData.append("category" , data.courseCategory)
    formData.append("status" , COURSE_STATUS.DRAFT)
    formData.append("instructions" , JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage" , data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData,token)

    if(result){
        dispatch(setStep(2))
        dispatch(setCourse(result))
    }

    setLoading(false)

  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-white p-8"
    >
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseTitle" className="lable-style">
          Course Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="text"
          id="courseTitle"
          {...register("courseTitle", { required: true })}
          className="w-full form-style2"
          placeholder="Enter course title"
        />
        {errors.courseTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Title is required
          </span>
        )}
      </div>
      {/* course short description */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseShortDesc" className="lable-style">
          Course Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter description"
          {...register("courseShortDesc", { required: true })}
          className="w-full min-h-[130px] resize-x-none form-style2"
        />
        {errors.courseShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Short description is required
          </span>
        )}
      </div>
      {/* course price */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="coursePrice" className="lable-style">
          Course Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="coursePrice"
            {...register("coursePrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full form-style2 !pl-12"
            placeholder="Enter course price"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"></HiOutlineCurrencyRupee>
        </div>
        {errors.coursePrice && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Course Price is required
            </span>
          )}
      </div>
      {/* course category */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCategory" className="lable-style">
          Course Category <sup className="text-pink-200">*</sup>
        </label>
        <select  
            {...register("courseCategory" , {required:true})}
            defaultValue=""
            id="courseCategory"
            className="form-style2 w-full"
        >
            <option value="" disabled>Choose a Category</option>
            {
                !loading && courseCategories.map((category , index) => (
                    <option key={index} value={category?._id}>
                        {category?.name}
                    </option>
                ))
            }
        </select>
        {errors.courseCategory && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">Course category is required</span>
        )}
      </div>
      {/* course tags */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        errors={errors}
        setValue={setValue}
        editData={editCourse ? course?.thumbnail : null}
      />
      {/* benefits of the course */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseBenefits" className="lable-style">
          Course Benefits  <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter course benefits"
          {...register("courseBenefits", { required: true })}
          className="w-full min-h-[130px] resize-x-none form-style2"
        />
        {errors.courseBenefits && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Benefits  are required
          </span>
        )}
      </div>
      {/* requirements/instructions */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* neext button */}
      <div className="flex justify-end gap-x-2">
        {
            editCourse && (

                <button disabled={loading} onClick={() => dispatch(setStep(2))} className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}>
                    Continue Without Saving
                </button>
            )
        }
        <IconBtn disabled={loading} text={!editCourse ? "Next" : "Save Changes"}>
            <MdNavigateNext/>
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
