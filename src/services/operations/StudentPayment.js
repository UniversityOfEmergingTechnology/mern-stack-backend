import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import {setPaymentLoading} from '../../slices/courseSlice'
import {resetCart} from '../../slices/cartSlice'

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

export async function buyCourse(token, courses) {
  const toastId = toast.loading("Loading...");
  var orderResponse;
  try {
    orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("Print order response ", orderResponse);
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    toast.dismiss(toastId);

    const response = {
      orderId: orderResponse.data.orderId,
      paymentId: orderResponse.data.paymentId,
      clientSecret: orderResponse.data.clientSecret,
      courses: courses,
      amount: orderResponse.data.amount,
    };
    return response;
  } catch (error) {
    if (
      error.response.data.message === "This is a Protected Route for Students"
    ) {
      toast.error("Instructor cannot buy courses");
    }
    console.log("Payment api error", error);
    toast.dismiss(toastId);
    toast.error("Could not make payment");
  }
}

export async function sendPaymentSuccessEmail(response, token) {
  const { orderId, paymentId, amount } = response;

  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId,
        paymentId,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("Payment success email error" , error)

  }
}

export async function verifyPayment (bodyData , token, navigate ,dispatch){
    const toastId = toast.loading("Loading....")
    dispatch(setPaymentLoading(true))
    try{
        const response = await apiConnector("POST" , COURSE_VERIFY_API , bodyData , {
            Authorization: `Bearer ${token}`,
        })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Payment successfull, you are added to the course")
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart())
    }
    catch(error){
        console.log("Payment verify error ..." , error)
        toast.error("Could not verify payment")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}
