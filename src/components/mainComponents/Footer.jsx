import React from "react";
import { Link } from "react-router-dom";
import { websiteURL } from "../../utils/config";


const Footer = () => {
  return (
    <div className="flex flex-col gap-y-4 bg-b-gradient-2 text-gray-300 pt-24 text-sm md:text-base">

      <div className="flex flex-col gap-20  lg:flex-row justify-between px-6 lg:px-24">
        <div className="w-full lg:basis-[35%] w-1/3 items-center lg:items-start flex flex-col gap-y-8 text-white font-normal">
          <a href={`${websiteURL}`}>
            <img
              src="/assets/logo.jpeg"
              alt="A Way Out Pen Pals"
              className="h-20  rounded-lg"
            />
          </a>
          <p className="">
            Our platform is designed to foster friendship, support, and a new
            perspective for everyone involved. Join our community today and
            make a difference in a prison pen pal’s life.
          </p>
          <div className="flex gap-x-3">
            <a className="underline decoration-blue-400 text-sm" href={`${websiteURL}privacy-policy/`}>Privacy Policy</a>
            <a className="underline decoration-blue-400 text-sm" href={`${websiteURL}terms-of-service/`}>Terms of Service</a>
          </div>
        </div>
        <div className="flex justify-around basis-[65%] flex-wrap gap-10">
          <div className="">
            <h2 className="text-2xl font-semibold mb-8 text-white">Navigation</h2>
            <ul className="flex flex-col gap-y-4">
              <li><a href={`${websiteURL}`} className="hover:underline whitespace-nowrap">Home</a></li>
              <li><a href={`${websiteURL}/about-us/`} className="hover:underline whitespace-nowrap">About Us</a></li>
              <li><a href={`${websiteURL}/faq/`} className="hover:underline whitespace-nowrap">FAQ</a></li>
              <li><a href={`${websiteURL}/contact-us/`} className="hover:underline whitespace-nowrap">Contact Us</a></li>
            </ul>
          </div>
          <div className="">
            <h2 className="text-2xl font-semibold mb-8 text-white">Platform</h2>
            <ul className="flex flex-col gap-y-4">
              <li><a href={`https://app.awayoutpenpals.com`} className="hover:underline whitespace-nowrap">Dashboard</a></li>
              <li><a href={`${websiteURL}/how-it-works/`} className="hover:underline whitespace-nowrap">How It Works</a></li>
              <li><a href={`${websiteURL}/pricing/`} className="hover:underline whitespace-nowrap">Pricing</a></li>
              <li><a href={`${websiteURL}/terms-and-conditions/`} className="hover:underline">Terms and Conditions</a></li>
            </ul>
          </div>
        </div>

      </div>
      <div className="text-center text-white py-6 border border-gray-400 border-t-1 border-x-0 border-b-0 ">
        <p className="mx-2">
          All rights Reserved. Copyright © 2024{" "}
          <strong>A Way Out Pen Pals, LLC</strong>
        </p>
      </div>
    </div>
  )
}
export default Footer
