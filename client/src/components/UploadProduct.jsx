import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productCategory from "../data/productCategory";
import { FaFileUpload } from "react-icons/fa";
import uploadImage from "../data/uploadImage";
import DisplayImageFull from "./DisplayImageFull";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/spinnerSlice";
import { uploadProduct } from "../api/api";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    price: "",
    sellingPrice: "",
    description: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  //************** ONCHANGE || SET DATA *******/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //*************** UPLOAD IMAGE *****************/
  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];

    try {
      dispatch(showLoading());
      // Upload image on cloudinary
      const uploadImageCloudinary = await uploadImage(file);
      dispatch(hideLoading());

      setData((prevData) => ({
        ...prevData,
        productImage: [
          ...prevData.productImage,
          uploadImageCloudinary.secure_url,
        ],
      }));
    } catch (err) {
      console.log(err);
      dispatch(hideLoading());
    }
  };

  //*************** DELETE IMAGE *****************/
  const handleDeleteImage = async (index) => {
    setData((prevData) => ({
      ...prevData,
      productImage: prevData.productImage.filter((_, i) => i !== index),
    }));
  };

  //*********** UPLOAD PRODUCT || FORM SUBMIT *************/
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const res = await uploadProduct(data);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
        onClose();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
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
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 mt-2 overflow-y-auto h-full pr-2 pl-1"
          >
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
                name="category"
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
                    onChange={handleUploadProductImage}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                {data?.productImage.length > 0 ? (
                  <div className="mt-4 grid grid-cols-3 gap-2 mb-3">
                    {data.productImage.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`product-${index}`}
                          className="w-full h-24 object-cover rounded-md cursor-pointer"
                          onClick={() => {
                            setOpenFullScreenImage(true);
                            setFullScreenImage(image);
                          }}
                        />
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-1 right-1 text-red-400 text-xl hover:text-red-600 hover:text-2xl transition-all"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-red-600 text-xs">
                    *Please upload product image
                  </p>
                )}
              </div>
            </div>

            {/***************** PRICE *****************/}
            <div className="mt-2">
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={data.price}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product price"
              />
            </div>

            {/***************** SELLING PRICE *****************/}
            <div className="mt-2">
              <label
                htmlFor="sellingPrice"
                className="block text-gray-700 font-medium"
              >
                Selling Price
              </label>
              <input
                type="number"
                name="sellingPrice"
                value={data.sellingPrice}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter selling price"
              />
            </div>

            {/***************** DESCRIPTION *****************/}
            <div className="mt-2">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                value={data.description}
                onChange={handleChange}
                className="mt-2 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter product description"
              />
            </div>

            {/***************** UPLOAD BUTTON *****************/}
            <div className="mt-2 pb-10">
              <button
                type="submit"
                className="w-full py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
              >
                Upload Product
              </button>
            </div>
          </form>
        </div>

        {/***************** DISPLAY IMAGE FULL SCREEN *****************/}
        {openFullScreenImage && (
          <DisplayImageFull
            onClose={() => setOpenFullScreenImage(false)}
            imageUrl={fullScreenImage}
          />
        )}
      </div>
    </>
  );
};

export default UploadProduct;
