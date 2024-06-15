import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getCartItems, removeFromCart, updateCartItems } from "../api/api";
import { Link } from "react-router-dom";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import displayInr from "../data/IndCur";
import { FaRegHeart } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaLongArrowAltRight } from "react-icons/fa";
import { decrementCartItemCount } from "../redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { count } = useSelector((state) => state.cart);

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

  //*********** CALCULATE TAX **************/
  const tax = Math.round(((calculatePrice - calculateDiscount) / 100) * 2);

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
            <section className="bg-white py-4 antialiased md:py-8">
              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                  Shopping Cart
                </h2>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
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
                  <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                      <p className="text-xl font-semibold text-gray-900">
                        Order summary
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Original price ({count} item)
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                              {displayInr(calculatePrice)}
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Savings
                            </dt>
                            <dd className="text-base font-medium text-green-600">
                              -{displayInr(calculateDiscount)}
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Store Pickup
                            </dt>
                            <dd className="text-base font-medium text-green-600">
                              Free
                            </dd>
                          </dl>
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Tax (2%)
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                              {displayInr(tax)}
                            </dd>
                          </dl>
                        </div>
                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                          <dt className="text-base font-bold text-gray-900">
                            Total
                          </dt>
                          <dd className="text-base font-bold text-gray-900">
                            {displayInr(
                              calculatePrice - calculateDiscount + tax
                            )}
                          </dd>
                        </dl>
                      </div>
                      <Link
                        to="/"
                        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                      >
                        Proceed to Checkout
                      </Link>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-normal text-gray-500">
                          {" "}
                          or{" "}
                        </span>
                        <Link
                          to="/"
                          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 underline hover:no-underline"
                        >
                          Continue Shopping
                          <FaLongArrowAltRight />
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                      <form className="space-y-4">
                        <div>
                          <label
                            htmlFor="voucher"
                            className="mb-2 block text-sm font-medium text-gray-900"
                          >
                            {" "}
                            Do you have a voucher or gift card?{" "}
                          </label>
                          <input
                            type="text"
                            id="voucher"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                          />
                        </div>
                        <button
                          type="button"
                          className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                        >
                          Apply Code
                        </button>
                      </form>
                    </div>
                  </div>
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
