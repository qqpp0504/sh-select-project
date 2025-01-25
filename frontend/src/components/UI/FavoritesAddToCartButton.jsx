import { useSelector } from "react-redux";

import Button from "./Button.jsx";
import successIcon from "@/assets/success-icon.png";

export default function FavoritesAddToCartButton({ addToCartFn, product }) {
  const { successItems, isSuccessAddToCart } = useSelector(
    (state) => state.favorites
  );

  let favoriteButton = (
    <Button
      onClick={addToCartFn}
      variant="favoriteWhite"
      size="lg"
      className="w-fit"
    >
      <div>加入購物車</div>
    </Button>
  );

  if (isSuccessAddToCart && successItems.includes(product)) {
    favoriteButton = (
      <Button variant="favoriteWhite" size="lg" className="w-fit">
        <div className="flex gap-1 items-center">
          <img src={successIcon} alt="Success icon" className="w-6" />
          <span>已加入</span>
        </div>
      </Button>
    );
  }

  return favoriteButton;
}
