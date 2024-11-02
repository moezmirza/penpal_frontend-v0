import React, { useEffect, useState, useContext, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../api/useGet";
import { usePut } from "../../api/usePut";
import { usePost } from "../../api/usePost";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import {
  basicInfoFieldLabelMap,
  capitlize,
  customerFieldValue
} from "../../utils/sharedState";
import ContactInfo from "../../components/ContactInfo";
import AssociatedUsersInfo from "../../components/AssociatedUsersInfo";
import Paynow from "../Payment/PaymentPopup";
import PurchaseTable from "../User/Table/PurchaseTable";
import AddPaymentPopup from "../../components/AddPaymentModal";
import { setCurrentUser } from "../../state/slices/userSlice";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch } from "react-redux";
const LIMIT = 10;

function Customer() {
  const dispatch = useDispatch();
  const { updateAuthInfo } = useContext(AuthContext);

  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [purchasePage, setPurchaesPage] = useState(1);
  const [totalPurchasePages, setTotalPurchaesPage] = useState(1);
  const [purchaseLoading, setPurchaeLoading] = useState(false);
  const [purchases, setPurchases] = useState(null);
  const [paymentPopup, setPaymentPopup] = useState(false);
  const currentCustomer = useRef("")

  const get = useGet();
  const post = usePost();
  const put = usePut();
  const { pathname: path } = useLocation()
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)


  const navigate = useNavigate();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") ?? "");
    const fetchPurchases = async () => {
      setPurchaeLoading(true);
      const { success, data, error, responseData } = await get(
        `/admin/payment-histories?page=${purchasePage}&limit=${LIMIT}&customer=${id}`
      );
      if (success) {
        setPurchaeLoading(false);
        setTotalPurchaesPage(responseData?.totalPages)
        setPurchases(data);

        console.log("data", data);
      } else {
        setPurchaeLoading(false);

        console.log("error", error);
      }
    };
    if(userData && userData?.role == "admin") {
      fetchPurchases();
    }
  }, [purchasePage]);

  const matchAdminUrlPattern = (url) => {
    const regex = /^\/admin\/inmate-updates\/.{24}$/;
    if (regex.test(url)) {
      return true
    }
    return false
  }


  const isUser = JSON.parse(localStorage.getItem("userAuth"));
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  const isAdminUpdateEndpoint = isAdmin && matchAdminUrlPattern(path)
  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      const fetchEndpoint = isAdminUpdateEndpoint ? `/admin/update?approved=${false}&id=${id}` : isAdmin ? `/admin/customer?id=${id}` : `/customer?id=${id}`
      const { success, data, error } = await get(fetchEndpoint);
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

  const handleRatingUpdate = async (rating) => {
    const { success, data, error } = await put(`/customer/rate?id=${id}`, {
      rating,
    });
    if (success) {
      console.log("rating data", data);
    } else {
      console.log("error updating rating", error);
    }
  };

  const handleFavouriteUpdate = async (e) => {
    const target =
      e.target.tagName === "IMG" ? e.target.parentElement : e.target;
    const buttonText = target.innerText; // or target.textContent
    console.log(buttonText);
    const newText =
      buttonText.trim() === "Add to Favorites"
        ? "Favorite"
        : "Add to Favorites";

    target.innerHTML =
      newText == "Favorite"
        ? `<img src="/assets/icons/bookmark.svg" alt="" class="h-6 mr-2" /> ${newText}`
        : newText;
    const { success, data, error } = await put(`/user/favorite?id=${id}`, {
      fav: buttonText === "Favorite" ? false : true,
    });
    if (success) {
      console.log("Favorite data", data);
    } else {
      console.log("error updating rating", error);
    }
  };
  const updateRoute = isAdmin ? `/admin/update-inmate/${id}` : `/update-inmate/${id}`
  const excludeBasinInfoFields = ["bio", "mailingAddress", "institutionalEmailProvider"]
  const updatedFields = customer?.updatedFields || [];

  const showUpdatedDetails = (field) => {
    return updatedFields?.includes(field) && isAdminUpdateEndpoint

  }
  const handleRenew = (cid) => {
    currentCustomer.current = cid
    setShowPaymentOptions(true)
  }
  const handleStripePay = () => {
    navigate(`/payment`, {
      state: {
        cid: currentCustomer.current,
        paymentDetails: {
          renewal: true,
          totalAmount: 79.95,
        },
      },
    })
  }

  const handleReferralPay = async () => {
    try {
      const paymentDetails = {
        renewal: true,
        totalAmount: 79.95,
      };
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
      }
    } catch(err) {

    }
  };

  const printGenres = (genre) => {
    return genre.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());
  }

  return (
    <div className="bg-c-basic min-h-screen px-3 xl:px-0 py-12">
      <div className="flex flex-col items-center gap-y-12 w-full xl:w-8/12 mx-auto">
        <div
          id="profile-details"
          className={`bg-white  w-full border rounded-lg flex flex-col gap-y-4 p-6 border-2`}
        >
          <LoadingSpinner isLoading={loading} />
          {showPaymentOptions &&
            <Paynow id={customer._id} onReferralPay={handleReferralPay} duesInfo={{ "renewal": true }} onStripePay={handleStripePay} onClosePopup={() =>
              setShowPaymentOptions(false)
            } />
          }
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col md:flex-row md:items-start gap-x-12 gap-y-6 relative">
              <div>
                <img
                  src={customer?.photos?.imageUrl || "/assets/default.jpg"}
                  alt=""
                  className="h-80 w-full md:h-44 md:w-44 rounded"
                />
                {showUpdatedDetails("imageUrl") && (
                  <UpdateMarker />
                )}
              </div>
              <div className="flex flex-col justify-center gap-1 md:w-7/12 w-full mb-6 md:mb-0 ">
                <div>
                  <p className="font-semibold text-2xl md:text-3xl mb-2 md:mb-1 text-center md:text-left">
                    {customer?.basicInfo?.firstName}{" "}
                    {customer?.basicInfo?.lastName}
                    {(showUpdatedDetails("firstName") ||
                      showUpdatedDetails("lastName")) && (
                        <UpdateMarker />
                      )}
                  </p>

                  <div className="flex gap-3 justify-center md:justify-start flex-wrap ">
                    <p className="text-nowrap">
                      {customer?.basicInfo?.age || "N/A"} yrs
                      {showUpdatedDetails("age") && (
                        <UpdateMarker />
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.gender || "N/A"}
                      {showUpdatedDetails("gender") && (
                        <UpdateMarker />
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.orientation || "N/A"}
                      {showUpdatedDetails("orientation") && (
                        <UpdateMarker />
                      )}
                    </p>
                    <p className="text-nowrap">
                      {customer?.basicInfo?.race || "N/A"}
                      {showUpdatedDetails("race") && (
                        <UpdateMarker />
                      )}
                    </p>
                    <span className="flex gap-x-1 items-baseline">
                      <img
                        src="/assets/icons/star.svg"
                        alt=""
                        className="h-4"
                      />{" "}
                      {customer?.rating || 0}
                    </span>
                    <p className="underline text-nowrap">
                      {customer?.numRatings || 0} Reviews
                    </p>
                  </div>
                </div>
                <p>
                  {showUpdatedDetails("bio") && (
                    <UpdateMarker />
                  )}
                  {customer?.basicInfo?.bio || (
                    <span className="italic mt-6 text-gray-500 text-center md:text-left">
                      No bio added
                    </span>
                  )}
                </p>
              </div>
              <div className="flex flex-col items-center gap-y-3">
                <button
                  type="button"
                  className="flex items-center justify-center  mx-auto w-full py-2.5 px-4 border text-white bg-yellow-600 rounded-lg hover:opacity-90 text-nowrap"
                  onClick={() => navigate(updateRoute)}
                >
                  Update Profile
                </button>
                {!isAdmin && <>
                  <button
                    type="button"
                    className="flex items-center justify-center  mx-auto w-full py-2.5 px-4 border  text-white bg-green-600  rounded-lg hover:opacity-90 text-nowrap"
                    onClick={() => handleRenew(customer?._id)}
                  >
                    Renew Profile
                  </button>
                </>
                }
                {isUser && <>
                  <button
                    type="button"
                    className="flex items-center justify-center  mx-auto w-full py-2.5 px-4 border  text-white bg-fr-blue-100  rounded-lg hover:opacity-90 text-nowrap"
                    onClick={handleFavouriteUpdate}
                  >
                    {customer?.isFavorite && (
                      <img
                        src="/assets/icons/bookmark.svg"
                        alt=""
                        className="h-6 mr-2"
                      />
                    )}
                    {customer?.isFavorite ? "Favorite" : "Add to Favorites"}
                  </button>
                </>
                }
                {/* <button
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
                </button> */}
              </div>
            </div>

            <div>
              <h2 className=" text-lg md:text-xl my-4 text-white w-full bg-fr-blue-100 md:p-2.5 p-2 rounded ">
                Basic Info
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2  gap-4 text-base md:text-lg">
                {customer && Object.keys(customer?.basicInfo).map((field) => {
                  return field == "spokenLanguages" ? (
                    <p key={field} className="flex flex-wrap items-end">
                      <span className="font-semibold mr-1 ">
                        {basicInfoFieldLabelMap[field]}:
                      </span>
                      {customer?.basicInfo[field].map((lang) => (
                        <span className="mr-1">{lang}</span>
                      ))}
                      {showUpdatedDetails(field) && (
                        <UpdateMarker />
                      )}
                    </p>

                  ) : (!excludeBasinInfoFields.includes(field) && customer?.basicInfo[field] && basicInfoFieldLabelMap[field] &&
                    <p key={field} className="">
                      <span className="font-semibold mr-1">
                        {basicInfoFieldLabelMap[field] == 'Orientation' ? 'Sexual Orientation': basicInfoFieldLabelMap[field]}:
                      </span>
                      {customerFieldValue(field, customer?.basicInfo)}
                      {showUpdatedDetails(field) && (
                        <UpdateMarker />
                      )}
                    </p>
                  )
                })}
              </div>
            </div>
            <div className="flex flex-col gap-y-10 ">
              <div>
                <h2 className=" text-lg md:text-xl my-4 text-white w-full bg-fr-blue-100 md:p-2.5  p-2 rounded ">
                  Personality Info
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-base md:text-lg">
                  {Object.keys(customer?.personalityInfo || []).map(
                    (key) =>
                      key != "_id" && customer?.personalityInfo[key].length != 0 && (
                        <div key={key}>
                          <p className="font-semibold  ">
                            {capitlize(printGenres(key))}
                            {showUpdatedDetails(key) && <UpdateMarker />}
                          </p>
                          <ul className="flex gap-x-3 md:flex-col">
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

              <Photos photos={customer?.photos} artworksChanged={showUpdatedDetails("artworks")} />

              {isUser && (
                <div className="">

                  <h1 className="text-lg md:text-xl my-4 text-white w-full bg-fr-blue-100 md:p-2.5 p-1.5 rounded ">

                    Give your rating
                  </h1>
                  <div className="flex items-center gap-x-4 ml-2">
                    <RatingScale
                      initialRating={customer?.prevRating}
                      onRatingChange={handleRatingUpdate}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ContactInfo
          firstName={customer?.basicInfo?.firstName}
          lastName={customer?.basicInfo?.lastName}
          inmateNumber={customer?.basicInfo?.inmateNumber}
          emailProvider={customer?.basicInfo?.institutionalEmailProvider}
          mailingAddress={customer?.basicInfo?.mailingAddress}
          updatedFields={updatedFields}
          isAdminUpdateEndpoint={isAdminUpdateEndpoint}
        />

        {isAdmin &&
          <AssociatedUsersInfo updatedBy={customer?.updatedBy} createdBy={customer?.createdBy || null} paidBy={customer?.paidBy || null} />
        }
        {isAdmin && customer?.specialInstructionsFlag &&
          <NoteForAdmin noteForAdmin={customer?.specialInstructionsText} />
        }
        {isAdmin &&
          <div className="w-full">
            <PurchaseTable purchases={purchases} totalPages={totalPurchasePages} page={purchasePage} setPage={setPurchaesPage} className='' />
          </div>
        }
      </div>

      {/* <div
        id="send-msgs"
        className="bg-white px-4 py-6 rounded-lg h-fit flex  flex-col grow gap-y-8"
      >
        <p className="font-bold text-2xl text-center">
          Send {customer?.firstName} a message
        </p>
        <textarea
          name=""
          id=""
          className="outline-none border focus:border-fr-blue-200 rounded p-3"
          rows={6}
          value={msgText}
          onChange={(e) => setMsgText(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="mx-auto mt-4 border w-full text-white text px-5 py-3 bg-fr-blue-200 rounded-xl hover:opacity-90"
          onClick={handleMsgSend}
        >
          Send Message
        </button>
      </div> */}
      {paymentPopup && (
        <AddPaymentPopup
          onCloseClick={setPaymentPopup}
          onConfirm={() => console.log('Im Clicked')}
          confirmBtnTxt={"Add Balance"}
          infoText={'approve-profile'}
        />
      )}
    </div >
  );
}


const NoteForAdmin = ({ noteForAdmin }) => {
  return <div className="mr-auto flex flex-col gap-y-6 w-full ">
    <h1 className="bg-fr-blue-200 text-white py-3 px-4 rounded text-lg md:text-xl px-6">
      Note for Admin </h1>
    <div className="border rounded-lg">
      <div className="bg-white flex justify-between flex-col md:flex-row gap-y-12  py-3 md:px-12 px-6  w-full ">
        {noteForAdmin}
      </div>
    </div>
  </div>
}


const RatingScale = ({ initialRating = 0, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(null);
  const handleMouseEnter = (value) => setHoverRating(value);
  const handleMouseLeave = () => setHoverRating(null);
  const handleClick = (value) => {
    setRating(value);
    onRatingChange(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= (hoverRating || rating || initialRating)}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
};

const Star = ({ filled, onClick, onMouseEnter, onMouseLeave }) => {
  return (
    <svg
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`md:w-8 md:h-8 h-6 w-6 cursor-pointer ${filled ? "text-yellow-500" : "text-gray-300"
        } transition-colors duration-150 ease-in-out`}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.09-.78L12 2 11.09 8.46 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export const UpdateMarker = () => {
  return <span className="font-normal text-xs text-green-500 ml-2">
    new
  </span>
}
function Photos({ photos, artworksChanged }) {
  return (
    <div>
      <h2 className=" text-lg md:text-xl my-4 text-white w-full bg-fr-blue-100 md:p-2.5 p-1.5 rounded ">
        Photos/Artworks
        {artworksChanged && <UpdateMarker />}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        {photos?.artworks.map((image, index) => (
          <div key={index} className="w-full h-48 overflow-hidden">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="object-cover w-full h-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>

  );
}

export default Customer;
