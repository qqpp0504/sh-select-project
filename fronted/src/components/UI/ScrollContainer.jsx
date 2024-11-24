/* eslint-disable react/prop-types */
import { useRef } from "react";

import Icon from "../UI/Icon.jsx";

export default function ScrollContainer({ title, children }) {
  const scrollContainerRef = useRef(); // 使用 useRef 引用滾動容器

  const scrollAmount = 400; // 每次滾動的距離

  function handleScrollLeft() {
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }

  function handleScrollRight() {
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <section className="mb-20">
      <div className="padding-large flex items-center justify-between">
        <h2 className="text-2xl font-500">{title}</h2>
        <div>
          <button
            onClick={handleScrollLeft}
            className="bg-gray-200 p-[0.875rem] rounded-[50%] mr-[0.625rem] opacity-40"
          >
            <Icon type="left-arrow" />
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-gray-200 p-[0.875rem] rounded-[50%]"
          >
            <Icon type="right-arrow" />
          </button>
        </div>
      </div>

      <article className="mx-2 my-3">
        <ul
          ref={scrollContainerRef}
          className="flex flex-row gap-3 overflow-x-auto scrollbar-thin pb-8 px-10"
        >
          {children}
        </ul>
      </article>
    </section>
  );
}
