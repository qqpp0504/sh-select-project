import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function GenderClassNavigation({ gender }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const listClasses = "hover:text-gray transition-all duration-200 ease-in-out";

  return (
    <div className="sticky top-0 padding-small lg:padding-large pt-8 pb-4 bg-white z-10 flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:my-4 lg:pt-4">
      <div className="flex-1 flex justify-start">
        <h2
          className={`font-500 transition-all duration-200 ${
            isSticky ? "text-2xl lg:text-base" : "text-2xl"
          }`}
        >
          {gender == "men" ? "男款" : "女款"}
        </h2>
      </div>

      <div className="flex-1 flex justify-center">
        <ul className="flex flex-row gap-8 font-500">
          <Link
            to={
              gender == "men"
                ? "/products?gender=men&category=top"
                : "/products?gender=women&category=top"
            }
          >
            <li className={listClasses}>服裝</li>
          </Link>
          <Link
            to={
              gender == "men"
                ? "/products?gender=men&category=shoes"
                : "/products?gender=women&category=shoes"
            }
          >
            <li className={listClasses}>鞋款</li>
          </Link>
          <Link
            to={
              gender == "men"
                ? "/products?gender=men&category=other"
                : "/products?gender=women&category=other"
            }
          >
            <li className={listClasses}>其他配件</li>
          </Link>
        </ul>
      </div>

      <div className="flex-1 flex justify-end"></div>
    </div>
  );
}
