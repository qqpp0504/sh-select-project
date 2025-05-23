import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import SEO from "../SEO.jsx";

export default function SearchQuestions() {
  const { searchResult } = useSelector((state) => state.searchFaq);
  const [displayText, setDisplayText] = useState("");
  const { searchTerm } = useParams();

  useEffect(() => {
    if (searchResult.length === 0) {
      setDisplayText(`"${searchTerm}"`);
    } else {
      setDisplayText(`"${searchTerm}" 結果共 ${searchResult.length} 個`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  let allSearchResult;

  if (searchResult.length > 0) {
    allSearchResult = (
      <ul className="flex flex-col gap-12 mt-12">
        {searchResult.map((result) => (
          <>
            <li key={result.id}>
              <Link to={`/help/${result.id}`}>
                <h3 className="text-2xl font-500 mb-1">{result.question}</h3>
              </Link>

              <p className="text-sm">{`${
                Array.isArray(result.keywords)
                  ? result.keywords[0]
                  : result.keywords
              }...`}</p>
            </li>
            <hr className="border-gray-300" />
          </>
        ))}
      </ul>
    );
  } else {
    allSearchResult = (
      <div className="text-center mt-9">
        <p className="text-xl mb-2">找不到結果</p>
        <span className="text-sm">聯絡我們</span>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="「取得協助」頁面搜尋結果。SH SELECT"
        description="需要幫助嗎？在 SH SELECT 取得協助頁面，你可以找到退貨、出貨、訂單與付款等常見問題的解答，讓你的購物體驗更加順暢。"
      />
      <section className="w-full">
        <div className="flex flex-col">
          <p className="text-2xl font-500 text-center">
            {`以下關鍵字的搜尋結果： ${displayText}`}
          </p>

          <hr className="border-gray-300 mt-12" />

          {allSearchResult}
        </div>
      </section>
    </>
  );
}
