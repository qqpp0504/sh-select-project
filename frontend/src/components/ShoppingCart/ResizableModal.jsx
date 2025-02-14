import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "@/store/modal-slice.js";
import { currencyFormatter } from "@/util/formatting.js";
import SelectBlock from "../UI/SelectBlock.jsx";
import Button from "../UI/Button.jsx";
import { cartActions } from "@/store/cart-slice.js";
import { favoritesActions } from "@/store/favorites-slice.js";
import { useAddNotification } from "../hooks/useAddNotification.js";

export default function ResizableModal() {
  const [sizeData, setSizeData] = useState(null);
  const [reminder, setReminder] = useState("");
  const { isShowing, type, page } = useSelector(
    (state) => state.modal.changeSizeModal
  );
  const { activeItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const addNotification = useAddNotification();

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

      handleCloseModal();
    } else if (type === "favorite") {
      const updatedItem = { ...activeItem, size: size.size };
      dispatch(cartActions.addToCart(updatedItem));
      dispatch(favoritesActions.favoriteAddSuccess(activeItem));
      handleCloseModal();

      if (page === "favorites") {
        addNotification(updatedItem, "addToCart");
      }

      dispatch(favoritesActions.updatedIsSuccess(true));
    }
  }

  function handleSizeChange(event) {
    const { value } = event.target;
    setSizeData(value);
    setReminder("");
  }

  return (
    <Modal open={isShowing} onClose={handleCloseModal}>
      <section className="p-4 md:p-6 max-w-full w-[58rem] overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-7 md:gap-4 w-full">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="w-36 min-w-36 lg:w-[27rem] aspect-square bg-gray-100 flex justify-center items-center">
              <img
                src={`http://localhost:3000/${activeItem.color.image}`}
                alt={activeItem.alt}
                className="w-[90%]"
              />
            </div>
            <div className="flex flex-col md:gap-1 font-500 lg:hidden">
              <span>{activeItem.category}</span>
              <h2 className="text-lg md:text-xl">
                {activeItem.brand} - {activeItem.productName}
              </h2>
              <span>
                NT{currencyFormatter.format(activeItem.discountPrice)}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between w-full lg:w-[27rem]">
            <div className="hidden lg:flex lg:flex-col gap-1 font-500">
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
                className={`flex lg:grid lg:grid-cols-5 gap-[0.45rem] text-center mb-5 overflow-auto ${
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
                    className="flex-1 min-w-[5rem] max-w-[8rem] lg:w-auto"
                  >
                    {size.replace(/CM\s*/, "")}
                  </SelectBlock>
                ))}
              </div>
              <Button
                size="custom"
                className="mt-3 md:mt-0 py-4 w-full rounded-full"
                type="submit"
              >
                {type === "default" && "更新尺寸"}
                {type === "favorite" && "加入購物車"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Modal>
  );
}
