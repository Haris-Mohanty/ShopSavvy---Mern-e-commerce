import React, { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import OrderSummery from "../components/OrderSummery";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { createAddress, getCartItems } from "../api/api";
import { toast } from "react-toastify";
import axios from "axios";

const Address = () => {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [houseNo, setHouseNo] = useState("");
  const [area, setArea] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [landmark, setLandmark] = useState("");

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

  //************ CREATE NEW ADDRESS **********/
  const handleCreateNewAddress = async (e) => {
    e.preventDefault();
    const data = {
      houseNo,
      area,
      postalCode,
      district,
      state,
      country,
      phoneNumber,
      landmark,
    };
    try {
      dispatch(showLoading());
      const res = await createAddress(data);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  //************ FETCH LOCATION DETAILS **********/
  const fetchLocationDetails = async (postalCode) => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        process.env.REACT_APP_POSTAL_API + postalCode
      );
      const data = response.data[0].PostOffice[0];
      dispatch(hideLoading());

      if (response.status === 200 && data) {
        setDistrict(data.District || "");
        setState(data.State || "");
        setCountry(data.Country || "India");
      } else {
        toast.error("Invalid postal code");
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error("Invalid postal code");
    }
  };

  useEffect(() => {
    fetchCartItems();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (postalCode.length === 6) {
      fetchLocationDetails(postalCode);
    }
    //eslint-disable-next-line
  }, [postalCode]);

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
                <form onSubmit={handleCreateNewAddress} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                    <div>
                      <label
                        htmlFor="houseNo"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        House No*
                      </label>
                      <input
                        type="text"
                        value={houseNo}
                        onChange={(e) => setHouseNo(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter House No"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="area"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Area*{" "}
                      </label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter area / colony"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="postalCode"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Postal Code*{" "}
                      </label>
                      <input
                        type="number"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter postal code"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="district"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        District*{" "}
                      </label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter district name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="state"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        State*{" "}
                      </label>
                      <input
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter state name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Country*{" "}
                      </label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter country name"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNo"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        {" "}
                        Phone Number*{" "}
                      </label>
                      <div className="flex items-center">
                        <button
                          className="items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100"
                          type="button"
                        >
                          +91
                        </button>
                        <div className="relative w-full">
                          <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="z-20 block w-full rounded-e-lg border border-s-0 border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                            pattern="[0-9]{10}"
                            placeholder="Enter Phone Number"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="landmark"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Landmark
                      </label>
                      <input
                        type="text"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                        placeholder="Enter landmark place"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
                      >
                        Add new address
                      </button>
                    </div>
                  </div>
                </form>
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
