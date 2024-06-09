import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { getUserDetails } from "../api/api";
import { clearUser, setUser } from "../redux/userSlice";
import Banner from "../components/Banner";
import ProductsCard from "../components/ProductsCard";
import ProductsCardWith from "../components/ProductsCardWith";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Fetch User Details
  const fetchUserDetails = async () => {
    try {
      dispatch(showLoading());
      const res = await getUserDetails();
      dispatch(hideLoading());
      if (res.success) {
        dispatch(setUser(res.user));
      } else {
        dispatch(clearUser());
      }
    } catch (err) {
      dispatch(hideLoading());
      dispatch(clearUser());
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
    //eslint-disable-next-line
  }, [user, dispatch]);
  return (
    <>
      <CategoryList />
      <Banner />
      <ProductsCard category={"mobiles"} heading={"Top Mobiles"} />
      <ProductsCard category={"trimmers"} heading={"Popular Trimmers"} />
      <ProductsCardWith category={"Mouse"} heading={"Mouse"} />
      <ProductsCardWith category={"airpodes"} heading={"Airpods"} />
      <ProductsCardWith category={"camera"} heading={"Camera"} />
      <ProductsCardWith category={"earphones"} heading={"Wired Earphones"} />
      <ProductsCardWith category={"watches"} heading={"Smart Watches"} />
      <ProductsCardWith category={"televisions"} heading={"Televisions"} />
      <ProductsCardWith category={"printers"} heading={"Printers"} />
      <ProductsCardWith category={"processor"} heading={"Processor"} />
      <ProductsCardWith category={"refrigerator"} heading={"Refrigerator"} />
      <ProductsCardWith category={"speakers"} heading={"Bluetooth Speakers"} />
    </>
  );
};

export default Home;
