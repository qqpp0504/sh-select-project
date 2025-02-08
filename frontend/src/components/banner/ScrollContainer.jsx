import { useRef, useState, useEffect } from "react";

import Icon from "../UI/Icon.jsx";

export default function ScrollContainer({ title, children }) {
  const scrollContainerRef = useRef(); // 使用 useRef 引用滾動容器
  const [isEnd, setIsEnd] = useState(false); // 用來控制右側按鈕的顏色
  const [isStart, setIsStart] = useState(true); // 用來控制左側按鈕的顏色

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

  useEffect(() => {
    function handleScroll() {
      const scrollContainer = scrollContainerRef.current;
      // 檢查是否已經滾動到最右端
      const isAtEnd =
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        scrollContainer.scrollWidth;
      setIsEnd(isAtEnd);

      // 檢查是否已經滾動到最左端
      const isAtStart = scrollContainer.scrollLeft <= 0;
      setIsStart(isAtStart);
    }

    // 綁定滾動事件
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);

    // 清除事件
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="mb-20 w-full h-full">
      <div className="padding-small lg:padding-large flex items-center justify-between">
        <h2 className="text-2xl font-500">{title}</h2>
        <div className="hidden sm:block">
          <button
            onClick={handleScrollLeft}
            className={`bg-gray-200 p-2 rounded-[50%] mr-[0.625rem] ${
              isStart && "opacity-40"
            }`}
            disabled={isStart}
          >
            <Icon type="left-arrow" />
          </button>
          <button
            onClick={handleScrollRight}
            className={`bg-gray-200 p-2 rounded-[50%] ${isEnd && "opacity-40"}`}
            disabled={isEnd}
          >
            <Icon type="right-arrow" />
          </button>
        </div>
      </div>

      <article className="mx-2 my-3">
        <ul
          ref={scrollContainerRef}
          className={`flex flex-row gap-3 overflow-x-auto scrollbar-thin px-4 lg:px-10 ${
            title === "新品和精選" ? "pb-24" : "pb-8"
          }`}
        >
          {children}
        </ul>
      </article>
    </section>
  );
}
