/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

import Button from "./Button.jsx";
import successIcon from "../../assets/success-icon.png";

export default function FavoritesAddToCartButton({ addToCartFn, product }) {
  const { successItems, isSuccessAddToCart } = useSelector(
    (state) => state.favorites
  );

  let favoriteButton = (
    <Button
      onClick={addToCartFn}
      bgColor="favoriteWhite"
      className="w-fit"
      paddingStyle="px-6 py-2"
    >
      <div>加入購物車</div>
    </Button>
  );

  if (isSuccessAddToCart && successItems.includes(product)) {
    favoriteButton = (
      <Button
        bgColor="favoriteWhite"
        className="w-fit"
        paddingStyle="px-6 py-2"
      >
        <div className="flex gap-1 items-center">
          <img src={successIcon} alt="Success icon" className="w-6" />
          <span>已加入</span>
        </div>
      </Button>
    );
  }

  return favoriteButton;
}
