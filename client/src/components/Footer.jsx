import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaSnapchatSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="footer bg-black text-white py-8 px-6 md:px-16 lg:px-18">
        <div className="top flex items-center justify-between text-left flex-wrap">
          <div>
            <h1 className="text-3xl">Shop Savvy</h1>
            <p className="mt-2 mb-2">Shop Smart, Shop Savvy!</p>
          </div>

          {/*********** SOCIAL MEDIA ICONS *****************/}
          <div className="flex">
            <Link
              to={"/"}
              className="text-2xl ml-4 transition duration-300 ease-in-out hover:text-indigo-500 transform hover:scale-125"
            >
              <FaFacebookSquare size={28} title="Facebook" />
            </Link>
            <Link
              to={"/"}
              className="text-2xl ml-4 transition duration-300 ease-in-out hover:text-indigo-500 transform hover:scale-125"
            >
              <FaInstagramSquare size={28} title="Instagram" />
            </Link>
            <Link
              to={"/"}
              className="text-2xl ml-4 transition duration-300 ease-in-out hover:text-indigo-500 transform hover:scale-125"
            >
              <FaTwitterSquare size={28} title="Twitter" />
            </Link>
            <Link
              to={"/"}
              className="text-2xl ml-4 transition duration-300 ease-in-out hover:text-indigo-500 transform hover:scale-125"
            >
              <FaSnapchatSquare size={28} title="Sanpchat" />
            </Link>
          </div>
        </div>

        {/*********** INFORMATION *****************/}
        <div className="bottom py-8 px-8 text-left flex justify-between flex-wrap">
          <div className="flex flex-col mb-2 text-sm md:text-lg lg:text-lg">
            <h3 className="text-xl md:text-xl lg:text-3xl fw-bold py-2 text-indigo-500">
              Contact Us
            </h3>
            <Link to="/" className="text-white pb-2 hover:underline">
              Address: 4Com
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Zip code: 560004
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Email: ssvy@ac.in
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Phone: 1800 372 124
            </Link>
          </div>
          <div className="flex flex-col mb-2 text-sm md:text-lg lg:text-lg">
            <h3 className="text-xl md:text-xl lg:text-3xl fw-bold py-2 text-indigo-500">
              Shop With Us
            </h3>
            <Link to="/" className="text-white pb-2 hover:underline">
              New Arrivals
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Best Sellers
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Discounts
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Gift Cards
            </Link>
          </div>
          <div className="flex flex-col mb-2 text-sm md:text-lg lg:text-lg">
            <h3 className="text-xl md:text-xl lg:text-3xl fw-bold py-2 text-indigo-500">
              Customer Service
            </h3>
            <Link to="/" className="text-white pb-2 hover:underline">
              FAQs
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Terms & Conditions
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Privacy Policy
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Refund Policy
            </Link>
          </div>
          <div className="flex flex-col mb-2 text-sm md:text-lg lg:text-lg">
            <h3 className="text-xl md:text-xl lg:text-3xl fw-bold py-2 text-indigo-500">
              Others
            </h3>
            <Link to="/" className="text-white pb-2 hover:underline">
              License
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Supports
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              Subscribe
            </Link>
            <Link to="/" className="text-white pb-2 hover:underline">
              About Us
            </Link>
          </div>
        </div>

        {/*********** COPYRIGHTS *****************/}
        <div className="text-center text-xs md:text-xl lg:text-2xl mt-4">
          Copyright © 2024 with Shop Savvy. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default Footer;
