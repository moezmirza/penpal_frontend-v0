import React, { useState, useEffect, useRef } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePost } from "../../api/usePost";
import { calculateTotalCost } from "../../utils/sharedMethods";

const PaypalCheckout = ({ id, paymentDetails }) => {
    const [success, setSuccess] = useState(false);
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()
    const [orderID, setOrderID] = useState(false);
    const post = usePost()
    const paymentDetailsRef = useRef(paymentDetails);
    paymentDetailsRef.current = paymentDetails; // Keep ref
    console.log("paymentdetails paypal", "cid", id, paymentDetails)

    const createOrder = async (data, actions) => {
        const { success, data: result, error } = await post(
            `/payment/create-checkout-session?provider=paypal`,
            {
                id,
                ...paymentDetailsRef.current,
            }
        );
        const orderId = result.order.id
        setOrderID(orderId)
        return orderId
    };


    const onApprove = (data, actions) => {
        const { success, error } = post(
            `/payment/capture-paypal?orderId=${orderID}`
        );
        if (error) {
            console.log('Error capturing order:', error);
            alert("An unexpected error occurred! Please try again later.");
        }
    };

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

    const total = calculateTotalCost(paymentDetails)

    return isPending ?
        <LoadingSpinner />
        :
        <PayPalButtons
            disabled={total == 0}
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={onError}
        />
}


export default PaypalCheckout