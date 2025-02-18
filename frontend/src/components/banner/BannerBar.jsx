import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const BANNER_MESSAGES = [
  {
    text: "最高可享7折優惠",
    noLinkText: "",
    linkText: "選購我們所有最新優惠商品",
    link: "/products?onSale=sale",
  },
  {
    text: "加入我們的會員，享受更多優惠！",
    noLinkText: "",
    linkText: "加入",
    link: "/accounts",
  },
  {
    text: "免費寄送",
    noLinkText: "適用於 NT$4,500 以上的訂單。",
    linkText: "查看詳細資訊",
    link: "/help/shipping-delivery",
  },
];

export default function BannerBar() {
  const interval = useRef();
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimeout(() => {
        setMessageIndex(
          (prevIndex) => (prevIndex + 1) % BANNER_MESSAGES.length
        );
      }, 500);
    }, 5000);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="py-2 lg:py-5 bg-gray-100 text-center overflow-hidden">
      <div
        className={`flex items-center transition-transform duration-500 ease-in-out`}
        style={{
          transform: `translateX(-${messageIndex * 100}%)`,
        }}
      >
        {BANNER_MESSAGES.map((message, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <p className="pb-1">{message.text}</p>
            <div className="flex flex-col justify-center text-[0.8rem]">
              <p>{message.noLinkText}</p>
              <Link to={message.link} className="underline font-500 mx-auto">
                {message.linkText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
