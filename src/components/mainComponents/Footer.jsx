import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="md:hidden bg-fr-blue-200 flex justify-between flex-col gap-y-6 p-4 px-8 w-full">
        <ul className="flex flex-col md:items-center md:flex-row gap-6 text-white text-lg mx-auto">
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
        <div className="flex my-auto items-center justify-between gap-x-4">
          <img src="/assets/logo.jpeg" alt="" className="h-16 rounded-md" />
          <div className="flex gap-x-4">
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
      </div>

      {/* pc responsive */}
      <div className="hidden md:flex bg-fr-blue-200 flex justify-between  p-4 px-8 w-full">
        <img src="/assets/logo.jpeg" alt="" className="h-16 rounded-md" />

        <ul className="flex flex-col md:items-center md:flex-row gap-6 text-white text-lg mx-auto">
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
        <div className="flex my-auto items-center justify-between gap-x-4">
          <div className="flex gap-x-4">
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/fb.svg"
                alt=""
                className="h-6  rounded-lg"
              />
            </div>
            <div className=" border rounded-full p-1.5">
              <img src="/assets/icons/twitter.svg" alt="" className="h-6" />
            </div>
            <div className=" border rounded-full p-1.5">
              <img src="/assets/icons/insta.svg" alt="" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
