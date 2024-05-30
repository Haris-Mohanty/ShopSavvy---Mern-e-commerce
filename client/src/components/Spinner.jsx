import React from "react";
import { useSelector } from "react-redux";

const Spinner = () => {
  const { loading } = useSelector((state) => state.spinner);

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center h-screen bg-black bg-opacity-50">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
