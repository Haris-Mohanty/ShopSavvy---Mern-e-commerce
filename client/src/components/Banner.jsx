import React, { useEffect, useState } from "react";
import img1 from "../Assets/banner/img1.webp";
import img2 from "../Assets/banner/img2.jpg";
import img3 from "../Assets/banner/img3.webp";
import img4 from "../Assets/banner/img4.webp";
import img5 from "../Assets/banner/img5.jpg";

import mob_image1 from "../Assets/banner/img1_mobile.png";
import mob_image2 from "../Assets/banner/img2_mobile.jpg";
import mob_image3 from "../Assets/banner/img3_mobile.jpg";
import mob_image4 from "../Assets/banner/img4_mobile.webp";
import mob_image5 from "../Assets/banner/img5_mobile.jpg";

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const desktopImages = [img1, img2, img3, img4, img5];
  const mobileImages = [
    mob_image1,
    mob_image2,
    mob_image3,
    mob_image4,
    mob_image5,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };
  const prevImage = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentIndex) {
        nextImage();
      } else {
        setCurrentIndex(0);
      }
    }, 3000);

    return () => clearInterval(interval);
    //eslint-disable-next-line
  }, [currentIndex]);

  return (
    <>
      <div className="container mx-auto px-4 rounded">
        <div className="relative h-60 md:h-72 w-full bg-slate-200 ">
          <div className="absolute inset-0 p-4 z-10 h-full w-full md:flex items-center hidden">
            <div className="flex justify-between w-full">
              <button
                onClick={prevImage}
                className="bg-white shadow-md rounded-full p-2"
              >
                <FaAngleLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="bg-white shadow-md rounded-full p-2"
              >
                <FaAngleRight size={24} />
              </button>
            </div>
          </div>
          {/********************** DESKTOP VIEW *****************/}
          <div className="hidden md:flex h-full w-full overflow-hidden">
            {desktopImages.map((image, index) => (
              <div
                className="w-full h-full min-w-full min-h-full transition-transform duration-700 ease-in-out"
                key={index}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <img
                  src={image}
                  className="w-full h-full object-fill"
                  alt="Images"
                />
              </div>
            ))}
          </div>

          {/********************** MOBILE VIEW *****************/}
          <div className="flex h-full w-full overflow-hidden md:hidden">
            {mobileImages.map((image, index) => (
              <div
                className="w-full h-full min-w-full min-h-full transition-all"
                key={index}
                style={{ transform: `translate(-${currentIndex * 100}%)` }}
              >
                <img
                  src={image}
                  className="w-full h-full object-fill"
                  alt="Images"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
