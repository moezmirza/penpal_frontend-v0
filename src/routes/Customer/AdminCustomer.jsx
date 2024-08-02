import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { usePut } from "../../api/usePut";
import { usePost } from "../../api/usePost";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { basicInfoFieldLabelMap } from "../../utils/sharedState";
import ContactInfo from "../../components/ContactInfo";

function AdminCustomer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const get = useGet();
  const post = usePost();
  const put = usePut();
  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const { success, data, error } = await get(
        `/admin/update?approved=${false}&id=${id}`
      );
      if (success) {
        console.log("customer data", data[0]);
        setCustomer(data[0]);

        setLoading(false);
      } else {
        setLoading(false);
        setError("");
        console.log("error here", error);
      }
    };
    fetchCustomer();
  }, []);

  const handleApprovalUpdate = async (e, status, cid) => {
    e.target.innerText = "Approved";
    e.target.disabled = true;

    put(`/admin/approve-update?id=${cid}`).then((response) => {
      const { success, data, error } = response;
      if (success) {
        navigate("/admin/approve-updates");
        console.log("Approval update successful:", data);
      } else {
        console.error("Error approving customer:", error);
      }
    });
  };

  const basicInfoDisplayFields = [
    "inmateNumber",
    "mailingAddress",
    "zipcode",
    "dateOfBirth",
    "height",
    "weight",
    "hairColor",
    "eyeColor",
    "spokenLanguages",
    "institutionalEmailProvider",
    "referredBy",
    "religiousPref",
    "education",
    "nameOfCollege",
    "bodyType",
    "astrologicalSign",
    "relationShipStatus",
    "veteranStatus",
  ];

  const updatedFields = customer?.updatedFields || [];
  return (
    <div className="bg-c-basic min-h-screen px-3 md:px-0 py-12">
      <div className="flex flex-col items-center gap-y-12 w-full md:w-8/12 mx-auto">
        <div
          id="profile-details"
          className={`bg-white w-full border rounded-lg flex flex-col gap-y-4 p-6`}
        >
          <LoadingSpinner isLoading={loading} />
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row md:items-start gap-x-12 relative">
              <div>
                <img
                  src={customer?.photos?.imageUrl || "/assets/default.jpg"}
                  alt=""
                  className="h-80 w-full md:h-44 md:w-44 rounded"
                />
                {updatedFields?.includes("imageUrl") && (
                  <span className="font-normal text-xs text-green-500">
                    new
                  </span>
                )}
              </div>

              <div className="flex flex-col justify-center gap-1 md:w-7/12 w-full mb-6 md:mb-0">
                <div>
                  <p className="font-semibold text-3xl mb-2 md:mb-1 text-center md:text-left">
                    {customer?.basicInfo?.firstName}{" "}
                    {customer?.basicInfo?.lastName}{" "}
                    {(updatedFields?.includes("firstName") ||
                      updatedFields?.includes("lastName")) && (
                      <span className="font-normal text-xs text-green-500 ml-2">
                        new
                      </span>
                    )}
                  </p>

                  <div className="flex gap-3 justify-center md:justify-start flex-wrap ">
                    <p className="text-nowrap">
                      {customer?.basicInfo?.age || "N/A"} yrs{" "}
                      {updatedFields?.includes("age") && (
                        <span className="font-normal text-xs text-green-500 ml-2">
                          new
                        </span>
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.gender || "N/A"}
                      {updatedFields?.includes("gender") && (
                        <span className="font-normal text-xs text-green-500 ml-2">
                          new
                        </span>
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.orientation || "N/A"}
                      {updatedFields?.includes("orientation") && (
                        <span className="font-normal text-xs text-green-500 ml-2">
                          new
                        </span>
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.race || "N/A"}
                      {updatedFields?.includes("race") && (
                        <span className="font-normal text-xs text-green-500 ml-2">
                          new
                        </span>
                      )}
                    </p>
                    <span className="flex gap-x-1 items-baseline">
                      <img
                        src="/assets/icons/star.svg"
                        alt=""
                        className="h-4"
                      />{" "}
                      {customer?.basicInfo?.rating || 0}
                    </span>
                    <p className="underline text-nowrap">
                      {customer?.basicInfo?.numRatings || 0} Reviews
                    </p>
                  </div>
                </div>

                <p className="flex flex-col items-start mt-6 ">
                  {updatedFields?.includes("bio") && (
                    <span className="font-normal text-xs text-green-500">
                      new
                    </span>
                  )}
                  {customer?.basicInfo?.bio || (
                    <p className="italic text-gray-500 text-center w-full md:text-left">
                      No bio added
                    </p>
                  )}
                </p>
              </div>
              {/* <div className="flex flex-col items-center ">
                <button
                  type="button"
                  className="flex items-center justify-center  mx-auto border text-white text w-full py-2.5 px-3 bg-green-600 rounded-xl hover:opacity-90 text-nowrap"
                  onClick={(e) => handleApprovalUpdate(e, true, customer._id)}
                >
                  Approve
                </button>
                <button
                  type="button"
                  className="mt-4 border text-black text-nowrap w-full py-2.5 px-3  border-fr-blue-200 rounded-xl hover:opacity-90"
                  onClick={() =>
                    (window.location.href = mailTOLink(
                      customer?.basicInfo?.email,
                      customer.firstName
                    ))
                  }
                >
                  Contact Inmate
                </button>
              </div> */}
            </div>

            <div>
              <h2 className="font-semibold text-3xl md:text-2xl my-4 underline">
                Basic Info
              </h2>

              <div className="grid md:grid-cols-2  grid-cols-1  gap-4">
                {customer &&
                  basicInfoDisplayFields.map((field) => {
                    return (
                      customer?.basicInfo[field] &&
                      (field == "spokenLanguages" ? (
                        <p className="flex flex-wrap items-end">
                          <span className="font-semibold mr-1 text-lg">
                            {basicInfoFieldLabelMap[field]}:
                          </span>
                          {customer?.basicInfo[field].map((lang) => (
                            <span className="mr-1">{lang}</span>
                          ))}
                        </p>
                      ) : (
                        <p className="">
                          <span className="font-semibold mr-1 text-lg">
                            {basicInfoFieldLabelMap[field]}:
                          </span>
                          {field == "dateOfBirth"
                            ? customer?.basicInfo[field].split("T")[0]
                            : customer?.basicInfo[field]}
                          {updatedFields.includes(field) && (
                            <span className="text-xs text-green-500 ml-2">
                              new
                            </span>
                          )}
                        </p>
                      ))
                    );
                  })}
              </div>
            </div>
            <div className="flex flex-col gap-y-10">
              <div>
                <h2 className="font-semibold text-3xl md:text-2xl my-4 flex items-end">
                  <p className="underline">Personality Info</p>
                  {/* {updatedFields?.includes("personality") && (
                    <span className="font-normal text-xs text-green-500 ml-2">
                      new
                    </span>
                  )} */}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {Object.keys(customer?.personalityInfo || []).map(
                    (key) =>
                      key != "_id" && (
                        <div key={key}>
                          <p className="font-semibold text-lg ">
                            {key.toUpperCase()}{" "}
                            {updatedFields.includes(key) && (
                              <span className="text-xs text-green-500 ml-2">
                                new
                              </span>
                            )}
                          </p>
                          <ul className="">
                            {customer?.personalityInfo[key].map((value) => (
                              <li className="text-nowrap" key={value}>
                                {value}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ContactInfo
          firstName={customer?.basicInfo?.firstName}
          lastName={customer?.basicInfo?.lastName}
          inmateNumber={customer?.basicInfo?.inmateNumber}
          emailProvider={customer?.basicInfo?.institutionalEmailProvider}
          mailingAddress={customer?.basicInfo?.mailingAddress}
        />
      </div>
    </div>
  );
}

export default AdminCustomer;
