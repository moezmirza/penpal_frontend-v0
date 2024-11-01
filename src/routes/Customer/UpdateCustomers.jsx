import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { includesCaseInsensitive } from "../Admin/ApproveUpdates";
import CustomerCard from "../../components/CustomerCard";
import PageHeader from "../../components/PageHeader";
import { nextPageNumber, itemsPerPage } from "../../utils/config";
import Paynow from "../Payment/PaymentPopup";
import { usePost } from "../../api/usePost";
import { useDispatch } from "react-redux";
import { AuthContext } from "../../providers/AuthProvider";
import { setCurrentUser } from "../../state/slices/userSlice";

function UpdateCustomers() {
  const dispatch = useDispatch();

  const { updateAuthInfo } = useContext(AuthContext);

  const [customers, setCustomers] = useState([]);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const currentCustomer = useRef("")
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [loadMoreMsg, setLoadMoreMsg] = useState("");
  const [inputVal, setInputVal] = useState("");
  const inputRef = useRef();

  const get = useGet();
  const post = usePost();
  const navigate = useNavigate()

  const paymentDetails = {
    renewal: true,
    totalAmount: 79.95,
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/customer?p=0&l=${itemsPerPage}`
      );
      if (success) {
        setLoading(false);
        setCustomers(data);

        console.log("data", data);
      } else {
        setLoading(false);

        console.log("error", error);
      }
    };
    fetchCustomers();
  }, []);
  const handleFetchMoreCustomers = () => {
    // if (user?.profileComplete) {
    //  page start from zero
    const page = nextPageNumber(customers.length)
    const fetchMoreCustomers = async () => {
      setIsLoadingMore(true);
      const { success, data, error } = await get(
        `/customer?p=${page}&l=${itemsPerPage}`
      );
      if (success) {
        setIsLoadingMore(false);
        if (data.length == 0) {
          setLoadMoreMsg("No more profiles found.");
        }
        console.log("more customers data", data);
        setCustomers([...customers, ...data]);
      } else {
        setLoadMoreMsg("Error loading matches");
        setIsLoadingMore(false);
      }
    };
    fetchMoreCustomers();
    // } else {
    //   setViewMorePopup(true);
    // }
  };
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );

  const handleRenew = (cid) => {
    currentCustomer.current = cid
    setShowPaymentOptions(true)
  }

  const handleStripePay = () => {
    navigate(`/payment`, {
      state: {
        cid: currentCustomer.current,
        paymentDetails
      },
    })
  }

  const handleReferralPay = async () => {
    try {
      console.log('currentCustomer.current', currentCustomer.current)
      const { success, data, error } = await post(
        "/payment/pay-with-referral",
        {
          cid: currentCustomer.current,
          ...paymentDetails,
        }
      );
      if (success) {
        setShowPaymentOptions(false);

        const token = localStorage.getItem("token");
        const authInfo = {
          token: token,
          userAuth: true,
        };
        let { success, data, error } = await get("/user", authInfo.token);
        console.log(success, "UserData", data);
        if (success) {
          dispatch(setCurrentUser(data));
        } else {
          console.log("error while getting user creds");
        }
        updateAuthInfo(authInfo);
        setTimeout(() => {
          navigate(`/update-inmates`);
        }, 1000);

        navigate(`/update-inmates`);

      }
    } catch(err) {
      console.log('err', err);
    }
  };


  return (
    <div className="flex flex-col gap-y-6  mb-32 items-center justify-between  relative w-full">
      <PageHeader title="Update/Renew Profiles"
        inputVal={inputVal}
        onInputVal={setInputVal}
        inputRef={inputRef}
        customersLength={filteredCustomers.length} />
      <LoadingSpinner isLoading={loading} />

      {showPaymentOptions &&
        <Paynow id={currentCustomer.current} onReferralPay={handleReferralPay} duesInfo={{ "renewal": true }} onStripePay={handleStripePay} onClosePopup={() =>
          setShowPaymentOptions(false)
        } />
      }
      {filteredCustomers.length == 0 && !loading ? (
        <p className="text-center text-sm md:text-base">
          No profiles to display
        </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 px-4 md:px-8">
          {filteredCustomers.map((customer, index) => (
            <CustomerCard
              key={index}
              customer={customer}
              onUpdate={() => navigate(`/update-inmate/${customer?._id}`)}
              onRenew={() => handleRenew(customer?._id)}
              showExpiresAt={true}
            />
          ))}
        </div>
      )}
      {isLoadingMore ? (
        <p className="text-center">Loading...</p>
      ) : loadMoreMsg ? (
        <div className="text-center ">{loadMoreMsg}</div>
      ) : (
        !loading &&
        <button
          type="button"
          className="mx-auto mt-4 border text-white px-4 md:px-5 py-2 md:py-3 bg-fr-blue-100 rounded-xl hover:opacity-90"
          onClick={handleFetchMoreCustomers}
        >
          View more
        </button>

      )}
    </div>
  );
}

export default UpdateCustomers;
