import React from "react";
import { Link } from "react-router-dom";
import { websiteURL } from "../../utils/config";

function Footer() {
  return (
    <>
      <div className="xl:hidden bg-b-gradient-2 flex justify-between flex-col gap-y-10 p-6  w-full">
        <ul
          className="flex flex-wrap justify-center gap-6 text-white
        text-base md:text-lg mx-auto"
        >
          <li>
            <a href={`${websiteURL}`}>Home</a>
          </li>
          <li>
            <a href={`${websiteURL}about-us/`}>About Us</a>
          </li>
          <li>
            <a href={`${websiteURL}how-it-works/`}>How it works</a>
          </li>
          <li>
            <a href={`${websiteURL}pricing/`}>Pricing</a>
          </li>
          <li>
            <a href={`${websiteURL}faq/`}>FAQ</a>
          </li>
          <li>
            <a href={`${websiteURL}contact-us/`}>Contact Us</a>
          </li>
          <li>
            <a href={`${websiteURL}privacy-policy/`}>Privacy Policy</a>
          </li>
          <li>
            <a href={`${websiteURL}terms-of-service/`}>Terms of Service</a>
          </li>
        </ul>
        <div className="flex my-auto items-center justify-between gap-x-4">
          <img
            src="/assets/logo.jpeg"
            alt=""
            className="md:h-16 h-12 rounded-md"
          />
          <div className="flex gap-x-4">
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/fb.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/twitter.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/insta.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* pc responsive */}
      <div className="hidden xl:flex bg-b-gradient-2 flex justify-between  p-4 px-8 w-full">
        <img src="/assets/logo.jpeg" alt="" className="h-16 rounded-md" />

        <ul
          className="flex md:items-center md:flex-row gap-6 text-white
        text-lg mx-auto"
        >
          <li>
            <a href={`${websiteURL}`}>Home</a>
          </li>
          <li>
            <a href={`${websiteURL}about-us/`}>About Us</a>
          </li>
          <li>
            <a href={`${websiteURL}how-it-works/`}>How it works</a>
          </li>
          <li>
            <a href={`${websiteURL}pricing/`}>Pricing</a>
          </li>
          <li>
            <a href={`${websiteURL}faq/`}>FAQ</a>
          </li>
          <li>
            <a href={`${websiteURL}contact-us/`}>Contact Us</a>
          </li>
          <li>
            <a href={`${websiteURL}privacy-policy/`}>Privacy Policy</a>
          </li>
          <li>
            <a href={`${websiteURL}terms-of-service/`}>Terms of Service</a>
          </li>
        </ul>
        <div className="flex my-auto items-center justify-between gap-x-4">
          <div className="flex gap-x-4">
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/fb.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/twitter.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
            <div className=" border rounded-full p-1.5">
              <img
                src="/assets/icons/insta.svg"
                alt=""
                className="h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
