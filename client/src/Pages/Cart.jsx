import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getCartItems } from "../api/api";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchCartItems();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="container mx-auto mt-16 px-4">
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
          <div>Cart</div>
        )}
      </div>
    </>
  );
};

export default Cart;
