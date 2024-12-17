import Summary from "./Summary.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import Tooltip from "../UI/ToolTip.jsx";

export default function ShoppingSummary() {
  return (
    <div className="w-[30%]">
      <h2 className="text-2xl font-500 mb-6">摘要</h2>
      <Summary
        tag={
          <Tooltip tag="小計">
            小計金額是訂單折扣前的總價，但不包含運費或其他手續費。
          </Tooltip>
        }
        price="&mdash;"
      />
      <Summary tag="預估運費與手續費" price="免費" />
      <hr />
      <Summary tag="總計" price="&mdash;" />
      <hr />
      <div className="my-8 flex flex-col gap-3">
        <FeatureButton bgColor="gray">訪客結帳</FeatureButton>
        <FeatureButton bgColor="gray">會員結帳</FeatureButton>
      </div>
    </div>
  );
}
