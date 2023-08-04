import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm'
import PublishCourse from "./Publish";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];
  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item) => (
          <>
            <div className="flex flex-col items-center" key={item.id}>
              <button
                className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full border-[1px] ${
                  step === item.id
                    ? "border-darkblue border-[2px] bg-white text-[#140432]"
                    : "border-darkblue border-[1px] bg-white text-richblack-300"
                }`}
              >
                {step > item.id ? (
                  <FaCheck className="font-bold text-caribbeangreen-300" />
                ) : (
                  item.id
                )}
              </button>
            </div>
            {item.id !== steps.length && (
              <>
                <div
                  className={`h-[calc(34px/2)] w-[33%] border-dashed border-b-2 ${
                    step > item.id
                      ? "border-caribbeangreen-400"
                      : "border-richblack-500"
                  }`}
                ></div>
              </>
            )}
          </>
        ))}
      </div>
      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <>
            <div
              className="flex min-w-[130px] flex-col items-center gap-y-2"
              key={item.id}
            >
              <p
                className={`text-sm text-[#140432] ${
                  step >= item.id ? "font-walsheim" : "font-walsheimMed"
                }`}
              >
                {item.title}
              </p>
            </div>
          </>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourse/>}
    </>
  );
};

export default RenderSteps;
