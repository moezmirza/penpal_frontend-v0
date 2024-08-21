import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { mailTOLink } from "../User/FindPal/FindPal";
import CustomerCard from "../../components/CustomerCard";

function FindUserCustomers({ endpoint }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const get = useGet();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      const { success, data, error } = await get(`/user${endpoint}`);
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
  return (
    <div className="flex flex-col gap-y-6  items-center justify-between  px-4 md:px-0 relative w-full">
      {/* <h1 className="text-4xl font-bold underline">Favorite Inmates</h1>{" "} */}
      <LoadingSpinner isLoading={loading} />
      {customers.length == 0 && !loading ? (
        <p className="text-center">{"No profiles to display"}</p>
      ) : (
        <div className="flex flex-col gap-y-6 w-full xl:w-10/12 md:px-8 ">
          {customers.map((customer, index) => (
            <CustomerCard
              customer={customer}
              key={index}
              onViewDetails={() => navigate(`/inmate/${customer._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}


export default FindUserCustomers;
