import React, { useState } from "react";
import savvy from "../Assets/savvy.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUserApi } from "../api/api";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ********** PASSWORD SHOW & HIDE *********/
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //**************** LOGIN USER *********/
  const submitLoginUserForm = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await loginUserApi(data);
      if (res.success) {
        toast.success("Login Success!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <section id="login">
        <div className="container mx-auto py-4 px-2">
          <div className="bg-white p-3 w-full max-w-sm mx-auto rounded-lg shadow-2xl">
            <div className="mb-6 text-center mt-5">
              <img src={savvy} alt="login" className="mx-auto" />
              <h2 className="text-2xl font-semibold text-gray-700 mt-6">
                Welcome Back!
              </h2>
              <p className="text-gray-500">Please login to your account</p>
            </div>
            <form onSubmit={submitLoginUserForm} className="space-y-4 mt-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-10 text-gray-500"
                  onClick={handlePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center justify-end">
                <div className="text-sm font-semibold">
                  <button
                    type="button"
                    className="text-indigo-500 hover:underline"
                  >
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
                  Register
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
