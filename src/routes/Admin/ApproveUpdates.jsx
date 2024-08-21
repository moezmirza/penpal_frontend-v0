import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { usePut } from "../../api/usePut";
import ConfrimPopup from "../../components/ConfrimPopup";
import CustomerCard from "../../components/CustomerCard";

export const includesCaseInsensitive = (str, substring) => {
  return str?.toLowerCase().includes(substring.toLowerCase());
};
function ApproveUpdates() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const clientId = useRef();
  const inputRef = useRef();
  const get = useGet();
  const put = usePut();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/update?approved=${false}`
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

  const handleUpdate = (approve, cid) => {
    if (approve) {
      setShowApprovePopup(true);
    } else {
      setShowRejectPopup(true);
    }
    clientId.current = cid;
  };

  const approveProfile = () => {
    setCustomers((customers) =>
      customers.filter((customer) => customer._id != clientId?.current)
    );
    setShowApprovePopup(false);
    put(`/admin/approve-update?id=${clientId?.current}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving update", error);
      }
      clientId.current = null;
    });
  };

  const rejectProfile = () => {
    setCustomers((customers) =>
      customers.filter((customer) => customer._id != clientId?.current)
    );
    setShowRejectPopup(false);
    put(`/admin/reject-update?id=${clientId?.current}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        console.log(" Reject update successful:", data);
      } else {
        console.error("Error rejecting update", error);
      }
      clientId.current = null;
    });
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredCustomers = customers?.filter(
    (customer) =>
      includesCaseInsensitive(customer?.basicInfo?.firstName, inputVal) ||
      includesCaseInsensitive(customer?.basicInfo?.lastName, inputVal)
  );
  return (
    <div className="flex flex-col items-center gap-y-12 relative mt-6 w-full mx-auto">
      <LoadingSpinner isLoading={loading} />
      {showApprovePopup && (
        <ConfrimPopup
          onCloseClick={setShowApprovePopup}
          onConfirm={approveProfile}
          confirmBtnTxt={"Confirm approval"}
          infoText={"It will approve the profile's update"}
        />
      )}
      {showRejectPopup && (
        <ConfrimPopup
          onCloseClick={setShowRejectPopup}
          onConfirm={rejectProfile}
          confirmBtnTxt={"Confirm rejection"}
          infoText={"It will reject the profile's update"}
          confirmBtnColor="red"
        />
      )}
      <h1 className="text-2xl md:text-3xl font-bold underline">
        Approve Updates
      </h1>
      <div className="flex flex-col md:flex-row gap-6  md:w-9/12  w-11/12 items-center">
        <input
          className="bg-transparent block w-full mt-1 rounded-md p-2 border border-gray-400 outline-none focus:border-gray-700 "
          placeholder={"Search customer..."}
          value={inputVal}
          ref={inputRef}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <p className="text-nowrap text-xl mr-auto md:m-0">
          Total: {filteredCustomers?.length}
        </p>
      </div>
      {customers?.length == 0 && !loading ? (
        <p className="text-center">There are no more updates to approve</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 px-4 md:px-8  ">

          {filteredCustomers?.map((customer) => (
            <CustomerCard
              customer={customer}
              onUpdateApproval={handleUpdate}
              onViewUpdate={() =>
                navigate(`/admin/inmate-updates/${customer._id}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ApproveUpdates;
