import React, { useState } from "react";
import savvy from "../Assets/savvy.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUpload } from "react-icons/fa";
import uploadProfilePic from "../Assets/signin.gif";
import { registerUserApi } from "../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState(uploadProfilePic);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ************ PASSWORD SHOW & HIDE ********/
  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ********* SET VALUE **********/
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  // **************** CONVERT IMAGE TO BASE 64 *************/
  const imageTobase64 = async (image) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      
      reader.onerror = (error) => reject(error);
    });

    return data;
  };

  // **************** PROFILE PHOTO UPLOAD *****************/
  const handleUploadProfilePhoto = async (e) => {
    const file = e.target.files[0];

    // Check if file type is either JPG or PNG
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      toast.error("Please upload a JPG or PNG image.");
      return;
    }

    // Check if file size is under 100KB
    if (file.size > 100 * 1024) {
      toast.error("Please upload an image under 100KB.");
      return;
    }

    const imagePic = await imageTobase64(file);
    setProfilePicPreview(imagePic);

    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic,
      };
    });
  };

  // ***************** REGISTER USER **********************/
  const submitRegisterUserForm = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await registerUserApi(data);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
        navigate("/login");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
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
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
