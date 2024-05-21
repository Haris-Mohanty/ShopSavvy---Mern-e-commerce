import React from "react";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { TbShoppingCartSearch } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";

const Header = () => {
  return (
    <>
      <header className="bg-white h-16 shadow-md">
        <div className="container mx-auto h-full flex items-center justify-between lg:px-8 px-2">
          {/************  LOGO *************/}
          <Link to={"/"}>
            <img src={logo} className="w-48 h-7" alt="Shop Savvy" />
          </Link>

          {/************  SEARCH BAR *************/}
          <div className="hidden md:flex lg:flex items-center w-full justify-between max-w-sm">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-3 py-1 border border-gray-300 rounded-l-lg focus:outline-none ring-2 focus:ring-indigo-500 focus-within:shadow-lg"
            />
            <div className="px-4 py-2 bg-indigo-500 text-white rounded-r-lg flex items-center justify-center cursor-pointer">
              <TbShoppingCartSearch size={22} title="Search" />
            </div>
          </div>

          {/************  CART AND AUTHENTICATION *************/}
          <div className="flex space-x-4">
            <div className="text-indigo-500 cursor-pointer relative">
              <span>
                <HiOutlineShoppingCart size={26} title="Cart" />
              </span>
              <div className="bg-indigo-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-xs">0</p>
              </div>
            </div>
            <div className="text-indigo-500 cursor-pointer">
              <FaRegUserCircle size={26} title="Profile" />
            </div>
            <div>
              <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-3 py-1 rounded-full shadow-md hover:shadow-xl focus:outline-none">
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
