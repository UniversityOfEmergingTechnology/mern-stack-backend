import React , {useEffect , useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Outlet , useParams } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI'
import {setCompletedLectures, setCourseSectionData , setEntireCourseData , setTotalNoOfLectures} from '../slices/viewCourseSlice'
import CourseReviewModal from '../components/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/ViewCourse/VideoDetailsSidebar'


const ViewCourse = () => {
    const {courseId} = useParams()
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const [reviewModal , setReviewModal] = useState(false)

    useEffect(() => {
        (async() => {
            const courseData = await getFullDetailsOfCourse(courseId , token)

            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))
            
            let lectures = 0
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })

            dispatch(setTotalNoOfLectures(lectures))

        })()
    },[courseId])




  return (
    <>
        <Navbar theme={'dark'}/>
        <div className='relative bg-black flex gap-5 h-[100%]'>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className='min-h-[calc(100vh - 3.5rem) w-[70%] overflow-auto'>
                <div className='mx-4'>
                    <Outlet/>
                </div>
            </div>
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </>
  )
}

export default ViewCourse