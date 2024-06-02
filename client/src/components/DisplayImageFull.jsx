import React from "react";
import { IoClose } from "react-icons/io5";

const DisplayImageFull = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          <IoClose size={30} />
        </button>
        <div className="flex justify-center items-center p-4 w-full h-full">
          <img
            src={imageUrl}
            alt="Full Size"
            className="w-auto h-auto max-w-full max-h-full"
          />
        </div>
      </div>
    </>
  );
};

export default DisplayImageFull;
