import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePost } from "../../api/usePost";

const PaypalCheckout = ({ cid, paymentDetails }) => {
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()
    const [orderID, setOrderID] = useState(false);

    console.log("paymentdetails", paymentDetails)
    const post = usePost()
    const createOrder = async (data, actions) => {
        const { success, error } = await post(
            `/payment/create-checkout-session?provider=paypal`,
            {
                cid,
                ...paymentDetails,
            }
        );
        if (error) {
            alert("An unexpected error occurred! Please try again later.");
        }
    };


    // // check Approval
    const onApprove = (data, actions) => {
        const { success, error } = post(
            `/payment/capture-paypal?orderId=${data.orderID}`
        );
        if (error) {
            alert("An unexpected error occurred! Please try again later.");
        }
    };

    //capture likely error
    const onError = (data, actions) => {
        alert("An unexpected error occurred! Please try again later.");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    }, [success]);

    return isPending ?
        <LoadingSpinner />
        :
        <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
}


export default PaypalCheckout