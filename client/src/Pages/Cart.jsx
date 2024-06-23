import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getCartItems, removeFromCart, updateCartItems } from "../api/api";
import { Link } from "react-router-dom";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import displayInr from "../data/IndCur";
import { FaRegHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { decrementCartItemCount } from "../redux/cartSlice";
import { CiCircleCheck } from "react-icons/ci";
import OrderSummery from "../components/OrderSummery";

const Cart = () => {
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);

  //************ FETCH CART ITMS **********/
  const fetchCartItems = async () => {
    try {
      dispatch(showLoading());
      const res = await getCartItems();
      dispatch(hideLoading());
      if (res.success) {
        setCartItems(res.items);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //************ UPDATE CART ITEMS (INCREASE, DECREASE) **********/
  const updateCartItem = async (productId, action) => {
    try {
      dispatch(showLoading());
      const res = await updateCartItems(productId, action);
      dispatch(hideLoading());
      if (res.success) {
        //Update cart item (quantity)
        const updatedCartItems = cartItems.map((item) => {
          if (item.productId._id === productId) {
            return {
              ...item,
              quantity: res.cartItem.quantity,
            };
          }
          return item;
        });
        setCartItems(updatedCartItems);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //********* REMOVE ITEM FROM CART ********/
  const removeItemFromCart = async (cartItemId) => {
    try {
      dispatch(showLoading());
      const res = await removeFromCart(cartItemId);
      dispatch(hideLoading());
      if (res.success) {
        //Filter out the removed item
        const updateCartItems = cartItems.filter(
          (item) => item._id !== cartItemId
        );
        setCartItems(updateCartItems);
        dispatch(decrementCartItemCount());
        toast.success("Item removed successfully!");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
    //eslint-disable-next-line
  }, []);

  //*********** CALCULATE ORIGINAL PRICE **************/
  const calculatePrice = cartItems?.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  //*********** CALCULATE SAVING (DISCOUNT) **************/
  const calculateDiscount = cartItems?.reduce(
    (total, item) =>
      total +
      (item.productId.price - item.productId.sellingPrice) * item.quantity,
    0
  );

  return (
    <>
      <div className="container mx-auto mt-16">
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="mb-4 text-gray-500 px-4">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/"
              className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div>
            <section className="bg-white py-6 antialiased">
              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
                  <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                      <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                      Cart
                    </span>
                  </li>
                  <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                    <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                      <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Checkout
                    </span>
                  </li>
                  <li className="flex shrink-0 items-center">
                    <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Payment
                  </li>
                </ol>

                <div className="mt-4 sm:mt-4 lg:flex lg:items-start lg:gap-8 xl:gap-10">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shopping Cart
                  </h2>
                </div>

                <div className="sm:mt-6 md:gap-4 lg:flex lg:items-start xl:gap-4">
                  {/***************** SHOPPING CART ************************/}
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.productId._id}
                          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
                        >
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <Link
                              to={`/product-details/${item.productId._id}`}
                              className="shrink-0 md:order-1"
                            >
                              <img
                                className="h-20 w-20 object-scale-down mix-blend-multiply"
                                src={item.productId.productImage[0]}
                                alt={item.productId.productName}
                              />
                            </Link>
                            <label htmlFor="counter-input" className="sr-only">
                              Choose quantity:
                            </label>
                            <div className="flex items-center justify-between md:order-3 md:justify-end">
                              <div className="flex items-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartItem(
                                      item.productId._id,
                                      "decrease"
                                    )
                                  }
                                  id="decrement-button"
                                  data-input-counter-decrement="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                >
                                  <HiMinusSm />
                                </button>
                                <input
                                  type="text"
                                  id="counter-input"
                                  data-input-counter
                                  className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartItem(
                                      item.productId._id,
                                      "increase"
                                    )
                                  }
                                  id="increment-button"
                                  data-input-counter-increment="counter-input"
                                  className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
                                >
                                  <HiPlusSm />
                                </button>
                              </div>
                              <div className="text-end md:order-4 md:w-32">
                                <p className="text-sm text-slate-900 line-through">
                                  {displayInr(item?.productId.price)}
                                </p>
                                <p className="text-lg font-bold text-gray-900">
                                  {displayInr(
                                    item.productId.sellingPrice * item.quantity
                                  )}
                                </p>
                                <p className="text-sm font-bold text-indigo-700">
                                  {Math.round(
                                    ((item?.productId?.price -
                                      item?.productId?.sellingPrice) /
                                      item?.productId.price) *
                                      100
                                  )}
                                  % OFF
                                </p>
                              </div>
                            </div>
                            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                              <Link
                                to={`/product-details/${item.productId._id}`}
                                className="text-base font-medium text-gray-900 hover:underline"
                              >
                                {item.productId.productName}
                              </Link>
                              <div className="flex items-center gap-4">
                                <button
                                  type="button"
                                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
                                >
                                  <FaRegHeart className="mr-1" size={22} />
                                  Add to Favorites
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeItemFromCart(item?._id)}
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                                >
                                  <IoClose className="mr-1" size={24} />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/***************** ORDER SUMMERY ************************/}
                  <OrderSummery
                    calculatePrice={calculatePrice}
                    calculateDiscount={calculateDiscount}
                    buttonName={"Proceed to Checkout"}
                    link={"/address"}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
