import QuestionTitle from "./QuestionTitle.jsx";
import groupImg from "@/assets/group2.jpg";

export default function InternationalShipping() {
  return (
    <QuestionTitle title="SH SELECT 訂單是否提供國際運送服務？">
      <div className="flex flex-col gap-3">
        <p>我們不會國際配送到下單國家或地區以外的地址。</p>
        <p>我們無法配送到郵政信箱、轉運商，或是包裹承攬服務公司。</p>
      </div>

      <img src={groupImg} alt="SH SELECT group image" />
    </QuestionTitle>
  );
}
