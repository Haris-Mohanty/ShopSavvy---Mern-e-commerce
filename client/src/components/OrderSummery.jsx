import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import displayInr from "../data/IndCur";
import { Link } from "react-router-dom";

const OrderSummery = ({ calculatePrice, calculateDiscount }) => {
  const { count } = useSelector((state) => state.cart);

  //*********** CALCULATE TAX **************/
  const tax = Math.round(((calculatePrice - calculateDiscount) / 100) * 2);

  return (
    <>
      <div className="mx-auto max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          <p className="text-xl font-semibold text-gray-900">Order summary</p>
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
                <dt className="text-base font-normal text-gray-500">Savings</dt>
                <dd className="text-base font-medium text-green-600">
                  -{displayInr(calculateDiscount)}
                </dd>
              </dl>
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-base font-normal text-gray-500">
                  Store Pickup
                </dt>
                <dd className="text-base font-medium text-green-600">Free</dd>
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
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-base font-bold text-gray-900">
                {displayInr(calculatePrice - calculateDiscount + tax)}
              </dd>
            </dl>
          </div>
          <Link
            to="/address"
            className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Proceed to Checkout
          </Link>
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-normal text-gray-500"> or </span>
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
    </>
  );
};

export default OrderSummery;
