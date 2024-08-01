import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { baseUrl } from "../../utils/authCodeMap";
import { usePost } from "../../api/usePost";
import { LoadingSpinner } from "../../components/LoadingSpinner";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.w
// This is your test secret API key.
const stripePromise = loadStripe(
  "pk_test_51PgWq2Euyj8xye751S0KM3U2HKAM0aKKCO1sgNePM9n0N22CMLvzOgGjReo4ikEcqIhqL9j6f0VRtdlELPP7Ht1q00PMKpRLgM"
);
const productName = "year_profile";

const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState("");
  const post = usePost();
  const { state } = useLocation();
  const cid = state?.cid;
  console.log("state", state)
  const paymentDetails = state?.paymentDetails;
  useEffect(() => {
    const fetchClientSecret = async () => {
      const { success, data, error } = await post(
        "/payment/create-checkout-session",
        {
          cid,
          ...paymentDetails,
        }
      );
      console.log("success", success, "data", data);
      if (success) {
        setClientSecret(data.clientSecret);
      }
    };
    fetchClientSecret();
  }, []);

  const options = { clientSecret };

  if (!clientSecret)
    return (
      <div className="relative h-screen">
        <LoadingSpinner isLoading={true} />
      </div>
    );

  return (
    <div id="checkout" className="mt-24">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
