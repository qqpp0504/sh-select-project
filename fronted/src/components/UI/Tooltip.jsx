/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

export default function Tooltip({
  tag,
  tipButtonStyle,
  tipStyle,
  tipContentStyle,
  children,
}) {
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
      <span className="flex items-center gap-2">
        {tag}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full flex justify-center items-center ${tipStyle}`}
        >
          <span className={`${tipButtonStyle}`}>?</span>
        </button>
      </span>
      {isOpen && (
        <div className={`absolute text-white ${tipContentStyle}`}>
          {children}
        </div>
      )}
    </div>
  );
}
