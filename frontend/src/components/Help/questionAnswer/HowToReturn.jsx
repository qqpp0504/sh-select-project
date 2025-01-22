import { Link } from "react-router-dom";

import QuestionTitle from "./QuestionTitle.jsx";
import Button from "@/components/UI/Button.jsx";

export default function HowToReturn() {
  return (
    <QuestionTitle title="如何退回在 SH SELECT 訂購的產品？">
      <p>
        你可以在<strong className="underline">7 天內</strong>辦理
        <strong>未穿過且未下水</strong>的 SH SELECT
        網站訂單退貨。*只需依照以下步驟，就能完成訂單退貨。
      </p>

      <ol className="list-decimal pl-5 flex flex-col gap-10">
        <li>
          <strong>登入你的 SH SELECT 會員個人檔案</strong>並前往訂單紀錄。
          對你要退貨的訂單選擇 View or Manage (檢視或管理)，然後選擇 Start
          Return (開始退貨)。
          如果你是以訪客身分訂購，則需要利用訂單編號和電子郵件地址查看你的訂單。
        </li>
        <li>
          <strong>選擇要退貨的商品</strong>
          ，從下拉式選單中提供退貨原因，然後選擇 Continue (繼續)。
        </li>
        <li>
          <strong>提交退貨並確認你的地址</strong>
          ──我們將自動寄出含有可列印預付標籤的電子郵件。
          你也可以選擇下載此標籤。
        </li>
        <li>
          <strong>包裝要運送的商品，並妥善黏貼已列印的退貨運送標籤。</strong>
          請確實移除或覆蓋任何先前的運送標籤和條碼，避免運送延遲。
        </li>
        <li>
          <strong>將退貨商品送到</strong>離你最近的物流貨運據點。
        </li>
      </ol>

      <div>
        <Link to="/">
          <Button className="text-base" paddingStyle="px-5 py-[0.7rem]">
            開始辦理退貨
          </Button>
        </Link>
      </div>
    </QuestionTitle>
  );
}
