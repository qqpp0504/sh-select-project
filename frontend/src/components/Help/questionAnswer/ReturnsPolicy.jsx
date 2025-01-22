import { Link } from "react-router-dom";

import Button from "@/components/UI/Button.jsx";
import QuestionTitle from "./QuestionTitle.jsx";

export default function ReturnsPolicy() {
  return (
    <QuestionTitle title="SH SELECT 的退貨須知說明">
      <p>
        於 SH SELECT 網頁購買的產品，均可在七天內退貨（
        <strong className="underline">部分商品除外</strong>
        ）。退貨產品必須保持原始狀態、乾淨無汗損、未曾穿過、未經洗滌，所有零配件完整，保有產品原包裝且標籤完好無損和保持原始狀態，才符合退貨資格。
      </p>
      <div>
        <p className="mb-4">提醒你，退貨不必支付運費。</p>
        <p>敬請放心選購。</p>
        <div className="mt-4">
          <Link to="/">
            <Button className="text-base" paddingStyle="px-5 py-[0.7rem]">
              選購 SH SELECT
            </Button>
          </Link>
        </div>
      </div>
    </QuestionTitle>
  );
}
