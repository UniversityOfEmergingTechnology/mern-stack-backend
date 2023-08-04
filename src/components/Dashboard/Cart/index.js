import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Payment/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NQqYfSBWpjG3pGK5fSz0iF6QBLnFqrFGkD0WadxLGTq7WShQorIDeqP5iIHyna5oBmciTwK9UbyTYPrCoE75hCN00wXnbz7vp"
);

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({});
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      {clientSecret === "" ? (
        <>
          <h1 className="mb-14 text-3xl font-medium text-darkblue font-walsheim">
            Cart
          </h1>
          <p className="border-b border-b-richblack-400 font-walsheimReg pb-2 font-semibold text-richblack-400">
            {totalItems} Courses in Cart
          </p>

          {total > 0 ? (
            <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
              <RenderCartCourses />
              <RenderTotalAmount
                setClientSecret={setClientSecret}
                setFormData={setFormData}
              />
            </div>
          ) : (
            <p className="mt-14 text-center text-3xl font-walsheimCon text-richblack-100">
              Your cart is empty
            </p>
          )}
        </>
      ) : (
        <div className="App">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              formData={formData}
              token={token}
              dispatch={dispatch}
              navigate={navigate}
            />
          </Elements>
        </div>
      )}
    </>
  );
}
