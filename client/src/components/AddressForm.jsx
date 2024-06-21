import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { createAddress, updateAddresses } from "../api/api";
import { toast } from "react-toastify";
import axios from "axios";

const AddressForm = ({
  setShowForm,
  fetchCreatedAddresses,
  buttonName,
  address,
}) => {
  const dispatch = useDispatch();

  const [houseNo, setHouseNo] = useState(address ? address.houseNo : "");
  const [area, setArea] = useState(address ? address.area : "");
  const [postalCode, setPostalCode] = useState(
    address ? address.postalCode : ""
  );
  const [district, setDistrict] = useState(address ? address.district : "");
  const [state, setState] = useState(address ? address.state : "");
  const [country, setCountry] = useState(address ? address.country : "");
  const [phoneNumber, setPhoneNumber] = useState(
    address ? address.phoneNumber : ""
  );
  const [landMark, setLandmark] = useState(address ? address.landMark : "");

  //************ CREATE NEW ADDRESS || UPDATE ADDRESS **********/
  const handleAddress = async (e) => {
    e.preventDefault();
    const data = {
      houseNo,
      area,
      postalCode,
      district,
      state,
      country,
      phoneNumber,
      landMark,
    };
    try {
      dispatch(showLoading());
      const res = address
        ? await updateAddresses(address._id, data)
        : await createAddress(data);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
        fetchCreatedAddresses();
        setShowForm(false);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
      console.log(err);
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
    if (postalCode.length === 6) {
      fetchLocationDetails(postalCode);
    }
    //eslint-disable-next-line
  }, [postalCode]);

  return (
    <>
      <form onSubmit={handleAddress} className="space-y-6">
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
                  placeholder="Enter Phone Number"
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
              value={landMark}
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
              {buttonName}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddressForm;
