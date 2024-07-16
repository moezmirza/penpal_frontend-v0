import React from "react";
import { Navbar } from "../components/mainComponents/Navbar";
import Footer from "../components/mainComponents/Footer";
import { useSelector } from "react-redux";

function LayoutProvider({ children }) {
  const currentUser = useSelector((state) => state.user.currentUser);
  return (
    <div className="">
      <Navbar />
      {children}
      {currentUser && <Footer />}
    </div>
  );
}

export default LayoutProvider;
