import React from "react";
import { Navbar } from "../components/mainComponents/Navbar";

import Footer from "../components/mainComponents/Footer";
import { useSelector } from "react-redux";
import CallSupport from "../components/CallSupport";
import { useLocation } from "react-router-dom";

function LayoutProvider({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  const isAdmin = JSON.parse(localStorage.getItem("adminAuth"));
  const location = useLocation();
  const excludeHeaderFooter = ["/payment"].includes(location.pathname);

  if (excludeHeaderFooter) return <div>{children}</div>;
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      <CallSupport />

      {currentUser && !isAdmin && (
        <div className="flex-none">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default LayoutProvider;
