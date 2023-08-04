import {toast} from 'react-hot-toast'
import {setLoading , setUser} from '../../slices/ProfileSlice'
import {apiConnector} from '../apiconnector'
import {profileEndpoints}  from '../apis'
import {logout} from './AuthApi'

const {GET_USER_DETAILS_API , GET_USER_ENROLLED_COURSES  , GET_INSTRUCTOR_DATA_API} = profileEndpoints


export function getUserDetails (token , navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("GET" , GET_USER_DETAILS_API , null , {
                Authorization : `Bearer ${token}`
            })
            console.log("GET_USER_DETAILS_API_RESPONSE" , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setUser({...response.data.data}))
        }
        catch(error){
            console.log(error)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET" , GET_USER_ENROLLED_COURSES , null ,
        {
            Authorization : `Bearer ${token}`
        })
        console.log("Get user enrolled courses api ", response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        result = response.data.data
    }
    catch(error){
        console.log(error)
        toast.error("Could not get enrolled courses")
    }
    toast.dismiss(toastId)
    return result
}


export async function getInstructorData(token){
    const toastId = toast.loading("Loading...")
    let result = []

    try{
        const response = await apiConnector("GET" , GET_INSTRUCTOR_DATA_API , null , {
            Authorization : `Bearer ${token}`
        })
        result = response?.data?.course
        toast.success("Fetched Information")
    }
    catch(error){
        console.log(error)
        toast.error("Could not get instructor details")
    }
    toast.dismiss(toastId)
    return result
}