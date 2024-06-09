import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getCategoryWiseProducts } from "../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import displayInr from "../data/IndCur";
import { MdOutlineShoppingCart } from "react-icons/md";

const ProductsCardWith = ({ category, heading }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  // Fetch category wise products
  const fetchCategoryWiseProduct = async () => {
    try {
      dispatch(showLoading());
      const res = await getCategoryWiseProducts(category);
      dispatch(hideLoading());
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCategoryWiseProduct();
    //eslint-disable-next-line
  }, [category]);
  return (
    <>
      <div className="container mx-auto px-4 md:px-8 my-6">
        <h2 className="font-bold text-3xl py-3 text-gray-900">{heading}</h2>
        <div className="flex overflow-x-auto space-x-4 pb-1 scrollbar-none">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative flex-none w-72 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
            >
              <Link
                className="relative mx-3 flex flex-col h-60 overflow-hidden rounded-xl"
                to={"/"}
              >
                <div className="overflow-y-scroll h-60 custom-scrollbar">
                  {product.productImage.map((img, index) => (
                    <img
                      key={index}
                      className="object-scale-down h-full w-full"
                      src={img}
                      alt={product.productName}
                    />
                  ))}
                </div>
                <span className="absolute top-0 left-0 m-2 rounded-full bg-indigo-600 px-2 py-1 text-center text-sm font-medium text-white">
                  {Math.round(
                    ((product.price - product.sellingPrice) / product.price) *
                      100
                  )}
                  % OFF
                </span>
              </Link>
              <div className="mt-1 px-3 pb-3">
                <Link to={"/"}>
                  <h5 className="text-md tracking-tight font-semibold text-slate-700 text-ellipsis line-clamp-2">
                    {product.productName}
                  </h5>
                </Link>
                <div className="mt-2 mb-2 flex items-center justify-between">
                  <p>
                    <span className="text-xl font-bold text-slate-900">
                      {displayInr(product.sellingPrice)}
                    </span>
                    <span className="text-sm text-slate-900 line-through px-1">
                      {displayInr(product.price)}
                    </span>
                  </p>
                </div>
                <Link
                  to="#"
                  className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <MdOutlineShoppingCart size={20} />
                  Add to cart
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsCardWith;
