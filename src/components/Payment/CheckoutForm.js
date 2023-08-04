import { PaymentRequestButtonElement , CardElement , useStripe , useElements} from '@stripe/react-stripe-js'
import React, { useState , useEffect } from 'react'

import { verifyPayment , sendPaymentSuccessEmail } from '../../services/operations/StudentPayment'

const CheckoutForm = ({formData , token , dispatch , navigate}) => {

    const stripe = useStripe()
    const elements = useElements()

    const {clientSecret , amount} = formData


    const [email , setEmail] = useState("")
    const [paymentRequest , setPaymentRequest] = useState(null)
    const [isLoading , setIsLoading] = useState(false)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if(stripe){
            const pr = stripe.paymentRequest({
                country : 'US' ,
                currency : 'usd',
                total : {
                    label : "Total",
                    amount : amount
                },
                requestPayerName : true ,
                requestPayerEmail : true
            })
            pr.canMakePayment().then((result) => {
                if(result){
                    setPaymentRequest(pr)
                }
            })
        }
    },[stripe])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!stripe || !elements || !elements.getElement(CardElement)){
            return;
        }

        setIsLoading(true)
        const paymentMethodReq = await stripe.createPaymentMethod({
            type : "card" ,
            card : elements.getElement(CardElement),
            billing_details : {email}
        })
        if(paymentMethodReq.error){
            setMessage(paymentMethodReq.error.message)
            setIsLoading(false)
            return;
        }
        const {error , paymentIntent} = await stripe.confirmCardPayment(clientSecret ,{
            payment_method : paymentMethodReq.paymentMethod.id
        })

        if(error){
            setMessage(error.message)
        }
        else if(paymentIntent.status === "succeeded"){
            try{
                await verifyPayment(formData , token , navigate , dispatch)
                await sendPaymentSuccessEmail(formData , token)

            }
            catch(err){
                console.log(err)
            }
        }
        else{
            setMessage("Payment failed")
        }
        setIsLoading(false)
    }
    const CARD_ELEMENT_OPTIONS = {
        style : {
            base : {
                color : "#32325d",
                fontFamily :`"Helvetica Neue" , Helvetica , sans-serif`,
                fontSmoothing : "anitaliased",
                fontSize : "16px" ,
                '::placeholder' : {
                    color : '#aab7c4'
                },
            },
            invalid : {
                color : '#fa755a' ,
                iconColor : '#fa755a'
            }
        }
    }
  return (
    <div className='CheckoutForm'>
        <h1 className='text-darkblue text-[50px] font-walsheimCon'>Payment Gateway Using Stripe</h1>
            <form id='payment-form' onSubmit={handleSubmit}>
                <input type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email Address'
                />
                {
                    paymentRequest && (
                        <div>
                            <PaymentRequestButtonElement options={{paymentRequest}}/>
                            <p>Or pay with your credit card</p>
                        </div>
                    )
                }
                <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS}/>
                <button
                    disabled={isLoading || !stripe || !elements}
                    className='paymentButton'
                    id='submit'
                >
                    <span id='button-text'>
                        {
                            isLoading ? (
                                <div className='loader'></div>
                            )
                            :(
                                "Pay Now"
                            )
                        }
                    </span>
                </button>
                {message && <div id='payment-message'>{message}</div>}
            </form>
    </div>
  )
}

export default CheckoutForm