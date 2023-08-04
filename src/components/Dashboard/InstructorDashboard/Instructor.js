import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { getInstructorData } from "../../../services/operations/ProfileApi";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);
      const result = await fetchInstructorCourses(token);

      if (instructorApiData.length) setInstructorData(instructorApiData);
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    })();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-darkBlue font-walsheim">
          Hi {user?.firstName} 👋
        </h1>
        <p className="text-darkBlue font-medium"> Lets start something new</p>
      </div>
      {loading ? (
        <div className="loader"></div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex h-[450px] space-x-4">
            {/* render chart */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={instructorData} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-600 p-6">
                <p className="text-lg font-bold text-darkblue font-walsheim">
                  Visualize
                </p>
                <p className="mt-4 text-xl font-medium text-darkblue font-walsheimMed">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}

            {/* total statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md bg-white p-6">
              <p className="text-lg font-bold text-darkblue font-walsheim">
                Statistics
              </p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-darkblue font-walsheimMed">
                    Total Courses
                  </p>
                  <p className="text-3xl font-semibold text-darkblue font-walsheimReg">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-darkblue font-walsheimMed">
                    Total Students
                  </p>
                  <p className="text-3xl font-semibold text-darkblue font-walsheimReg">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-darkblue font-walsheimMed">
                    Total Income
                  </p>
                  <p className="text-3xl font-semibold text-darkblue font-walsheimReg">
                    {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-md bg-white p-6">
            {/* render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-darkblue font-walsheim">
                Your Courses
              </p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-200">
                  View All
                </p>
              </Link>
            </div>
            <div className="my-4 flex items-start space-x-4">
              {courses.slice(0, 3).map((course) => (
                <div key={course._id} className="w-1/3">
                  <img
                    src={course.thumbnail}
                    className="h-[201[x]] w-full rounded-md object-cover"
                    alt=""
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-darkblue font-walsheimCon">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-richblack-700">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-700">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-700">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
