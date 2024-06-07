import React from "react";
import { useParams } from "react-router-dom";

const ProductCategory = () => {
  const params = useParams();

  return (
    <>
      <div className="">{params.categoryName}</div>
    </>
  );
};

export default ProductCategory;
