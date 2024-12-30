import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function SearchQuestionsPage() {
  const { searchResult } = useSelector((state) => state.searchFaq);
  const [displayText, setDisplayText] = useState("");
  const { searchTerm } = useParams();

  useEffect(() => {
    setDisplayText(`"${searchTerm}" 結果共 ${searchResult.length} 個`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  return (
    <section className="w-full">
      <div className="flex flex-col gap-12">
        <p className="text-2xl font-500 text-center">
          {`以下關鍵字的搜尋結果： ${displayText}`}
        </p>

        <hr className="border-gray-300" />

        <ul className="flex flex-col gap-12">
          {searchResult.map((result) => (
            <>
              <li key={result.id}>
                <Link to={`/help/${result.id}`}>
                  <h3 className="text-2xl font-500 mb-1">{result.question}</h3>
                </Link>

                <p className="font-light text-sm">{`${
                  Array.isArray(result.keywords)
                    ? result.keywords[0]
                    : result.keywords
                }...`}</p>
              </li>
              <hr className="border-gray-300" />
            </>
          ))}
        </ul>
      </div>
    </section>
  );
}
