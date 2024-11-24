import { Link } from "react-router-dom";

import vipBannerImage from "../../assets/vip-banner.jpg";
import { DISCOUNTS } from "../../data.js";
import Button from "../UI/Button.jsx";

export default function VipBlock() {
  return (
    <section className="padding-large">
      <h2 className="text-2xl font-500 mb-[1.625rem]">會員福利</h2>
      <div className="relative">
        <div className="h-[60vh] flex justify-center">
          <img
            src={vipBannerImage}
            alt=""
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <table className="text-white text-left text-lg">
            {DISCOUNTS.map((discount) => (
              <tr key={discount}>
                <th className="border-solid border-r-2 px-8 py-2">
                  {discount.description}
                </th>
                <td className="px-8 py-2">{discount.details}</td>
              </tr>
            ))}
          </table>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <Link to="/">
            <Button bgColor="white">加入會員</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
