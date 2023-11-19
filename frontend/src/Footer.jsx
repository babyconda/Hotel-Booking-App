import React from "react";
import { PiDot } from "react-icons/pi";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";
import { BiGlobe } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="mt-16 max-sm:pl-8 bg-gray-50 ">
      <div className="flex justify-evenly max-sm:flex-col border-t pt-8 pb-8 bg-gray-50 leading-loose">
        <div className="space-y-4 text-xs text-gray-800">
          <h1 className="font-semibold">Support</h1>

          <p>Help Centre</p>
          <p>AirCover</p>
          <p>Cancellation options</p>
          <p>Our COVID-19 Response</p>
          <p>Report a neighbourhood concern</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h1 className="font-semibold">Community</h1>

          <p>Airbnb.org: disaster relief housing</p>
          <p>Combating discrimination</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h1 className="font-semibold">Hosting</h1>
          <p>Airbnb your home</p>
          <p>AirCover for Hosts</p>
          <p>Explore hosting resources</p>
          <p>Visit our community forum</p>
          <p>How to host responsibly</p>
        </div>
        <div className="space-y-4 text-xs text-gray-800">
          <h1 className="font-semibold">Airbnb</h1>
          <p>Newsroom</p>
          <p>Learn about new features</p>
          <p>Letter from our founders</p>
          <p>Careers</p>
          <p>Investors</p>
        </div>
      </div>
      <hr className="mx-24" />
      <div className="flex justify-between max-sm:flex-col  ">
        <div className="flex bg-gray-50 max-sm:flex-col px-24 pl-28 max-sm:px-4 text-gray-700 text-sm">
          <div className="flex py-6 ">
            <h1>&#169; </h1>
            <h1> 2023 Airbnb, Inc. </h1>
          </div>
          <div className="flex py-4 ">
            <h1 className="flex items-center gap-2">
              <PiDot /> Privacy{" "}
            </h1>
            <h1 className="flex items-center gap-2">
              <PiDot />
              Terms{" "}
            </h1>
            <h1 className="flex items-center gap-2">
              <PiDot />
              Sitemap{" "}
            </h1>
            <h1 className="flex items-center gap-2">
              <PiDot />
              Company details{" "}
            </h1>
          </div>
        </div>
        <div className="flex gap-4 pr-24 max-sm:flex-col text-lg text-gray-800">
          <div className="flex items-center gap-2">
            <BiGlobe />
            <h1>English(IN)</h1>
          </div>
          <div className="flex items-center gap-2">
            <h1>&#8377;</h1>
            <h1>INR</h1>
          </div>
          <div className="flex items-center gap-2 mr-8">
            <AiFillFacebook />
            <AiFillTwitterSquare />
            <FaInstagramSquare />
          </div>
        </div>
      </div>
    </div>
  );
}
