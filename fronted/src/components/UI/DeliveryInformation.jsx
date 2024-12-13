export default function DeliveryInformation() {
  return (
    <>
      <p>所有超過 4500 元台幣的訂單均提供免費標準運送服務。</p>
      <ul className="marker:text-lg pl-4 list-disc my-3">
        <li>標準運送商品在 2-5 個工作天內送達</li>
      </ul>
      <p>訂單處理和出貨時間為星期一至星期五 (國定假日除外)</p>
      <div>
        <span className="font-500 underline">SH SELECT 會員</span>
        <span>可享免費退貨服務。</span>
        <span className="font-500 underline">退貨須知例外情況</span>。
      </div>
    </>
  );
}
