import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePut } from "../../api/usePut";
import ConfrimPopup from "../../components/ConfrimPopup";
import CustomerCard from "../../components/CustomerCard";

function ApproveProfiles() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const clientId = useRef();
  const inputRef = useRef();
  const get = useGet();
  const put = usePut();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/customer?approved=${false}`
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

  const handleProfileApproval = async (status, cid) => {
    setShowPopup(true);
    clientId.current = cid;
  };

  const approveProfile = () => {
    setCustomers((customers) =>
      customers.filter((customer) => customer._id != clientId?.current)
    );
    setShowPopup(false);
    put(`/admin/approve-customer?id=${clientId?.current}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
      clientId.current = null;
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const includesCaseInsensitive = (str, substring) => {
    return str?.toLowerCase().includes(substring.toLowerCase());
  };

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );
  console.log("filteredCustomers", filteredCustomers);
  return (
    <div className="flex flex-col items-center gap-y-12 relative mt-6  mx-auto">
      <LoadingSpinner isLoading={loading} />
      {showPopup && (
        <ConfrimPopup
          onCloseClick={setShowPopup}
          onConfirm={approveProfile}
          confirmBtnTxt={"Confirm approval"}
          infoText={"It will approve profile"}
        />
      )}
      <h1 className="md:text-3xl text-2xl font-bold underline">
        Approve Profiles
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:w-9/12 w-11/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="text-nowrap text-xl mr-auto">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      {customers?.length == 0 && !loading ? (
        <p className="text-center">There are no more profiles to approve </p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 px-4 md:px-8  ">

          {filteredCustomers?.map((customer) => (
            <CustomerCard
              customer={customer}
              onProfileApproval={handleProfileApproval}
              onViewDetails={() =>
                navigate(`/admin/inmate/${customer?._id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default ApproveProfiles;
