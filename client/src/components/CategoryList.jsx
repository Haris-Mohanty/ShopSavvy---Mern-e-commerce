import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getProductCategory } from "../api/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // ******* FETCH CATEGORY PRODUCT *************/
  const fetchCategoryProduct = async () => {
    try {
      dispatch(showLoading());
      const res = await getProductCategory();
      dispatch(hideLoading());
      if (res.success) {
        setCategoryProduct(res.data);
      }
      setLoading(false);
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 mt-16">
        <div className="flex items-center gap-4 justify-between overflow-x-scroll scrollbar-none">
          {loading
            ? Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="cursor-pointer">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center shadow-lg">
                    <Skeleton circle={true} height={80} width={80}  />
                  </div>
                  <p className="text-sm capitalize text-center md:text-base mt-2 text-gray-700">
                    <Skeleton width="80%" />
                  </p>
                </div>
              ))
            : categoryProduct.map((product) => (
                <Link
                  to={`product-category/${product?.category}`}
                  key={product?._id}
                  className="cursor-pointer"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-white flex items-center justify-center shadow-lg transition-transform transform hover:scale-105">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply"
                    />
                  </div>
                  <p className="text-sm capitalize text-center md:text-base mt-2 text-gray-700">
                    {product?.category}
                  </p>
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
