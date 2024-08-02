import React, { useEffect, useState } from "react";
import BasicInfo from "./BasicInfo";
import Questionairre from "./Questionairre";
import { useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";

function Profile() {
  const [showTab, setShowTab] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sect = queryParams.get("sect");
  console.log("sect", sect);

  useEffect(() => {
    if (sect) {
      if (sect == "questionnaire") {
        setShowTab(false);
      } else {
        setShowTab(true);
      }
    }
  }, [sect]);

  return (
    <div className="bg-c-basic py-12 flex flex-col items-center">
      <div className="md:w-1/2 w-full px-3">
        <div id="tabs" className="flex cursor-pointer">
          <div
            className={`rounded border md:px-3 md:py-2 md:text-lg text-sm px-2 py-1.5  ${
              showTab ? "bg-fr-blue-200 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowTab(true)}
          >
            Profile
          </div>
          <div
            className={`rounded border md:px-3 md:py-2 md:text-lg text-sm px-2 py-1.5  ${
              !showTab ? "bg-fr-blue-200 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowTab(false)}
          >
            Questionnaire
          </div>
        </div>

        {showTab ? <BasicInfo onTabSwitch={setShowTab} /> : <Questionairre />}
      </div>
    </div>
  );
}

export default Profile;
