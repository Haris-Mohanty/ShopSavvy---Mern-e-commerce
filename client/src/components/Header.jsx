import React, { useState } from "react";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";
import { TbShoppingCartSearch } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { logoutUser } from "../api/api";
import { clearUser } from "../redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // ********** USER LOGOUT *******/
  const handleLogout = async () => {
    try {
      dispatch(showLoading());
      const res = await logoutUser();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(clearUser());
        toast.success("User logged out successfully!");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <header className="bg-white h-16 shadow-md fixed top-0 right-0 left-0 z-50">
        <div className="container mx-auto h-full flex items-center justify-between lg:px-8 px-2">
          {/************  LOGO *************/}
          <Link to={"/"}>
            <img src={logo} className="w-32 h-7 md:w-48" alt="Shop Savvy" />
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

          {/************  CART AND USER PROFILE *************/}
          <div className="flex items-center space-x-4">
            <div className="text-indigo-500 cursor-pointer relative">
              <span>
                <HiOutlineShoppingCart size={26} title="Cart" />
              </span>
              <div className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-2">
                <p className="text-xs">0</p>
              </div>
            </div>
            <div
              className="text-indigo-500 cursor-pointer flex items-center relative"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            >
              {user?.profilePhoto ? (
                <img
                  src={user?.profilePhoto}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                user?._id && <FaRegUserCircle size={26} title="Profile" />
              )}
              {/********* SHOW POPUP OF ADMIN PANEL ****************/}
              {isProfileMenuOpen && (
                <div className="absolute -right-10 top-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {user?.isAdmin ? (
                    <Link
                      to="/admin/all-products"
                      className="block px-4 py-2 text-gray-800 hidden md:block hover:bg-gray-100"
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <p
                      onClick={() => {
                        toast.error("Accessble by only admins!");
                      }}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    >
                      Admin Panel
                    </p>
                  )}
                </div>
              )}
            </div>
            {/************** LOGIN AND LOGOUT HANDLER ***********/}
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-2 rounded-full shadow-md hover:shadow-xl focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-3 py-2 rounded-full shadow-md hover:shadow-xl focus:outline-none"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
