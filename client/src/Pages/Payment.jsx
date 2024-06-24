import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import {
  clearCartItems,
  createPayment,
  getCartItems,
  verifyPayment,
} from "../api/api";
import { toast } from "react-toastify";
import displayInr from "../data/IndCur";
import { Link, useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import { clearCartItemCount } from "../redux/cartSlice";
import paymentLogo from "../Assets/paymentLogo.png";

const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { address } = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const { count } = useSelector((state) => state.cart);

  const [paymentMethod, setPaymentMethod] = useState(null);

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

  //************ FETCH CART ITMS **********/
  const clearCart = async () => {
    try {
      await clearCartItems();
      dispatch(clearCartItemCount());
    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCartItems();
    //eslint-disable-next-line
  }, []);

  const calculatePrice = cartItems?.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );
  const calculateDiscount = cartItems?.reduce(
    (total, item) =>
      total +
      (item.productId.price - item.productId.sellingPrice) * item.quantity,
    0
  );
  const tax = Math.round(((calculatePrice - calculateDiscount) / 100) * 2);
  const totalPrice = calculatePrice - calculateDiscount + tax;

  //************ HANDLE PLACE ORDER OR MAKE PAYMENT **********/
  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please select an address");
      navigate("/address");
      return;
    }

    if (paymentMethod === null) {
      toast.error("Please select a payment method");
      return;
    }

    const orderData = {
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      amount: totalPrice,
      paymentMethod,
      addressId: address,
    };

    try {
      dispatch(showLoading());
      const res = await createPayment(orderData);
      dispatch(hideLoading());
      if (!res.success) {
        toast.error("Failed to place order");
        return;
      }

      if (paymentMethod === "Cash On Delivery") {
        toast.success("Order placed successfully!");
        navigate("/my-orders");
        clearCart();
      } else if (paymentMethod === "Online") {
        const { paymentId, amount } = res.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: "INR",
          name: "Shop Savvy",
          description: "Shop Smart, Shop Savvy",
          image: paymentLogo,
          order_id: paymentId,
          handler: async function (response) {
            try {
              const paymentData = {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              };
              dispatch(showLoading());
              const paymentRes = await verifyPayment(paymentData);
              dispatch(hideLoading());

              if (paymentRes.success) {
                toast.success("Order placed successfully!");
                navigate("/my-orders");
                clearCart();
              } else {
                toast.error("Payment verification failed");
              }
            } catch (err) {
              dispatch(hideLoading());
              toast.error(
                err?.response?.data?.message || "Payment verification failed"
              );
            }
          },
          prefill: {
            name: "Shop Savvy",
            email: "shop@savvy.com",
            contact: "9000010000",
          },
          notes: {
            address: "New Delhi",
          },
          theme: {
            color: "#3F51B5",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", (response) => {
          toast.error("Payment failed");
        });
        rzp.open();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-16">
        <section className="bg-white py-6 antialiased">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
              <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <Link
                  to={"/cart"}
                  className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden"
                >
                  <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                  Cart
                </Link>
              </li>
              <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <Link
                  to={"/address"}
                  className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden"
                >
                  <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                  Checkout
                </Link>
              </li>
              <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full">
                <span className="flex items-center after:mx-2 after:text-gray-200 sm:after:hidden">
                  <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                  Payment
                </span>
              </li>
            </ol>

            <div className="mt-4 sm:mt-4 lg:flex lg:items-start lg:gap-8 xl:gap-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
                Payment Details
              </h2>
            </div>

            <div className="sm:mt-6 md:gap-4 lg:flex lg:items-start xl:gap-4">
              {/***************** PAYMENT DETAILS ************************/}
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="border border-gray-300 p-4 rounded-lg text-center">
                  <div className="border border-gray-300 p-4 rounded-lg text-center">
                    <h3 className="text-xl mb-4 font-bold text-gray-500">
                      Select Payment Method
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <button
                        className={`p-4 border font-semibold rounded-lg ${
                          paymentMethod === "Online"
                            ? "border-primary-700 bg-primary-50"
                            : "border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("Online")}
                      >
                        Online Payment
                      </button>
                      <button
                        className={`p-4 border font-semibold rounded-lg ${
                          paymentMethod === "Cash On Delivery"
                            ? "border-primary-700 bg-primary-50"
                            : "border-gray-300"
                        }`}
                        onClick={() => setPaymentMethod("Cash On Delivery")}
                      >
                        Cash on Delivery
                      </button>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl mb-2 font-bold text-gray-500 mt-4">
                      Cart Items
                    </h3>
                    {cartItems &&
                      cartItems.map((item) => (
                        <div
                          key={item.productId._id}
                          className="flex border border-gray-300 p-4 rounded-lg text-center mb-2 justify-between"
                        >
                          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                            <img
                              src={item.productId.productImage[0]}
                              alt={item.productId.productName}
                              className="h-20 w-20 object-scale-down mix-blend-multiply"
                            />
                            <div className="ml-2">
                              <h4 className="text-lg font-semibold text-gray-900 text-left text-ellipsis line-clamp-1">
                                {item.productId.productName}
                              </h4>
                              <p className="text-sm text-gray-600 mt-1 text-left text-ellipsis line-clamp-2">
                                {item.productId.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex-col">
                            <div className="mt-2 mb-2 flex items-center justify-between">
                              <p>
                                <span className="text-base font-bold text-slate-900">
                                  {displayInr(item.productId.price)}
                                </span>
                                <span className="text-xs text-slate-900 line-through px-1">
                                  {displayInr(
                                    item.productId.sellingPrice * item.quantity
                                  )}
                                </span>
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 font-semibold">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/***************** ORDER SUMMERY ************************/}
              <div className="mx-auto max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
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
                        {displayInr(totalPrice)}
                      </dd>
                    </dl>
                  </div>
                  <button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>
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
    </>
  );
};

export default Payment;
