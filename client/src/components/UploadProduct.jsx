import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../data/productCategory";
import { FaFileUpload } from "react-icons/fa";
import uploadImage from "../data/uploadImage";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });

  //************** ONCHANGE || SET DATA *******/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //*************** UPLOAD IMAGE *****************/
  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];

    // Upload image on cloudinary
    const uploadImageCloudinary = await uploadImage(file);

    setData((prevData) => ({
      ...prevData,
      productImage: [
        ...prevData.productImage,
        uploadImageCloudinary.secure_url,
      ],
    }));
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg overflow-hidden h-4/5">
          {/************* HEADER OF UPLOAD PRODUCT *************/}
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="text-xl font-semibold text-indigo-500">
              Upload Product
            </h2>
            <button
              onClick={onClose}
              className="text-red-500 hover:text-red-700 transition"
            >
              <IoClose size={22} />
            </button>
          </div>

          {/************* FORM OF UPLOAD PRODUCT *************/}
          <form className="space-y-4 mt-2 overflow-y-auto h-full pr-2 pl-1">
            {/***************** PRODUCT NAME *****************/}
            <div className="mt-2">
              <label
                htmlFor="productName"
                className="block text-gray-700 font-medium"
              >
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={data.productName}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product name"
              />
            </div>

            {/***************** BRAND NAME *****************/}
            <div className="mt-2">
              <label
                htmlFor="brandName"
                className="block text-gray-700 font-medium"
              >
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={data.brandName}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter brand name"
              />
            </div>

            {/***************** CATEGORY *****************/}
            <div className="mt-2">
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium"
              >
                Category
              </label>
              <select
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={data.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {productCategory.map((option, index) => (
                  <option value={option.value} key={option.value + index}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {/***************** PRODUCT IMAGE *****************/}
            <div className="mt-2">
              <label
                htmlFor="productImage"
                className="block text-gray-700 font-medium"
              >
                Product Images
              </label>
              <div className="mt-2 flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md hover:border-indigo-500">
                <label
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer"
                  htmlFor="productImage"
                >
                  <FaFileUpload size={24} className="text-gray-500 mb-1" />
                  <span className="text-gray-500">Click to upload</span>
                  <input
                    type="file"
                    id="productImage"
                    name="productImage"
                    multiple
                    onChange={handleUploadProduct}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                {data?.productImage.length > 0 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 mb-3">
                    {data.productImage.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`product-${index}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-red-600 text-xs">
                    *Please upload product image
                  </p>
                )}
              </div>
            </div>
            <div className="mt-2"></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadProduct;
