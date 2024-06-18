import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { filterProduct } from "../api/api";
import displayInr from "../data/IndCur";
import itemsAddToCart from "../data/itemsAddToCart";

const ProductCategory = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [priceSort, setPriceSort] = useState("");
  const [dateSort, setDateSort] = useState("");
  const [categories, setCategories] = useState([]);

  // Initialize categories with default category from params
  useEffect(() => {
    if (params.categoryName) {
      setCategories([params.categoryName]); // Set default category from URL params
    }
  }, [params.categoryName]);

  const categorieList = [
    "airpodes",
    "camera",
    "earphones",
    "mobiles",
    "Mouse",
    "printers",
    "processor",
    "refrigerator",
    "speakers",
    "trimmers",
    "televisions",
    "watches",
  ];

  // Fetch Filtered Products
  const fetchFilteredProducts = async () => {
    try {
      dispatch(showLoading());
      const res = await filterProduct(categories, priceSort, dateSort);
      dispatch(hideLoading());
      if (res.success) {
        setProducts(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchFilteredProducts();
    //eslint-disable-next-line
  }, [categories, priceSort, dateSort]);

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  return (
    <>
      <div className="container mx-auto mt-16">
        {/********** FOR DESKTOP *************/}
        <div className="hidden md:grid grid-cols-[200px,1fr] gap-4">
          {/* Left Side */}
          <div className="bg-white px-6 py-2 shadow-lg rounded-lg min-h-[calc(100vh-70px)]">
            <h3 className="text-2xl font-semibold text-slate-900 text-center">
              Filter
            </h3>
            <hr />
            <div className="mb-2">
              <h3 className="text-lg font-semibold my-2 text-indigo-500">
                Price
              </h3>
              <div className="flex flex-col space-y-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="sort"
                    value="low-to-high"
                    checked={priceSort === "low-to-high"}
                    onChange={(e) => setPriceSort(e.target.value)}
                  />
                  <span className="ml-2 hover:text-indigo-500">
                    Low to High
                  </span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="sort"
                    value="high-to-low"
                    checked={priceSort === "high-to-low"}
                    onChange={(e) => setPriceSort(e.target.value)}
                  />
                  <span className="ml-2 hover:text-indigo-500">
                    High to Low
                  </span>
                </label>
              </div>
            </div>
            <div className="mb-2">
              <h3 className="text-lg font-semibold my-2 text-indigo-500">
                Date
              </h3>
              <div className="flex flex-col space-y-1">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="date"
                    value="newest"
                    checked={dateSort === "newest"}
                    onChange={(e) => setDateSort(e.target.value)}
                  />
                  <span className="ml-2 hover:text-indigo-500">Newest</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="radio"
                    className="form-radio cursor-pointer"
                    name="date"
                    value="oldest"
                    checked={dateSort === "oldest"}
                    onChange={(e) => setDateSort(e.target.value)}
                  />
                  <span className="ml-2 hover:text-indigo-500">Oldest</span>
                </label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-indigo-500">
                Category
              </h3>
              <div className="flex flex-col space-y-2">
                {categorieList.map((category) => (
                  <label
                    key={category}
                    className="inline-flex items-center cursor-pointer capitalize"
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox text-indigo-600 cursor-pointer"
                      value={category}
                      checked={categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="ml-2 hover:text-indigo-500">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side (product display) */}
          <div>
            <h2 className="text-2xl font-semibold my-4 ml-4">
              Filtered Products: {products.length}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4 h-[calc(100vh-140px)] overflow-y-scroll scrollbar-none">
              {products.length > 0 ? (
                products.map((product) => (
                  <div
                    key={product._id}
                    className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl md:w-64 lg:w-[19rem]"
                  >
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64">
                      <Link
                        className="mx-3 flex flex-col h-64 overflow-hidden rounded-xl"
                        to={`/product-details/${product._id}`}
                      >
                        <div className="overflow-y-scroll h-64 scrollbar-none">
                          {product.productImage.map((img, index) => (
                            <img
                              key={index}
                              className="object-scale-down h-full w-full"
                              src={img}
                              alt={product.productName}
                            />
                          ))}
                        </div>
                      </Link>
                    </div>
                    <div className="p-4">
                      <div className="mb-2">
                        <Link
                          to={`/product-details/${product._id}`}
                          className="font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900 text-ellipsis line-clamp-1 hover:text-indigo-600 cursor-pointer mb-2"
                        >
                          {product.productName}
                        </Link>
                        <p>
                          <span className="text-xl font-bold text-indigo-500">
                            {displayInr(product.sellingPrice)}
                          </span>
                          <span className="text-sm text-indigo-400 line-through px-2">
                            {displayInr(product.price)}
                          </span>
                        </p>
                      </div>
                      <p className="font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75 text-ellipsis line-clamp-3 mt-1">
                        {product.description}
                      </p>
                    </div>
                    <div className="p-6 pt-0">
                      <button
                        type="button"
                        onClick={() => itemsAddToCart(product?._id, dispatch)}
                        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-1 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center py-6">
                  <div className="max-w-lg mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                      No Products Found!
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      We couldn't find any products matching your filters.
                    </p>
                    <Link
                      to="/"
                      className="inline-block bg-indigo-500 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-600 transition-colors duration-300"
                    >
                      Go back to home
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategory;
