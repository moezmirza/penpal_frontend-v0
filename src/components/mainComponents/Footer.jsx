import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-fr-blue-200 flex justify-between p-4 px-8">
      <img src="/assets/penpap-logo.png" alt="" className="h-16" />
      <ul className="flex flex-col md:items-center md:flex-row gap-6 text-white text-lg">
        <li>
          <Link to={"/"}>About Us</Link>
        </li>
        <li>
          <Link to={"/"}>How it works</Link>
        </li>
        <li>
          <Link to={"/"}>FAQ</Link>
        </li>
        <li>
          <Link to={"/"}>Contact Us</Link>
        </li>
        <li>
          <Link to={"/"}>Privacy Policy</Link>
        </li>
        <li>
          <Link to={"/"}>Terms of Service</Link>
        </li>
      </ul>
      <div className="flex my-auto gap-x-4">
        <div className=" border rounded-full p-1.5">
          <img src="/assets/icons/fb.svg" alt="" className="h-6" />
        </div>
        <div className=" border rounded-full p-1.5">
          <img src="/assets/icons/twitter.svg" alt="" className="h-6" />
        </div>
        <div className=" border rounded-full p-1.5">
          <img src="/assets/icons/insta.svg" alt="" className="h-6" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
