import { useSelector } from "react-redux";

import ShoppingCart from "./ShoppingCart.jsx";
import ShoppingSummary from "./ShoppingSummary.jsx";
import ResizableModal from "./ResizableModal.jsx";

export default function CartOverview() {
  const activeItem = useSelector((state) => state.cart.activeItem);

  return (
    <section className="padding-large mt-6">
      {activeItem && <ResizableModal />}
      <div className="flex justify-center">
        <div className="max-w-[67rem] w-full">
          <div className="flex gap-6">
            <ShoppingCart />
            <ShoppingSummary />
          </div>
          <div className="mt-8">
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
