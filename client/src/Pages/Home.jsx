import React, { useEffect } from "react";
import CategoryList from "../components/CategoryList";
import Banner from "../components/Banner";
import ProductsCard from "../components/ProductsCard";
import ProductsCardWith from "../components/ProductsCardWith";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { user, fetchUserDetails, fetchCountCartItems } = useOutletContext();

  useEffect(() => {
    if (!user) {
      fetchUserDetails();
    }
    fetchCountCartItems();
  }, [user, fetchUserDetails, fetchCountCartItems]);

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
      <ProductsCardWith
        category={"televisions"}
        heading={"Entertainment Extravaganza"}
      />
      <ProductsCardWith category={"printers"} heading={"Printing Perfection"} />
      <ProductsCardWith
        category={"processor"}
        heading={"Powerful Processors"}
      />
      <ProductsCardWith
        category={"refrigerator"}
        heading={"Cool Kitchen Gadgets"}
      />
      <ProductsCardWith category={"speakers"} heading={"Sound Sensations"} />
    </>
  );
};

export default Home;
