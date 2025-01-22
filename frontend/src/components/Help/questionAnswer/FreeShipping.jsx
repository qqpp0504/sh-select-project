import { Link } from "react-router-dom";

import QuestionTitle from "./QuestionTitle.jsx";
import groupImg from "@/assets/group.jpg";

export default function FreeShipping() {
  return (
    <QuestionTitle title="如何才能在 SH SELECT 享有免運費服務？">
      <p>
        <Link to="/help/shipping-delivery">
          <strong className="underline">達到最低訂單總計金額</strong>
        </Link>
        （在加上任何運費或稅額之前以及套用折扣之後），即可享有免費標準運送服務
        （不需要促銷代碼）。 如需更多資訊，請參閱我們的
        <Link to="/help/shipping-delivery">
          <strong className="underline">運送選項</strong>
        </Link>
        。
      </p>

      <img
        src={groupImg}
        alt="SH SELECT group image"
        className="w-full object-center"
      />
    </QuestionTitle>
  );
}
