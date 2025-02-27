import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import Button from "../UI/Button.jsx";

export default function BrandDetail({ brand, index }) {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <li
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      dir={index % 2 === 0 ? "ltr" : "rtl"}
      className="w-full py-4"
    >
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full h-64 lg:w-96 md:w-80 md:h-64 lg:h-80 rounded-2xl overflow-hidden bg-gray-200">
          <img
            src={brand.image}
            alt={brand.alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:w-[40rem] flex flex-col gap-3">
          <h2 className="text-3xl font-500">{brand.title}</h2>
          <p className="leading-7">{brand.description}</p>
          <Button className="w-fit mt-3 md:mt-3 lg:mt-10" link={brand.link}>
            前往選購
          </Button>
        </div>
      </div>
    </li>
  );
}
