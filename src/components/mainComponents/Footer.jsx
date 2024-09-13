import React from "react";
import { Link } from "react-router-dom";
import { websiteURL } from "../../utils/config";


const Footer = () => {
  return (
    <div className=" flex flex-col gap-y-4 bg-b-gradient-2 text-gray-300">

      <div className="flex flex-col gap-y-12 md:flex-row justify-none lg:justify-around pt-24 px-12 lg:px-24 font-semibold">
        <div className="w-full md:w-1/3 flex flex-col gap-y-8 text-white font-normal">
          <a href="https://awayoutpenpals.com">
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
        <div className="">
          <h2 className="text-2xl font-semibold mb-8 text-white">Navigation</h2>
          <ul className="flex flex-col gap-y-4">
            <li><a href="https://awayoutpenpals.com/" className="hover:underline whitespace-nowrap">Home</a></li>
            <li><a href="https://awayoutpenpals.com/about-us/" className="hover:underline whitespace-nowrap">About Us</a></li>
            <li><a href="https://app.awayoutpenpals.com" className="hover:underline whitespace-nowrap">Dashboard</a></li>
            <li><a href="https://awayoutpenpals.com/how-it-works/" className="hover:underline whitespace-nowrap">How It Works</a></li>
            <li><a href="https://awayoutpenpals.com/pricing/" className="hover:underline whitespace-nowrap">Pricing</a></li>
            <li><a href="https://awayoutpenpals.com/faq/" className="hover:underline whitespace-nowrap">FAQ</a></li>
            <li><a href="https://awayoutpenpals.com/contact-us/" className="hover:underline whitespace-nowrap">Contact Us</a></li>
          </ul>

        </div>
        <div className="">
          <h2 className="text-2xl font-semibold mb-8 text-white">Resources</h2>
          <ul className="flex flex-col gap-y-4">
            <li><a href="#" className="hover:underline">About Securus</a></li>
            <li><a href="#" className="hover:underline">Facilities We Serve</a></li>
            <li><a href="#" className="hover:underline">Facilities & Pricing</a></li>
            <li><a href="#" className="hover:underline">Correctional Staff</a></li>
            <li><a href="#" className="hover:underline">Tariffs</a></li>
            <li><a href="#" className="hover:underline">Rates</a></li>
            <li><a href="#" className="hover:underline">FCC</a></li>
            <li><a href="#" className="hover:underline">California Attorneys</a></li>
            <li><a href="#" className="hover:underline">California Residents</a></li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-col gap-y-4">
            <li><a href="#" className="hover:underline">Customer Care</a></li>
            <li><a href="#" className="hover:underline">Report Technical Issues</a></li>
            <li><a href="#" className="hover:underline">Securus Technologies LLC</a></li>
            <li><a href="#" className="hover:underline">Securus Technologies on LinkedIn</a></li>
            <li><a href="#" className="hover:underline">Legal & Regulatory</a></li>
            <li><a href="https://awayoutpenpals.com/terms-and-conditions/" className="hover:underline">Terms and Conditions</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-white py-6 border border-gray-400 border-t-1 border-x-0 border-b-0 ">
        <p>
          All rights Reserved. Copyright © 2024{" "}
          <strong>A Way Out Pen Pals, LLC</strong>
        </p>
      </div>
    </div>
  )
}
export default Footer
