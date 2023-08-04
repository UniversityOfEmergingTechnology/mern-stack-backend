import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <>
      <div className="flex h-[calc(100vh - 3.5rem)] border-[0.5px] p-4 w-[400px] flex-col border-r-white bg-black border-r-[2px]">
        <div className="flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-white">
          <div className="flex w-full items-center justify-between">
            <div
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white p-1  cursor-pointer text-richblack-700 hover:scale-90 transition-all duration-500"
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              <IoIosArrowBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>

          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-white font-walsheimCon">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh-5rem)] overflow-y-auto">
          {courseSectionData.map((course, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              key={index}
              onClick={() => setActiveStatus(course?._id)}
            >
              <div className="flex flex-row justify-between text-darkblue py-4">
                <div className="w-[70%] text-white font-walsheimCon font-[700]">
                  {course?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`${
                      activeStatus === course?._id ? "rotate-0" : "rotate-180"
                    } transition-all duration-500 text-white `}
                  >
                    <BsChevronDown />
                  </span>
                </div>
              </div>
              {activeStatus === course?._id && (
                <div className="transition-[max-height] overflow-y-auto duration-500 ease-in-out">
                  {course.subSection.map((topic, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 px-5 py-2 ${
                        videoBarActive === topic._id
                          ? "bg-white font-walsheimReg font-semibold text-black rounded-xl"
                          : "hover:text-teal text-white"
                      } transition-all duration-700`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        );
                        setVideoBarActive(topic._id);
                      }}
                    >
                        <input type="checkbox" checked={completedLectures.includes(topic?._id)} />
                        {topic.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;
