import React from "react";
import { useSelector } from "react-redux";

const Spinner = () => {
  const { loading } = useSelector((state) => state.spinner);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-80 z-50">
          <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
