import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import { currencyFormatter } from "../../util/formatting.js";
import SelectBlock from "../UI/SelectBlock.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import { cartActions } from "../../store/cart-slice.js";

export default function ResizableModal() {
  const [sizeData, setSizeData] = useState(null);
  const [reminder, setReminder] = useState("");
  const { isShowing, type } = useSelector(
    (state) => state.modal.changeSizeModal
  );
  const { activeItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(modalActions.closeModal({ modalType: "changeSizeModal" }));
    setReminder("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!sizeData) {
      setReminder("請選擇尺寸");
      return;
    }

    const fd = new FormData(event.target);
    const size = Object.fromEntries(fd.entries());

    if (type === "default") {
      dispatch(
        cartActions.updatedSize({
          id: activeItem.id,
          color: activeItem.color.name,
          size: size.size,
          idNumber: activeItem.idNumber,
        })
      );
    } else if (type === "favorite") {
      if (size.size) {
        const updatedItem = { ...activeItem, size: size.size };
        dispatch(cartActions.addToCart(updatedItem));
      }
    }

    handleCloseModal();
  }

  function handleSizeChange(event) {
    const { value } = event.target;
    setSizeData(value);
    setReminder("");
  }

  return (
    <Modal open={isShowing} onClose={handleCloseModal}>
      <section className="p-6 max-w-full w-[58rem]">
        <div className="flex gap-4">
          <div className="w-[27rem] h-[27rem] bg-gray-100 flex justify-center items-center">
            <img
              src={`http://localhost:3000/${activeItem.color.image}`}
              alt={activeItem.alt}
              className="w-[90%]"
            />
          </div>

          <div className="flex flex-col justify-between w-[27rem]">
            <div className="flex flex-col gap-1 font-500">
              <span>{activeItem.category}</span>
              <h2 className="text-2xl">
                {activeItem.brand} - {activeItem.productName}
              </h2>
              <span>
                NT{currencyFormatter.format(activeItem.discountPrice)}
              </span>
            </div>

            <form onSubmit={handleSubmit}>
              <span
                className={`mb-2 block font-500 ${reminder && "text-red-500"}`}
              >
                {reminder ? reminder : "選取尺寸"}
              </span>
              <div
                className={`grid grid-cols-5 gap-[0.45rem] text-center mb-5 ${
                  reminder && "border-[1px] border-red-500"
                }`}
              >
                {activeItem.allSizes.map((size) => (
                  <SelectBlock
                    key={size}
                    id={`${size}`}
                    name="size"
                    value={size}
                    roundedStyle="rounded-lg"
                    defaultChecked={size == activeItem.size}
                    onChange={handleSizeChange}
                  >
                    {size.replace(/CM\s*/, "")}
                  </SelectBlock>
                ))}
              </div>
              <FeatureButton paddingStyle="py-4" type="submit">
                {type === "default" && "更新尺寸"}
                {type === "favorite" && "加入購物車"}
              </FeatureButton>
            </form>
          </div>
        </div>
      </section>
    </Modal>
  );
}
