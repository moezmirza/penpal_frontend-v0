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
        const { success, data:postData,error } = await post(
            `/payment/create-checkout-session?provider=paypal`,
            {
                cid,
                ...paymentDetails,
            }
        );

        const orderData = success ? postData.order : null;
        console.log("orderData", orderData, postData, success)

        if(orderData.id){
            console.log('Order created successfully. Order ID:', orderData.id);
            return orderData.id;
        }
        if (error) {
            console.log('Error creating order:', error);
            alert("An unexpected error occurred! Please try again later.");
        }
    };


    // // check Approval
    const onApprove = async (data, actions) => {
        const { success, data:postData, error } = await post(
            `/payment/capture-paypal?orderId=${data.orderID}`
        );
        if (error) {
            console.log('Error capturing order:', error);
            alert("An unexpected error occurred! Please try again later.");
        }
    };

    //capture likely error
    const onError = (data, actions) => {
        console.log('Error onError:', data);
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