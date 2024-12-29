import { Link } from "react-router-dom";

import QuestionTitle from "./QuestionTitle.jsx";

export default function ChangeCancelOrder() {
  return (
    <QuestionTitle title="我可以取消或變更 SH SELECT 的訂單嗎？">
      <div className="flex flex-col gap-4">
        <p>你無法變更訂單內容，但下單後 30 分鐘內可取消該筆訂單。</p>
        <p>
          若要取消訂單，請先前往你的訂單頁面。
          如果沒有登入，則須輸入確認電子郵件中的訂單編號，以及你的電子郵件地址。
          接著，開啟你要取消的訂單，然後輕觸或按一下「取消」按鈕並按照提示進行。
        </p>
      </div>

      <p>
        若沒有看見取消按鈕，代表你的訂單不再符合取消資格。
        不過不必擔心，你可以在 7 天內
        <Link to="/help/how-to-return">
          <strong className="underline">退回商品</strong>
        </Link>
        。
      </p>

      <p>
        很抱歉，你無法進行任何形式的變更，包括變更商品的顏色、尺寸或數量、運送選擇或寄送地址。
        如果下單後未達 30 分鐘，你的最佳選擇是取消訂單，然後重新下訂。
      </p>
    </QuestionTitle>
  );
}
