import { useEffect, useRef, useState } from "react";

import { BANNER_MESSAGES } from "../bannerMessages.js";

export default function BannerBar() {
  const interval = useRef();
  const [messageIndex, setmessageIndex] = useState(0);

  useEffect(() => {
    interval.current = setInterval(() => {
      setmessageIndex((prevIndex) => (prevIndex + 1) % BANNER_MESSAGES.length);
    }, [5000]);

    return () => clearInterval(interval.current);
  }, []);

  return (
    <div className="px-12 py-5 bg-gray-100 text-center">
      <div>
        <p className="pb-1">{BANNER_MESSAGES[messageIndex].text}</p>
        <p className="text-[0.8rem]">
          {BANNER_MESSAGES[messageIndex].noLinkText +
            BANNER_MESSAGES[messageIndex].linkText}
        </p>
      </div>
    </div>
  );
}
