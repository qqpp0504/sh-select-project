/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

import questionIcon from "../../assets/question-icon.png";

export default function Tooltip({ tag, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltip = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltip.current && !tooltip.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={tooltip}>
      <span className="flex items-center gap-1">
        {tag}{" "}
        <button onClick={() => setIsOpen(!isOpen)}>
          <img src={questionIcon} alt="Question icon" className="w-4" />
        </button>
      </span>
      {isOpen && (
        <div className="absolute right-[-10px] top-9 w-60 bg-gray-500 text-white text-sm p-4 after:content-[''] after:absolute after:right-2 after:top-[-10px] after:border-l-[10px] after:border-r-[10px] after:border-b-[10px] after:border-gray-500 after:border-l-transparent after:border-r-transparent">
          {children}
        </div>
      )}
    </div>
  );
}
