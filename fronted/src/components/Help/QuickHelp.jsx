import { Link } from "react-router-dom";

import FAQDATA from "../../faqData.js";

export default function QuickHelp() {
  return (
    <section className="w-full">
      <div className="mt-20 pb-4 border-b-[1px] border-gray-300">
        <h3 className="text-[1.6rem] font-500 mb-1">快速協助</h3>
        <p>只要輕輕一按，就能找到常見問題的解答。</p>
      </div>

      <menu className="my-10">
        <ul className="grid grid-cols-3">
          {FAQDATA.map((card) => (
            <li key={card.category} className="flex flex-col gap-1">
              <span className="font-500">{card.category}</span>
              {card.questions.map((question) => (
                <Link to={question.id} key={question.id} className="w-fit">
                  {question.question}
                </Link>
              ))}
            </li>
          ))}
        </ul>
      </menu>
    </section>
  );
}
