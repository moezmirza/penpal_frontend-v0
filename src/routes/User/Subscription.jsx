import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

function Subscription() {
  const get = useGet();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPendingPayments = async () => {
      setLoading(true);
      const { success, data, error } = await get("/user/pending-payments");
      if (success) {
        setCustomers(data);
        console.log("success", data);
      }
      setLoading(false);
    };
    fetchPendingPayments();
  }, []);

  const headerList = [
    "Customer",
    "Email",
    "Status",
    "Creation",
    "Renewal",
    "Updation",
    "Total",
    "Actions",
  ];
  const chargesMap = {
    creation: "$99.95",
    renewal: "$79.95",
    update: "$9.95",
  };
  const colorMap = {
    new: "bg-green-600",
    expired: "bg-red-400",
    active: "bg-green-600",
  };

  return (
    <div className="h-screen flex flex-col  items-center gap-y-10 mt-10">
      <h1 className="text-start md:text-4xl text-2xl underline font-bold ">
        Pending Payments
      </h1>
      <div className="w-11/12 md:10/12 h-full overflow-auto max-h-[80%] max-w-[100%] ">
        <table className="w-full text-sm md:text-base ">
          <thead className="bg-gray-200 ">
            <tr className="">
              {headerList.map((header) => (
                <td className="py-3 px-4" key={header}>
                  {header}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="">
            {customers?.map((customer, index) => {
              return (
                <tr className="mt-2" key={index}>
                  <td className="px-4 py-5">
                    <div className="flex items-center gap-x-3">
                      <img
                        src={customer?.imageUrl || "/assets/default.jpg"}
                        alt=""
                        className="h-10 w-10 rounded-full hidden md:block"
                      />
                      <a
                        href={`/inmate/${customer._id}`}
                        className="hover:underline cursor-pointer text-nowrap"
                      >
                        {customer?.firstName} {customer?.lastName}
                      </a>
                    </div>
                  </td>
                  <td className="px-4  py-5 w-1/5">{customer?.email}</td>
                  <td className={`px-4  py-5 `}>
                    <button
                      className={`${
                        colorMap[customer.status]
                      } px-3 py-1 rounded-xl text-white `}
                    >
                      {customer?.status}
                    </button>
                  </td>
                  <td className="px-4  py-5">
                    {customer?.pendingPayments?.creation
                      ? chargesMap["creation"]
                      : "$0"}
                  </td>
                  <td className="px-4  py-5">
                    {" "}
                    {customer?.pendingPayments?.renewal
                      ? chargesMap["renewal"]
                      : "$0"}
                  </td>
                  <td className="px-4  py-5">
                    {" "}
                    {customer?.pendingPayments?.update
                      ? chargesMap["update"]
                      : "$0"}
                  </td>
                  <td className="px-4  py-5">
                    {customer?.pendingPayments?.totalAmount}
                  </td>
                  <td className="pl-2  py-5 text-nowrap">
                    <button
                      onClick={() =>
                        navigate("/payment", {
                          state: {
                            cid: customer?._id,
                            paymentsDetails: {
                              creation: customer?.pendingPayments?.creation,
                              renewal: customer?.pendingPayments?.renewal,
                              update: customer?.pendingPayments?.update,
                              totalAmount:
                                customer?.pendingPayments?.totalAmount,
                            },
                          },
                        })
                      }
                      className="text-white bg-green-500 rounded-lg p-2 md:p-3"
                    >
                      Pay now
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <div id="table" className="mt-6 h-full">
          <div
            id="header"
            className={`grid grid-cols-8 gap-x-12 bg-gray-200 p-3  rounded-lg`}
          >
            {headerList.map((header) => (
              <p>{header}</p>
            ))}
          </div>
          <div
            id="body"
            className={` gap-y-6  mt-2 p-3 min-h-[60%] max-h-[60%] overflow-y-auto relative`}
          >
            <LoadingSpinner isLoading={loading} />
            {customers.length == 0 && !loading && (
              <p>no pending payments found!</p>
            )}
            {customers.map((customer) => (
              <div className="grid grid-cols-8 gap-x-16">
                <div className="flex">
                  <img
                    src={customer?.imageUrl || "/assets/default.jpg"}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  {customer?.firstName} {customer?.lastName}
                </div>
                <p>{customer?.email}</p>
                <p>{customer?.status || "active"}</p>
                <p>{customer?.creationPaymentPending && "$99"}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Subscription;
