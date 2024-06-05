import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getAllProducts } from "../api/api";
import { toast } from "react-toastify";
import ShowProductCard from "../components/ShowProductCard";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  //****************** FETCH ALL PRODUCTS ************/
  const fetchAllProducts = async () => {
    try {
      dispatch(showLoading());
      const res = await getAllProducts();
      dispatch(hideLoading());
      if (res.success) {
        setAllProducts(res.allProducts);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="shadow-md">
        <div className="flex shadow-lg rounded-sm justify-between items-center py-4 px-2 bg-white">
          <h1 className="text-3xl font-semibold text-indigo-500">
            ALL PRODUCTS
          </h1>
          <button
            className="border py-2 px-4 rounded-full border-indigo-600 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-all"
            aria-label="Upload Product"
            onClick={() => setOpenUploadProduct(true)}
          >
            Upload Product
          </button>
        </div>

        {/************* SHOW ALL PRODUCTS *************/}
        <div className="p-4 h-[calc(100vh-160px)] overflow-y-scroll custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.map((product) => (
              <ShowProductCard
                product={product}
                key={product._id}
                fetchAllProducts={fetchAllProducts}
              />
            ))}
          </div>
        </div>

        {/************* UPLOAD PRODUCT COMPONENT **************/}
        {openUploadProduct && (
          <UploadProduct
            onClose={() => setOpenUploadProduct(false)}
            fetchAllProducts={fetchAllProducts}
          />
        )}
      </div>
    </>
  );
};

export default AllProducts;
