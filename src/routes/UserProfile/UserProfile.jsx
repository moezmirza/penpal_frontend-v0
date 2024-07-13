import React, { useState } from "react";
import { Navbar } from "../../components/mainComponents/Navbar";
import BasicInfo from "./BasicInfo";
import PersonalityInfo from "./PersonaliltyInfo";

function UserProfile() {
  const [showTab, setShowTab] = useState(true);
  return (
    <div className="bg-c-basic">
      <Navbar />
      <div className="flex justify-center">
        <div className="w-1/2">
          <div id="tabs" className="flex cursor-pointer">
            <div
              className={`rounded border p-2 text-lg  ${
                showTab ? "bg-fr-blue-200 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(true)}
            >
              Basic Info
            </div>
            <div
              className={`rounded border p-2 text-lg ${
                !showTab ? "bg-fr-blue-200 text-white" : "bg-white text-black"
              }`}
              onClick={() => setShowTab(false)}
            >
              Personality Info
            </div>
          </div>

          {showTab ? <BasicInfo /> : <PersonalityInfo />}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
