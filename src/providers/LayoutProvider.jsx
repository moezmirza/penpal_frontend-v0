import React from "react";
import { Navbar } from "../components/mainComponents/Navbar";
import Footer from "../components/mainComponents/Footer";
import { useSelector } from "react-redux";

function LayoutProvider({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <div className="flex-grow">{children}</div>
      {currentUser && (
        <div className="flex-none">
          <Footer />
        </div>
      )}
    </div>
  );
}

export default LayoutProvider;
