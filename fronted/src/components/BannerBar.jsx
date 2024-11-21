import { useEffect, useRef, useState } from "react";
import { BANNER_MESSAGES } from "../bannerMessages.js";

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
    <div className="px-12 py-5 bg-gray-100 text-center overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ease-in-out`}
        style={{
          transform: `translateX(-${messageIndex * 100}%)`,
        }}
      >
        {BANNER_MESSAGES.map((message, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <p className="pb-1">{message.text}</p>
            <p className="text-[0.8rem]">
              {message.noLinkText + message.linkText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
