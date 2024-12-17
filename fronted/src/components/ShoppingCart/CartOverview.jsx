import ShoppingCart from "./ShoppingCart.jsx";
import ShoppingSummary from "./ShoppingSummary.jsx";

export default function CartOverview() {
  return (
    <section className="padding-large mt-6">
      <div className="flex justify-center">
        <div className="max-w-[67rem] w-full">
          <div className="flex">
            <ShoppingCart />
            <ShoppingSummary />
          </div>
          <div className="mt-20">
            <h2 className="text-2xl font-500 mb-3">最愛</h2>
            <p>
              想要檢視你的最愛嗎？{" "}
              <span className="text-gray underline">加入我們</span> 或{" "}
              <span className="text-gray underline">登入</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
