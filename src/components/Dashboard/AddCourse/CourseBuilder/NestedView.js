import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteSection,
  deleteSubSection,
} from "../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../slices/courseSlice";
import ConfirmationModal from "../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    // getting the latest section
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      // finding that section out of all the section and updating that section with updated section details
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      // updating the course content array which will have updated section details
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };
  return (
    <>
    <div className="rounded-lg bg-white border-[1px] border-darkblue p-6 ">
      {course?.courseContent?.map((section) => (
        <details key={section._id} open>
          {/* section dropdown content */}
          <summary className="flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2 ">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu className="text-2xl text-darkblue" />
              <p className="font-semibold text-darkblue">
                {section.sectionName}
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <button
                onClick={() =>
                  handleChangeEditSectionName(section._id, section.sectionName)
                }
              >
                <MdEdit className="text-xl text-richblack-300" />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted?",
                    btn1text: "Delete",
                    btn2text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <RiDeleteBin6Line className="text-xl text-richblack-300" />
              </button>
              <span className="font-medium text-richblack-300">|</span>
              <AiFillCaretDown className="text-xl text-richblack-300" />
            </div>
          </summary>
          <div className="px-6 pb-4">
            {/* render subsection within a section */}
            {section.subSection.map((data) => (
              <div
                key={data?._id}
                onClick={() => setViewSubSection(data)}
                className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
              >
                <div className="flex items-center gap-x-3 py-2">
                  <RxDropdownMenu className="text-2xl text-darkblue" />
                  <p className="font-semibold text-darkblue">{data.title}</p>
                </div>
                <div className="gap-x-3 flex " onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() =>
                      setEditSubSection({ ...data, sectionId: section._id })
                    }
                  >
                    <MdEdit className="text-xl text-richblack-300" />
                  </button>
                  <button onClick={() => setConfirmationModal({
                    text1 : "Delete this Sub Section ?",
                    text2 :"This lecture will be deleted",
                    btn1text : "Delete",
                    btn2text : "Cancel",
                    btn1Handler : () => handleDeleteSubSection(data._id , section._id),
                    btn2Handler : () => setConfirmationModal(null)
                  })}>
                    <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                  </button>
                </div>
              </div>
            ))}
            {/* add a new lecture to section */}
            <button onClick={() => setAddSubSection(section._id)} className="mt-3 flex items-center gap-x-1 text-[#6440fb]">
              <FaPlus className="text-lg"></FaPlus>
              <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}
    </div>

    {/* modal display */}
    {
      addSubSection ? (
        <SubSectionModal
          modalData = {addSubSection}
          setModalData = {setAddSubSection}
          add = {true}
        />
      )
      : viewSubSection ? (
        <SubSectionModal
          modalData = {viewSubSection}
          setModalData = {setViewSubSection}
          view={true}
        />
      )
      : editSubSection ? (
        <SubSectionModal
          modalData = {editSubSection}
          setModalData = {setEditSubSection}
          edit= {true}
        />
      )
      :(
        <></>
      )
    }
    {/* confirmation model */}
    {confirmationModal ? (
      <ConfirmationModal modalData={confirmationModal}/>
    ) : (
      <></>
    )}
    </>
  );
};

export default NestedView;
