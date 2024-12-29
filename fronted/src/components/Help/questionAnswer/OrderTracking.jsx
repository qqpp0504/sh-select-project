import { Link } from "react-router-dom";

import QuestionTitle from "./QuestionTitle.jsx";

export default function OrderTracking() {
  return (
    <QuestionTitle title="我的 SH SELECT 訂單在哪裡？">
      <div className="flex flex-col gap-4">
        <p>
          你身為 SH SELECT 會員，只要
          <Link to="/accounts">
            <strong className="underline">登入</strong>
          </Link>
          並前往訂單紀錄，即可輕鬆查看所有訂單狀態。 你也可隨時前往 SH SELECT
          官網查看訂單狀態。
        </p>
        <p>訂單出貨後即可追踪訂單，並查看包裹正由哪一家貨運公司配送中。</p>
        <p>
          請記住，如訂購多項商品，則可能會分成多次送達。
          每次出貨，我們都會向你發送出貨確認電子郵件，並附上可追踪出貨狀態的相關連結。
        </p>
      </div>
    </QuestionTitle>
  );
}
