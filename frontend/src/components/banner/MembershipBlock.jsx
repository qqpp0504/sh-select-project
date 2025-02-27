import { useState } from "react";
import { LuInfo } from "react-icons/lu";

import Button from "../UI/Button.jsx";

const DISCOUNTS = [
  {
    description: "首次購物折扣",
    details: "新會員註冊後，首次購物可享有100元折扣。",
  },
  {
    description: "購物金回饋",
    details: "消費每滿500元即可累積5元購物金，下次購物可折抵。",
  },
  {
    description: "生日優惠",
    details: "會員生日當月可享有一次免費運費的專屬優惠。",
  },
];

export default function MembershipBlock({
  image,
  alt,
  paddingStyle = "mb-[1.625rem]",
  className,
}) {
  const [isHidding, setIsHidding] = useState(true);

  function handleHiddingInfo() {
    setIsHidding((prev) => !prev);
  }

  return (
    <section className={`padding-small lg:padding-large ${className}`}>
      <h2 className={`text-2xl font-500 ${paddingStyle}`}>會員福利</h2>
      <div className="relative">
        <div className="h-[60vh] flex justify-center">
          <img src={image} alt={alt} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-5 left-5 z-10 text-gray-300 opacity-75 flex items-center gap-2 sm:hidden">
          <button onClick={handleHiddingInfo}>
            <LuInfo size="1.3rem" />
          </button>

          <p
            className={`text-sm transition-all duration-200 ${
              isHidding ? "opacity-0" : "opacity-100 duration-300"
            }`}
          >
            可向右滑動查看會員福利
          </p>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-start w-full sm:justify-center overflow-x-auto">
          <div className="w-full sm:w-auto">
            <table className="text-white text-left text-lg w-full sm:w-auto border-collapse">
              <tbody>
                {DISCOUNTS.map((discount) => (
                  <tr key={discount.description}>
                    <th className="border-solid border-r-2 px-8 py-2 whitespace-nowrap">
                      {discount.description}
                    </th>
                    <td className="px-8 py-2 whitespace-nowrap">
                      {discount.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <Button link="/accounts" variant="white">
            加入會員
          </Button>
        </div>
      </div>
    </section>
  );
}
