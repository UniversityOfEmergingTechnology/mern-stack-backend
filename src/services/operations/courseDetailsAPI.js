import { toast } from "react-hot-toast";

import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
  GET_ALL_COURSE_API,
  EDIT_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
  COURSE_DETAILS_API
} = courseEndpoints;

export const getAllCourses = async() => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET" , GET_ALL_COURSE_API)
        if(!response?.data?.success){
            throw new Error("Could not fetch courses")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Get all courses api error" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
      const response = await apiConnector("POST", COURSE_DETAILS_API, {
        courseId,
      })
      console.log("COURSE_DETAILS_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      result = response.data
    } catch (error) {
      console.log("COURSE_DETAILS_API API ERROR............", error)
      result = error.response.data
    }
    toast.dismiss(toastId)
    return result
  }
export const fetchCourseCategories = async() => {
    let result = [];

    try{
        const response = await apiConnector("GET" , COURSE_CATEGORIES_API)
        if(!response?.data?.success){
            throw new Error("Could not fetch course categories")
        }
        console.log("fetch course categories api response",response)
        result = response?.data?.data
    }
    catch(error){
        console.log("Course category api error" , error)
        toast.error(error.message)
    }
    return result
}

export const addCourseDetails = async(data , token)=> {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , CREATE_COURSE_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Create course api response" , response)
        if(!response?.data?.success){
            throw new Error("Could not create a course")
        }
        toast.success("Course details added succesfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Create course api error" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , EDIT_COURSE_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Edit course api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not update course details")
        }
        toast.success("Course details updated successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Edit course api error" , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const createSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , CREATE_SECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Create  section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not create section")
        }
        toast.success("Course Section created successfully")
        result = response?.data?.updatedCourse
    }
    catch(error){
        console.log("Create section api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const createSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , CREATE_SUBSECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Create sub section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not add lecture / subsection")
        }
        toast.success("Course Sub Section / lecture created successfully")
        result = response?.data?.data
    }
    catch(error){
        console.log("Create sub section / lecture api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const updateSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , UPDATE_SECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Update section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not update section")
        }
        toast.success("Course  Section updated")
        result = response?.data?.data
    }
    catch(error){
        console.log("Update  section api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const updateSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , UPDATE_SUBSECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("Update sub section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not update sub-section")
        }
        toast.success("Lecture updated")
        result = response?.data?.data
    }
    catch(error){
        console.log("Update sub section api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , DELETE_SECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("DELETE  section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not delete section")
        }
        toast.success("Course section deleted")
        result = response?.data?.data
    }
    catch(error){
        console.log("Delete  section api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const deleteSubSection = async(data , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , DELETE_SUBSECTION_API , data , {
            "Content-Type" : "multipart/form-data",
            Authorization : `Bearer ${token}`
        })
        console.log("DELETE  sub section api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not delete sub-section")
        }
        toast.success("Lecture deleted")
        result = response?.data?.data
    }
    catch(error){
        console.log("Delete sub section api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const fetchInstructorCourses = async(token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("GET" , GET_ALL_INSTRUCTOR_COURSES_API ,null , {
            Authorization : `Bearer ${token}`
        })
        console.log("Instructor  courses api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not fetch instructor courses")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Instructor courses api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const deleteCourse = async(data , token) => {
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("DELETE" , DELETE_COURSE_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("DELETE  courses api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not delete course")
        }
        toast.success("Course deleted")
    }
    catch(error){
        console.log("Delete course api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}



export const getFullDetailsOfCourse = async(courseId , token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" ,GET_FULL_COURSE_DETAILS_AUTHENTICATED  , {courseId} , {
            Authorization : `Bearer ${token}`
        })
        console.log("Course full details  api response "  , response)
        if(!response?.data?.success){
            throw new Error("Could not fetch full details")
        }
        result = response?.data?.data
    }
    catch(error){
        console.log("Course full details api error " , error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


export const markLectureAsComplete = async(data , token) => {
    let result = null 
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , LECTURE_COMPLETION_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("Complete lecture api response" , response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Lecture completed")
        result = true
    }
    catch(error){
        console.log(error)
        result=false
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result


}

export const createRating = async(data , token) => {
    const toastId = toast.loading("Loading...")
    let result =  false;
    try{
        const response = await apiConnector("POST" , CREATE_RATING_API , data , {
            Authorization : `Bearer ${token}`
        })
        console.log("Create rating api response" , response)
        if(!response?.data?.success){
            throw new Error("Could not create rating")
        }
        toast.success("Rating created")
        result = true
    }
    catch(error){
        console.log(error)
        result = false
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


