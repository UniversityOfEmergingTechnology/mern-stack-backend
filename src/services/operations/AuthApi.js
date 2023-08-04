import {apiConnector} from '../apiconnector'
import { endpoints } from '../apis'
import {setLoading , setToken} from '../../slices/AuthSlice'
import {toast} from 'react-hot-toast'
import { setUser} from '../../slices/ProfileSlice'

const {
    SENDOTP_API,
    SIGNUP_API ,
    LOGIN_API,
    RESETPASSTOKEN_API ,
    RESETPASSWORD_API 
} = endpoints;

export function sendOtp (email , navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , SENDOTP_API , {
                email
            })
            console.log("SendOtp Api repsonse ...." , response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Succesfully")
            navigate('/verify-email')
        }
        catch(error){
            console.log("Send otp api error ...." , error)
            toast.error("Could Not Send Otp")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signup(
        accountType,
        firstName ,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate    
    ){
    return async(dispatch) => {
        const toastId = toast.loading('Loading...')
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , SIGNUP_API ,{
                accountType,
                firstName ,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            })
            console.log("Signup api repsonse ...." , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Signup Successfull")
            navigate('/login')
        }
        catch(error){
            console.log("Signup api error ...." , error)
            toast.error("Signup failed")
            navigate('/signup')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email , password , navigate){
    return async(dispatch) => {
        const toastId = toast.loading('Loading....')
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , LOGIN_API , {
                email , 
                password
            })

            console.log("LOGIN API RESPONSE ...." , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successfull")
            dispatch(setToken(response.data.token))
            dispatch(setUser({...response.data.user}))
            localStorage.setItem("token" , JSON.stringify(response.data.token))
            localStorage.setItem("user" , JSON.stringify(response.data.user))
            navigate('/dashboard/my-profile')
        }
        catch(error){
            console.log("Login api error ... " , error)
            toast.error("Login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null))
        localStorage.removeItem('token')
        toast.success("Logged Out")
        navigate('/')
    }
}

export function getPasswordResetToken(email , setEmailSent) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , RESETPASSTOKEN_API,{
                email
            })
            console.log("Reset password token api ....  " , response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
        }
        catch(error){
            console.log("Reset password token error ..." , error)
            toast.error("Failed to send email for resetting password")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(password , confirmPassword , token ,navigate){
    return async(dispatch) => {
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST" , RESETPASSWORD_API , {
                password , 
                confirmPassword ,
                token
            })
            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset succesfully")
            navigate('/login')
        }
        catch(error){
            console.log("Reset password Api error ..." , error)
            toast.error("Unable to reset password")
        }
        dispatch(setLoading(false))
    }
}