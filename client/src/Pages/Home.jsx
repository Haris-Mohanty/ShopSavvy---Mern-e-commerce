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
      <ProductsCard category={"mobiles"} heading={"Latest Mobiles"} />
      <ProductsCard category={"trimmers"} heading={"Grooming Essentials"} />
      <ProductsCardWith category={"Mouse"} heading={"Tech Accessories"} />
      <ProductsCardWith category={"airpodes"} heading={"Wireless Wonders"} />
      <ProductsCardWith category={"camera"} heading={"Photography Picks"} />
      <ProductsCardWith category={"earphones"} heading={"Audio Adventures"} />
      <ProductsCardWith category={"watches"} heading={"Timeless Tech"} />
      <ProductsCardWith category={"televisions"} heading={"Entertainment Extravaganza"} />
      <ProductsCardWith category={"printers"} heading={"Printing Perfection"} />
      <ProductsCardWith category={"processor"} heading={"Powerful Processors"} />
      <ProductsCardWith category={"refrigerator"} heading={"Cool Kitchen Gadgets"} />
      <ProductsCardWith category={"speakers"} heading={"Sound Sensations"} />
    </>
  );
};

export default Home;
