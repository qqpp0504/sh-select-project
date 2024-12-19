/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";

import SelectBlock from "../UI/SelectBlock.jsx";
import { modalActions } from "../../store/modal-slice.js";
import rulerIcon from "../../assets/ruler-icon.png";
import FeatureButton from "../UI/FeatureButton.jsx";
import heartIcon from "../../assets/heart-icon.png";
import { cartActions } from "../../store/cart-slice.js";

export default function CartForm({ product, onSelect }) {
  const [sizeData, setSizeData] = useState(null);
  const [reminder, setReminder] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();

    if (!sizeData) {
      setReminder("請選擇尺寸");
      return;
    }

    const fd = new FormData(event.target);
    const data = Object.fromEntries(
      Array.from(fd.entries()).map(([key, value]) => {
        // 如果是價格欄位，轉為數字型別
        if (key === "originalPrice" || key === "discountPrice") {
          return [key, Number(value)];
        }

        if (key === "color" || key === "allSizes") {
          return [key, JSON.parse(value)];
        }

        return [key, value]; // 其他欄位保持字串
      })
    );

    dispatch(cartActions.addToCart(data));
    dispatch(cartActions.checkItemStatus(data));

    dispatch(cartActions.updatedScrollPosition(window.scrollY));
    window.scrollTo({
      top: 0,
    });

    dispatch(cartActions.showNotification());
  }

  function handleSizeChange(event) {
    const { value } = event.target;
    setSizeData(value);
    setReminder("");
  }

  function handleShowSizeDetail() {
    dispatch(modalActions.showSizeModal());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="id" value={product.id} />
      <input type="hidden" name="productName" value={product.name} />
      <input type="hidden" name="brand" value={product.brand} />
      <input type="hidden" name="alt" value={product.alt} />
      <input type="hidden" name="category" value={product.categoryCh} />
      <input
        type="hidden"
        name="allSizes"
        value={JSON.stringify(product.size)}
      />
      <input
        name="originalPrice"
        value={product.originalPrice}
        className="hidden"
      />
      <input
        name="discountPrice"
        value={product.discountPrice}
        className="hidden"
      />

      {product.color.length > 1 ? (
        <div className="mt-8">
          <span className="font-500 mb-3 inline-block">選取顏色</span>
          <div className="grid grid-cols-4 gap-[0.45rem] mb-8 text-center">
            {product.color.map((option, index) => (
              <SelectBlock
                key={option.name}
                id={`${option.name}`}
                value={JSON.stringify(option)}
                name="color"
                onSelect={() => onSelect(option.image)}
                defaultChecked={index === 0}
              >
                {option.name}
              </SelectBlock>
            ))}
          </div>
        </div>
      ) : (
        <>
          <input
            type="hidden"
            name="color"
            value={JSON.stringify(product.color[0])}
          />
          <div className="mt-12"></div>
        </>
      )}
      <div className="mb-3 font-500 flex justify-between items-center">
        <span className={`${reminder ? "text-red-500" : undefined}`}>
          選取尺寸
        </span>
        <button
          onClick={handleShowSizeDetail}
          type="button"
          className="text-sm flex items-center gap-1"
        >
          <img src={rulerIcon} alt="Ruler Icon" className="w-6" />
          尺寸指南
        </button>
      </div>

      <div
        className={`grid grid-cols-4 gap-[0.45rem] text-center ${
          reminder ? "border-[1px] border-red-500" : undefined
        }`}
      >
        {product.size.map((option) => (
          <SelectBlock
            key={option}
            id={option}
            value={option}
            name="size"
            onChange={handleSizeChange}
          >
            {option}
          </SelectBlock>
        ))}
      </div>

      <span
        className={`mb-8 block ${reminder ? "text-red-600 mt-3" : undefined}`}
      >{`${reminder ? reminder : ""}`}</span>

      <div className="flex flex-col gap-3">
        <FeatureButton type="submit">加入購物車</FeatureButton>
        <FeatureButton
          bgColor="white"
          className="flex justify-center items-center gap-[0.3rem]"
        >
          最愛
          <img src={heartIcon} alt="Heart icon" className="w-[22px]" />
        </FeatureButton>
      </div>
    </form>
  );
}
