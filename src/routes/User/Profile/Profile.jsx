import React, { useState } from "react";
import { Navbar } from "../../../components/mainComponents/Navbar";
import BasicInfo from "./BasicInfo";
import PersonalityInfo from "./PersonaliltyInfo";

function Profile() {
  const [showTab, setShowTab] = useState(true);
  // const handleTabSwitch=()=>{

  // }
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
            Basic Info
          </div>
          <div
            className={`rounded border md:px-3 md:py-2 md:text-lg text-sm px-2 py-1.5  ${
              !showTab ? "bg-fr-blue-200 text-white" : "bg-white text-black"
            }`}
            onClick={() => setShowTab(false)}
          >
            Personality Info
          </div>
        </div>

        {showTab ? <BasicInfo onTabSwitch={setShowTab} /> : <PersonalityInfo />}
      </div>
    </div>
  );
}

export default Profile;
