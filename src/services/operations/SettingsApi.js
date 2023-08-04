import { toast } from "react-hot-toast";
import { setUser } from "../../slices/ProfileSlice";
import { apiConnector } from "../apiconnector";

import { settingEndpoints } from "../apis";
import { logout } from "./AuthApi";

const {
  UPDATE_DISPLAY_PROFILE_PICTURE_API,
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
  DELETE_PROFILE_API,
} = settingEndpoints;

export function updateDisplayPicture(token, formData) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PROFILE_PICTURE_API,
        formData,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Update display picture api response" , response)
      if(!response.data.success){
        throw new Error(response.data.message)
      }
      toast.success("Display Picture Updated successfully")
      
      dispatch(setUser(response.data.data))
      localStorage.setItem("user" , JSON.stringify(response.data.data))
    } catch (error) {
      console.log(error);
      toast.error("Could not update display picture")
    }
    toast.dismiss(toastId)
  };
}


export function updateProfile(token , formData){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        try{
            const response = await apiConnector("PUT" , UPDATE_PROFILE_API , formData , {
                Authorization : `Bearer ${token}`
            })
            console.log("Update profile api response" , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            dispatch(setUser({...response.data.updatedUserDetails}))
            localStorage.setItem('user' , JSON.stringify(response.data.updatedUserDetails))
            toast.success("Profile updated successfully")
        }
        catch(error){
            console.log(error)
            toast.error("Could not update profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token , formData){
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("POST" , CHANGE_PASSWORD_API , formData , {
            Authorization : `Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password Changed successfully")
    }
    catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(token , navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        try{
            const response = await apiConnector("DELETE" , DELETE_PROFILE_API , null , {
                Authorization : `Bearer ${token}`
            })
            console.log("Delete profile api " , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Profile deleted successfully")
            dispatch(logout(navigate))
        }
        catch(error){
            console.log(error)
            toast.error("Profile could not be deleted")
        }
        toast.dismiss(toastId)

    }
}