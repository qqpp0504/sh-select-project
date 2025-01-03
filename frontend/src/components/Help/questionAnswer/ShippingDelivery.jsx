import QuestionTitle from "./QuestionTitle.jsx";

export default function ShippingDelivery() {
  return (
    <QuestionTitle title="SH SELECT 提供哪些運送選項？">
      <p>結帳時，我們會告知你預計送達日期。 我們提供以下運送選項：</p>

      <div className="flex flex-col gap-3">
        <strong>標準運送</strong>
        <ul className="flex flex-col gap-3 list-disc list-inside marker:text-sm marker:text-gray pl-2">
          <li>訂單金額滿 NT$4,500 者免費</li>
          <li>訂單金額未滿 NT$4,500 者，須加收 NT$120</li>
          <li>通常會在 3-5 個工作天內送達</li>
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <strong>補充資訊</strong>
        <ul className="flex flex-col gap-3 list-disc list-inside marker:text-sm marker:text-gray pl-2">
          <li>訂單處理時間為星期一至星期五 (國定假日除外)。</li>
          <li>如遇假日，訂單的處理及寄送時間可能會延後。</li>
          <li>訂單商品無法配送到郵政信箱、轉運商，或是包裹承攬服務公司。</li>
          <li>你訂購的商品無法寄送到下單所在國家或地區以外的地址。</li>
        </ul>
      </div>
    </QuestionTitle>
  );
}
