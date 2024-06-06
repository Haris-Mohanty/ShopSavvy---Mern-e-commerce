import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getProductCategory } from "../api/api";
import { toast } from "react-toastify";

const CategoryList = () => {
  const dispatch = useDispatch();
  const [categoryProduct, setCategoryProduct] = useState([]);

  // ******* FETCH CATEGORY PRODUCT *************/
  const fetchCategoryProduct = async () => {
    try {
      dispatch(showLoading());
      const res = await getProductCategory();
      dispatch(hideLoading());
      if (res.success) {
        setCategoryProduct(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-4 justify-between">
          {categoryProduct.map((product) => (
            <div key={product?._id} className="p-2">
              <div className="w-15 h-15 md:w-20 md:h-20 rounded-full overflow-hidden p-3 bg-white flex items-center justify-center">
                <img
                  src={product?.productImage[0]}
                  alt={product?.category}
                  className="h-full object-fill"
                />
              </div>
              <p className="text-xs text-center md:text-sm">
                {product?.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryList;
