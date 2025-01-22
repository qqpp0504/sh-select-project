import { useSelector } from "react-redux";

import ShoppingCart from "./ShoppingCart.jsx";
import ShoppingSummary from "./ShoppingSummary.jsx";
import ResizableModal from "./ResizableModal.jsx";
import FavoritesBlock from "./FavoritesBlock.jsx";
import FavoriteAddedModal from "./FavoriteAddedModal.jsx";

export default function CartOverview() {
  const activeItem = useSelector((state) => state.cart.activeItem);

  return (
    <section className="padding-large mt-6">
      {activeItem && <ResizableModal />}
      <FavoriteAddedModal />
      <div className="flex justify-center">
        <div className="max-w-[67rem] w-full">
          <div className="flex gap-6">
            <ShoppingCart />
            <ShoppingSummary />
          </div>
          <div className="mt-7">
            <h2 className="text-2xl font-500 mb-7">最愛</h2>
            <FavoritesBlock />
          </div>
        </div>
      </div>
    </section>
  );
}
