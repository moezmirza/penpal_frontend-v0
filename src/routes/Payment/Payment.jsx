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
// recreating the `Stripe` object on every render.
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
  const paymentDetails = state?.paymentsDetails;

  console.log("navigate data", paymentDetails);

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

  // const fetchClientSecret = useCallback(() => {
  //   // Create a Checkout Session
  //   return fetch(baseUrl + "", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${auth_token}`,
  //     },
  //     body: JSON.stringify({
  //       productName: productName,
  //       customerId,
  //       quantity: 1,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.clientSecret);
  // }, []);

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
// const Return = () => {
//   const [status, setStatus] = useState(null);
//   const [customerEmail, setCustomerEmail] = useState("");

//   useEffect(() => {
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const sessionId = urlParams.get("session_id");

//     fetch(`${BASE_URL}/payment/session-status?session_id=${sessionId}`, {
//       headers: {
//         Authorization: `Bearer ${auth_token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setStatus(data.status);
//         setCustomerEmail(data.customer_email);
//       });
//   }, []);

//   if (status === "open") {
//     return <Navigate to="/checkout" />;
//   }

//   if (status === "complete") {
//     return (
//       <section id="success">
//         <p>
//           We appreciate your business! A confirmation email will be sent to{" "}
//           {customerEmail}. If you have any questions, please email{" "}
//           <a href="mailto:orders@example.com">orders@example.com</a>.
//         </p>
//       </section>
//     );
//   }

//   return null;
// };
