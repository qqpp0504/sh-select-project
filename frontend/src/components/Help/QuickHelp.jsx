import { Link } from "react-router-dom";

import FAQDATA from "@/faqData";
import Accordion from "../UI/Accordion.jsx";

export default function QuickHelp() {
  return (
    <section className="w-full">
      <div className="pb-4">
        <h3 className="text-[1.6rem] font-500 lg:mb-1">快速協助</h3>
        <p className="text-sm lg:text-base">
          只要輕輕一按，就能找到常見問題的解答。
        </p>
      </div>

      <hr className="border-gray-200" />

      <menu className="my-10 hidden lg:block">
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

      <menu className="mt-6 lg:hidden">
        <ul>
          {FAQDATA.map((card) => (
            <Accordion
              key={card.category}
              id={card.category}
              tag={card.category}
              topHr={false}
            >
              <li className="flex flex-col gap-1">
                {card.questions.map((question) => (
                  <Link to={question.id} key={question.id} className="w-fit">
                    {question.question}
                  </Link>
                ))}
              </li>
            </Accordion>
          ))}
        </ul>
      </menu>
    </section>
  );
}
