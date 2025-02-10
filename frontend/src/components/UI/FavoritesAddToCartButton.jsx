import { useSelector } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";

import Button from "./Button.jsx";

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
        <div className="flex gap-2 items-center">
          <FaCircleCheck size="1.2rem" color="green" />
          <span>已加入</span>
        </div>
      </Button>
    );
  }

  return favoriteButton;
}
