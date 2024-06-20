import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import AddressForm from "./AddressForm";

const AddressList = ({ addresses, setShowForm }) => {
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (index) => {
    setSelectedAddressIndex(index);
  };

  //************ EDIT AND UPDATE ADDRESS **********/
  const handleEditAddress = async (address) => {
    setSelectedAddress(address);
  };

  return (
    <>
      <div>
        <ul className="space-y-4">
          {addresses.map((address, index) => (
            <li
              key={index}
              className={`flex items-start justify-between p-4 border rounded-lg shadow-sm ${
                selectedAddressIndex === index
                  ? "bg-blue-50 border-blue-400"
                  : "bg-white border-gray-200"
              }`}
              onClick={() => handleSelectAddress(index)}
            >
              <div className="flex items-start space-x-4 cursor-pointer">
                <input
                  type="radio"
                  name="selectedAddress"
                  id={`address-${index}`}
                  checked={selectedAddressIndex === index}
                  className="mt-1.5 h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  onChange={() => handleSelectAddress(index)}
                />
                <div>
                  <div className="md:flex gap-2 font-semibold text-gray-900 ">
                    <p>{address.userId.name} -</p>
                    <p>{address.userId.email}</p>
                  </div>
                  <p className="text-gray-500">
                    {address.houseNo}, {address.area}, {address.landmark}
                  </p>
                  <p className="text-gray-500">
                    {address.district}, {address.state}, {address.country},{" "}
                    {address.postalCode}
                  </p>
                  <p className="text-gray-500">Phone: {address.phoneNumber}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleEditAddress(address)}
                className="text-primary-700 hover:text-primary-900 focus:outline-none"
              >
                <FiEdit className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 mb-4 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          onClick={() => setShowForm(true)}
        >
          Add New Address
        </button>
      </div>

      {/************* EDIT FORM **************/}
      {selectedAddress && (
        <AddressForm
          setShowForm={setShowForm}
          buttonName={"Update address"}
          address={selectedAddress}
        />
      )}
    </>
  );
};

export default AddressList;
