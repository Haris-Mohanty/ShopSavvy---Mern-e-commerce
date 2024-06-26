import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { deleteAddress, getAddresses } from "../api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AddressForm from "../components/AddressForm";

const MyAddress = () => {
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { user } = useSelector((state) => state.user);

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

  //************ FETCH CREATED ADDRESSES **********/
  const handleDeleteAddress = async (addressId) => {
    try {
      dispatch(showLoading());
      const res = await deleteAddress(addressId);
      dispatch(hideLoading());
      if (res.success) {
        toast.success(res.message);
        fetchCreatedAddresses();
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchCreatedAddresses();
    //eslint-disable-next-line
  }, []);

  //************ SHOW ADD OR EDIT FORM **********/
  const handleAddOrEditAddress = (address = null) => {
    setSelectedAddress(address);
    setShowForm(true);
  };

  return (
    <>
      <div className="container mx-auto mt-16">
        {showForm ? (
          <AddressForm
            setShowForm={setShowForm}
            fetchCreatedAddresses={fetchCreatedAddresses}
            buttonName={selectedAddress ? "Update Address" : "Add Address"}
            address={selectedAddress}
          />
        ) : (
          <>
            <div className="flex justify-end p-4">
              <button
                onClick={() => handleAddOrEditAddress()}
                className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
              >
                Add New Address
              </button>
            </div>
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                <h2 className="text-2xl font-semibold mb-2">
                  No address found
                </h2>
                <p className="mb-4 text-gray-500 px-4">
                  Looks like you haven't added any address.
                </p>
                <Link
                  to="/"
                  className="bg-indigo-500 text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 px-6 md:px-10">
                {addresses.map((address) => (
                  <div
                    key={address._id}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <h3 className="text-base font-semibold mb-1">
                      Name: {user.name}
                    </h3>
                    <h3 className="text-base font-semibold mb-2">
                      Email: {user.email}
                    </h3>
                    <h5 className="text-gray-700 mb-1">
                      House No: {address.houseNo}
                    </h5>
                    <p className="text-gray-700 mb-1">{address.area}</p>
                    <p className="text-gray-700 mb-1">
                      {address.district}, {address.state}, {address.postalCode}
                    </p>
                    <p className="text-gray-700 mb-1">
                      {address.country}, {address.phoneNumber}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleAddOrEditAddress(address)}
                      className="mt-4 inline-block bg-indigo-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105 mr-4"
                    >
                      Edit Address
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(address._id)}
                      className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
                    >
                      Delete Address
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MyAddress;
