import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  FaRegUserCircle,
  FaUsers,
  FaUpload,
  FaShoppingCart,
} from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user?.isAdmin) {
      navigate("/");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="min-h-[calc(100vh-71px)] md:flex hidden mt-16">
        {/****************** SIDEBAR SECTION ****************/}
        <aside className="bg-white w-full min-h-full max-w-60 customShadow">
          <div className="h-36 flex justify-center items-center flex-col">
            <div className="text-indigo-500 flex justify-center">
              {user?.profilePhoto ? (
                <img
                  src={user?.profilePhoto}
                  alt={user?.name}
                  className="h-16 w-16 rounded-full"
                />
              ) : (
                <FaRegUserCircle size={50} title="Profile" />
              )}
            </div>
            <p className="mt-1 capitalize text-lg font-semibold">
              {user?.name}
            </p>
            <p className="text-sm font-bold text-indigo-500">
              Role: {user?.isAdmin ? "Admin" : "User"}
            </p>
          </div>

          {/************** NAVIGATION *****************/}
          <nav className="mt-6">
            <ul>
              <li className="py-2 px-4 flex items-center hover:bg-gray-200">
                <Link
                  to="all-users"
                  className="text-indigo-600 flex items-center space-x-2"
                >
                  <FaUsers />
                  <span>All Users</span>
                </Link>
              </li>
              <li className="py-2 px-4 flex items-center hover:bg-gray-200">
                <Link
                  to="all-products"
                  className="text-indigo-600 flex items-center space-x-2"
                >
                  <FaUpload />
                  <span>All Products</span>
                </Link>
              </li>
              <li className="py-2 px-4 flex items-center hover:bg-gray-200">
                <Link
                  to="all-orders"
                  className="text-indigo-600 flex items-center space-x-2"
                >
                  <FaShoppingCart />
                  <span>All Orders</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        {/****************** MAIN SECTION ****************/}
        <main className="w-full h-full p-4">{<Outlet />}</main>
      </div>
    </>
  );
};

export default AdminPanel;
