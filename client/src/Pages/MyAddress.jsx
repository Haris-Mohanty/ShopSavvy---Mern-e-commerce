import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getAddresses } from "../api/api";

const MyAddress = () => {
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);

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
    fetchCreatedAddresses();
    //eslint-disable-next-line
  }, []);

  console.log(addresses);
  return (
    <>
      <div className="container mx-auto mt-16">My Addresses</div>
    </>
  );
};

export default MyAddress;
