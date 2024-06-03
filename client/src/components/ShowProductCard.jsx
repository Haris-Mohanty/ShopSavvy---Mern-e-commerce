import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import DisplayImageFull from "./DisplayImageFull";
import UploadProduct from "./UploadProduct";

const ShowProductCard = ({ product }) => {
  //************ DISPLAY INAGE IN FULL SCREEN ********************/
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  //************ EDIT PRODUCT DETAILS ********************/
  const [openEditProduct, setOpenEditProduct] = useState(false);

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow relative">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={product.productImage[0]}
            alt="Product"
            className="w-full h-46 object-cover transition-transform duration-300 ease-in-out transform hover:scale-110 cursor-pointer"
            onClick={() => {
              setOpenFullScreenImage(true);
              setFullScreenImage(product.productImage[0]);
            }}
          />
        </div>
        <div className="mt-1">
          <h1 className="text-md font-semibold text-gray-700">
            {product.productName}
          </h1>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg text-indigo-600 font-bold">
              ${product.price}
            </span>
            <button
              onClick={() => setOpenEditProduct(true)}
              className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors"
            >
              <FaEdit />
            </button>
          </div>
        </div>

        {/***************** EDIT PRODUCT DETAILS *****************/}
        {openEditProduct && (
          <UploadProduct
            onClose={() => setOpenEditProduct(false)}
            product={product}
            mode="edit"
          />
        )}
      </div>

      {/***************** DISPLAY IMAGE FULL SCREEN *****************/}
      {openFullScreenImage && (
        <DisplayImageFull
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )}
    </>
  );
};

export default ShowProductCard;
