import React, { useEffect, useState } from "react";
import { useGet } from "../../api/useGet";
import { useNavigate } from "react-router-dom";
import FindUserCustomers from "./FindUserCustomers";
import PageHeader from "../../components/PageHeader";

function ManageCustomers() {
  const [showTab, setShowTab] = useState(true);
  const endpoint = showTab ? "/created-customers" : "/favorite";

  return (
    <div className="flex flex-col gap-y-6 mb-32  relative ">
      <PageHeader title="Manage Profiles" showTab={showTab} onShowTab={setShowTab} managePage={true} />
      <FindUserCustomers endpoint={endpoint} key={endpoint} />

    </div>
  );
}
export default ManageCustomers;
