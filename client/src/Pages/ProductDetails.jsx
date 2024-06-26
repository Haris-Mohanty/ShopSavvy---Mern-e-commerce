import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { toast } from "react-toastify";
import { getProductDetails } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import displayInr from "../data/IndCur";
import { MdOutlineShoppingCart, MdOutlineLocalMall } from "react-icons/md";
import RecommendedProducts from "../components/RecommendedProducts";
import itemsAddToCart from "../data/itemsAddToCart";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);

  //************** FETCH PRODUCT DETAILS ***********/
  const fetchProductDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getProductDetails(id);
      dispatch(hideLoading());
      if (res.success) {
        setProduct(res.data);
        setActiveImage(res.data.productImage[0]);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //********************** HANDLE ACTIVE IMAGE SHOW ***********/
  const handleActiveImageShow = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  useEffect(() => {
    fetchProductDetails();
    //eslint-disable-next-line
  }, [id]);

  //************  HANDLE SHOW DESCRIPTION ********/
  const handleShowMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  //************  HANDLE ZOOM PRODUCT IMAGE ********/
  const handleZoomImage = (e) => {
    setZoomImage(true);
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomImageCoordinate({ x, y });
  };

  //************  HANDLE BUY PRODUCT ********/
  const handleBuyNow = async (id, dispatch) => {
    await itemsAddToCart(id, dispatch);
    navigate("/cart");
  };

  return (
    <>
      <div className="container mx-auto mt-20 px-4 md:px-8 mb-8">
        <div className="min-h-[200px] flex flex-col md:flex-row gap-4">
          {/************* PRODUCT IMAGE *******/}
          <div className="h-96 flex flex-col md:flex-row-reverse gap-4">
            <div className="h-[300px] w-[343px] md:h-96 md:w-92 bg-slate-200 rounded-lg shadow-lg relative p-2">
              {activeImage ? (
                <>
                  <img
                    src={activeImage}
                    alt="Product Images"
                    className="w-full h-full object-scale-down mix-blend-multiply cursor-move"
                    onMouseMove={handleZoomImage}
                    onMouseLeave={() => setZoomImage(false)}
                  />
                  {/* Product Zoom */}
                  {zoomImage && (
                    <div className="hidden md:block absolute min-w-[500px] min-h-[400px] rounded-lg bg-slate-200 overflow-hidden -right-[515px] top-0 shadow-lg">
                      <div
                        className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                        style={{
                          backgroundImage: `url(${activeImage})`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: `${
                            zoomImageCoordinate.x * 100
                          }% ${zoomImageCoordinate.y * 100}%`,
                        }}
                      ></div>
                    </div>
                  )}
                </>
              ) : (
                <Skeleton width="100%" height="100%" />
              )}
            </div>

            <div className="h-full">
              <div className="flex gap-2 md:flex-col overflow-scroll h-full scrollbar-none">
                {product
                  ? product.productImage.map((image, index) => (
                      <div
                        key={index}
                        className="h-20 w-20 bg-slate-200 p-1 rounded"
                      >
                        <img
                          src={image}
                          className="w-full h-full cursor-pointer object-scale-down mix-blend-multiply"
                          onMouseEnter={() => handleActiveImageShow(image)}
                          alt={`Product ${index + 1}`}
                        />
                      </div>
                    ))
                  : Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-20 w-20 bg-slate-200 p-1 rounded"
                      >
                        <Skeleton width="100%" height="100%" />
                      </div>
                    ))}
              </div>
            </div>
          </div>
          {/************* PRODUCT DETAIL *******/}
          <div className="flex-1 p-4 md:p-1">
            <p className="bg-indigo-500 text-white px-3 py-1 inline-block rounded-full uppercase tracking-wide">
              {product ? product.brandName : <Skeleton width={100} />}
            </p>
            <h2 className="text-lg md:text-3xl font-bold md:font-semibold text-gray-800">
              {product ? (
                product.productName
              ) : (
                <Skeleton width={1000} count={2} />
              )}
            </h2>
            <p className="capitalize text-slate-400 mt-1">
              {product ? product.category : <Skeleton width={100} />}
            </p>
            <p className="mt-1 text-indigo-500 font-bold">Special Price</p>
            <div className="mb-2 flex items-baseline">
              {product ? (
                <>
                  <span className="text-2xl font-bold text-slate-900">
                    {displayInr(product.sellingPrice)}
                  </span>
                  <span className="text-sm text-slate-900 line-through ml-2">
                    {displayInr(product.price)}
                  </span>
                  <span className="ml-2 text-sm font-bold text-indigo-700">
                    {Math.round(
                      ((product.price - product.sellingPrice) / product.price) *
                        100
                    )}
                    % OFF
                  </span>
                </>
              ) : (
                <Skeleton width={200} />
              )}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                onClick={() => handleBuyNow(product?._id, dispatch)}
                className="flex items-center gap-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition duration-300"
              >
                <MdOutlineLocalMall size={22} />
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => itemsAddToCart(product?._id, dispatch)}
                className="flex items-center gap-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600 transition duration-300"
              >
                <MdOutlineShoppingCart size={22} />
                Add to Cart
              </button>
            </div>
            <div className="mt-3">
              <p className="text-md text-gray-800 font-semibold">
                Description:
              </p>
              <span className="text-gray-600 text-sm md:text-base">
                {product ? (
                  showFullDescription ? (
                    product?.description
                  ) : (
                    <>
                      {product.description.slice(0, 500)}...
                      <button
                        onClick={handleShowMore}
                        className="text-indigo-500 font-semibold ml-2"
                      >
                        Show More
                      </button>
                    </>
                  )
                ) : (
                  <Skeleton count={5} />
                )}
              </span>
              {showFullDescription && (
                <button
                  onClick={handleShowMore}
                  className="text-indigo-500 font-semibold ml-2"
                >
                  Show Less
                </button>
              )}
            </div>
          </div>
        </div>

        {/**************** RECOMMENDED PRODUCTS */}
        {product && (
          <RecommendedProducts
            category={product?.category}
            heading={"Recommended Products"}
          />
        )}
      </div>
    </>
  );
};

export default ProductDetails;
