import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { searchProduct } from "../api/api";
import { BsExclamationCircle } from "react-icons/bs";
import displayInr from "../data/IndCur";
import { MdOutlineShoppingCart } from "react-icons/md";
import itemsAddToCart from "../data/itemsAddToCart";

const SearchProductShow = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchQuery = query.get("q");
  const [searchResults, setSearchResults] = useState([]);

  //******* FETCH SEARCH PRODUCT *******/
  const fetchSearchProducts = async () => {
    try {
      dispatch(showLoading());
      const res = await searchProduct(searchQuery);
      dispatch(hideLoading());
      if (res.success) {
        setSearchResults(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchSearchProducts();
  }, [searchQuery]);

  return (
    <>
      <div className="container mx-auto mt-16 px-4">
        <div className="flex">
          <h1 className="text-lg md:text-2xl font-semibold mt-5 pl-2 md:pl-5">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-base md:text-lg italic text-indigo-500 font-bold mt-5 ml-5">
            {searchResults.length} Items
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-5">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] border border-gray-200 rounded-lg bg-gray-100">
              <BsExclamationCircle className="text-4xl text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-600">
                No products found
              </p>
            </div>
          ) : (
            searchResults.map((item) => (
              <div
                key={item._id}
                className="relative flex-none w-40 md:w-80 max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
              >
                <Link
                  className="relative mx-3 flex flex-col h-24 md:h-60 overflow-hidden rounded-xl"
                  to={`/product-details/${item._id}`}
                //   onClick={scrollTop}
                >
                  <div className="overflow-y-scroll h-24 md:h-60 custom-scrollbar">
                    {item.productImage.map((img, index) => (
                      <img
                        key={index}
                        className="object-scale-down h-full w-full"
                        src={img}
                        alt={item.productName}
                      />
                    ))}
                  </div>
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-indigo-600 px-2 py-1 text-center text-xs md:text-sm font-medium text-white">
                    {Math.round(
                      ((item.price - item.sellingPrice) / item.price) * 100
                    )}
                    % OFF
                  </span>
                </Link>
                <div className="mt-1 px-3 pb-3">
                  <Link to={`/product-details/${item._id}`}>
                    <h5 className="md:text-md text-sm tracking-tight font-semibold text-slate-700 text-ellipsis line-clamp-2 hover:text-indigo-600">
                      {item.productName}
                    </h5>
                  </Link>
                  <div className="mt-2 mb-2 flex items-center justify-between">
                    <p>
                      <span className="text-sm md:text-xl font-bold text-slate-900">
                        {displayInr(item.sellingPrice)}
                      </span>
                      <span className="text-xs md:text-sm text-slate-900 line-through px-1">
                        {displayInr(item.price)}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => itemsAddToCart(item?._id, dispatch)}
                    className="w-full flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-center text-xs md:text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                  >
                    <MdOutlineShoppingCart size={20} />
                    <span className="ml-2">Add to cart</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SearchProductShow;
