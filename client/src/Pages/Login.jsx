import React from "react";
import savvy from "../Assets/savvy.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <section id="login">
        <div className="container mx-auto p-4 rounded-full">
          <div className="bg-white p-2 w-full max-w-sm mx-auto">
            <div className="mb-6 text-center mt-5">
              <img src={savvy} alt="login" className="mx-auto" />
              <h2 className="text-2xl font-semibold text-gray-700 mt-6">
                Welcome Back!
              </h2>
              <p className="text-gray-500">Please login to your account</p>
            </div>
            <form className="space-y-4 mt-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm font-semibold">
                  <button type="button" className="text-indigo-500 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md shadow-md hover:shadow-lg focus:outline-none"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-4 text-center mb-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-indigo-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
