import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import OrderSummery from "../components/OrderSummery";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getAddresses, getCartItems } from "../api/api";
import { toast } from "react-toastify";
import { FiAlertCircle } from "react-icons/fi";
import AddressList from "../components/AddressList";
import AddressForm from "../components/AddressForm";

const Address = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);

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

  //************ FETCH CREATED ADDRESSES **********/
  const fetchCreatedAddresses = async () => {
    try {
      dispatch(showLoading());
      const res = await getAddresses();
      dispatch(hideLoading());
      if (res.success) {
        setAddresses(res.data);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCartItems();
    fetchCreatedAddresses();
    //eslint-disable-next-line
  }, []);

  //***** CALCULATE ORIGINAL PRICE *******/
  const calculatePrice = cartItems?.reduce(
    (total, item) => total + item.productId.price * item.quantity,
    0
  );

  //***** CALCULATE SAVING (DISCOUNT) *********/
  const calculateDiscount = cartItems?.reduce(
    (total, item) =>
      total +
      (item.productId.price - item.productId.sellingPrice) * item.quantity,
    0
  );

  return (
    <>
      <div className="container mx-auto mt-16">
        <section className="bg-white py-6 antialiased">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 sm:text-base">
              <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                  <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                  Cart
                </span>
              </li>
              <li className="after:border-1 flex items-center text-primary-700 font-bold after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] sm:after:hidden">
                  <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5 stroke-2" />
                  Checkout
                </span>
              </li>
              <li className="flex shrink-0 items-center">
                <CiCircleCheck className="me-2 h-4 w-4 sm:h-5 sm:w-5" />
                Payment
              </li>
            </ol>

            <div className="mt-4 sm:mt-4 lg:flex lg:items-start lg:gap-8 xl:gap-10">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 md:mb-0">
                Delivery Details
              </h2>
            </div>

            <div className="sm:mt-6 md:gap-4 lg:flex lg:items-start xl:gap-4">
              {/***************** DELIVERY ADDRESS ************************/}
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                {/************** DELIVERY ADDRESS AVAILABLE *****************/}
                {!showForm && (
                  <div>
                    {addresses?.length > 0 ? (
                      <AddressList
                        addresses={addresses}
                        setShowForm={setShowForm}
                      />
                    ) : (
                      <div className="border border-gray-300 p-4 rounded-lg text-center">
                        <FiAlertCircle className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                        <p className="text-gray-500">No addresses available.</p>
                        <p className="text-sm text-gray-700 mt-2">
                          Please add a new address to make order!
                        </p>
                        <button
                          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                          onClick={() => setShowForm(true)}
                        >
                          Add New Address
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/***************** ADDRESS FORM ************************/}
                {showForm && (
                  <AddressForm
                    setShowForm={setShowForm}
                    fetchCreatedAddresses={fetchCreatedAddresses}
                    buttonName={"Add new address"}
                  />
                )}
              </div>

              {/***************** ORDER SUMMERY ************************/}
              <OrderSummery
                calculatePrice={calculatePrice}
                calculateDiscount={calculateDiscount}
                buttonName={"Proceed to Payment"}
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Address;
