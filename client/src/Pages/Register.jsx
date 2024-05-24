import React, { useState } from "react";
import savvy from "../Assets/savvy.png";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import uploadProfilePic from "../Assets/signin.gif";
import { registerUserApi } from "../api/api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(uploadProfilePic);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ************ PASSWORD SHOW & HIDE ********/
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ********** PROFILE PHOTO UPLOAD ********/
  const handleUploadProfilePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(file);
        setProfilePicPreview(reader.result); // Base64 encoded string
      };
      reader.readAsDataURL(file);
    }
  };

  // ************ REGISTER USER **************/
  const submitRegisterUserForm = async (e) => {
    e.preventDefault();
    const data = { name, email, password };
    try {
      const res = await registerUserApi(data);
      console.log(res);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <>
      <section id="register">
        <div className="container mx-auto py-4 px-2">
          <div className="bg-white p-3 w-full max-w-sm mx-auto rounded-lg shadow-2xl">
            <div className="text-center mt-2 mb-2">
              <img src={savvy} alt="savvy" className="mx-auto" />
            </div>

            {/***************** UPLOAD PROFILE PHOTO ***********/}
            <div className="relative w-24 h-24 mx-auto">
              <img
                src={profilePicPreview}
                className="w-24 h-24 rounded-full object-cover cursor-pointer"
                alt="Profile Preview"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full cursor-pointer">
                <FaUpload
                  className="text-white text-2xl"
                  title="Upload Photo"
                  onClick={() =>
                    document.getElementById("profilePicInput").click()
                  }
                />
              </div>
              <input
                type="file"
                id="profilePicInput"
                className="hidden"
                accept="image/*"
                onChange={handleUploadProfilePhoto}
              />
            </div>

            {/***************** REGISTER FORM ***********/}
            <form onSubmit={submitRegisterUserForm} className="space-y-4 mt-2">
              {/***************** NAME ***********/}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/***************** EMAIL ***********/}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600 mb-1"
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

              {/***************** PASSWORD ***********/}
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-600 mb-1"
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

              {/***************** REGISTER BUTTON ***********/}
              <div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md shadow-md hover:shadow-lg focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>

            {/***************** LOGIN ***********/}
            <div className="mt-3 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to={"/login"} className="text-indigo-500 hover:underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
