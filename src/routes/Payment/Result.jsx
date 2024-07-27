import { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { Navigate, useNavigate } from "react-router-dom";

function Result() {
  const [status, setStatus] = useState(null);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const sessionId = urlParams.get("session_id");
  const get = useGet();
  const navigate = useNavigate();
  console.log("result page");

  useEffect(() => {
    const fetchPaymentResult = async () => {
      const { data, success, error } = await get(
        `/payment/session-status?session_id=${sessionId}`
      );
      if (success) {
        console.log("finalData", data);
        setStatus(data.status);
      } else {
        setStatus("open");
      }
      const tid = setTimeout(() => {
        navigate("/subcriptions");
      }, [3000]);
      return () => clearTimeout(tid);
    };

    if (sessionId) {
      fetchPaymentResult();
    }
  }, []);

  if (status === "open") {
    return (
      <section
        id="success"
        className="flex flex-col items-center my-24 gap-y-6 mx-6"
      >
        <p className="text-base md:text-xl text-center">
          Your payment was unsuccessful. We couldn't process it at the moment :(
        </p>
        <button className="bg-red-600 text-white py-2 px-4 rounded text-base md:text-xl">
          Try Again Later
        </button>
      </section>
    );
  }

  if (status === "complete") {
    return (
      <section
        id="success"
        className="flex flex-col items-center my-24 gap-y-6 mx-6"
      >
        <p className="text-base md:text-xl text-center">
          Thank you for your corporeation! Your payment was successful.
        </p>
        <button className="bg-green-600 text-white py-2 px-4 rounded text-base md:text-xl">
          Hurry!
        </button>
      </section>
    );
  }
}

export default Result;
