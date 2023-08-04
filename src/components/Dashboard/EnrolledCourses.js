import React from 'react'
import { useEffect , useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getUserEnrolledCourses} from '../../services/operations/ProfileApi'
import ProgressBar from '@ramonak/react-progress-bar'

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [enrolledCourses , setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async() => {
        try{
            const res = await getUserEnrolledCourses(token)
            setEnrolledCourses(res)
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        getEnrolledCourses()
    },[])

  return (
    <>
        <div className='text-darkblue text-3xl font-walsheimCon'>
            Enrolled Courses
        </div>
        {
            !enrolledCourses ? (
                <div className='grid min-h-[calc(100vh - 3.5rem)] place-items-center'>
                    <div className="loader"></div>
                </div>
            ) : !enrolledCourses.length ? (
                <p className='grid h-[10vh] w-full place-content-center text-richblack-800'>You have not enrolled in any course yet</p>
            ) : (
                <div className='my-8'>
                    <div className='flex rounded-t-lg bg-richblack-500 text-white'>
                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                        <p className='w-1/4 px-2 py-3'>Duration</p>
                        <p className='flex-1 px-2 py-3'>Progress</p>
                    </div>
                {
                    enrolledCourses.map((course, i , arr) => (
                        <div className={`flex items-center border border-richblack-700 ${i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"}`}
                        key= {i}
                        >
                            <div className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'
                            onClick={() => navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}
                            >
                                <img src={course.thumbnail} className='h-14 w-14 rounded-lg object-cover' alt="" />
                                <div className='flex flex-col gap-2 max-w-xs'>
                                    <p className='font-semibold'>{course.courseName}</p>
                                    <p className='text-xs text-richblack-300'>
                                        {course.courseDescription.length > 50 ? `${course.courseDescription.slice(0,50)}` : course.courseDescription}
                                    </p>
                                </div>
                            </div>
                            <div className='w-1/4 px-2 py-3'>
                                {course?.totalDuration}
                            </div>
                            <div className='flex flex-col w-1/5 gap-2 px-2 py-3'>
                                <p>Progress : {course.progressPercentage || 0}%</p>
                                <ProgressBar completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                ></ProgressBar>
                            </div>
                        </div>
                    ))
                }
                </div>
            )
        }
    </>
  )
}

export default EnrolledCourses