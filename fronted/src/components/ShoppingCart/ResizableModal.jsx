import { useSelector, useDispatch } from "react-redux";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import { currencyFormatter } from "../../util/formatting.js";
import SelectBlock from "../UI/SelectBlock.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";

export default function ResizableModal() {
  const isShowing = useSelector((state) => state.modal.isChangeSizeShowing);
  const activeItem = useSelector((state) => state.cart.activeItem);
  const dispatch = useDispatch();

  function handleCloseModal() {
    dispatch(modalActions.closeChangeSizeModal());
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
              <h2 className="text-3xl">{activeItem.productName}</h2>
              <span>
                NT{currencyFormatter.format(activeItem.discountPrice)}
              </span>
            </div>

            <div>
              <span className="mb-2 block font-500">選取尺寸</span>
              <div className="grid grid-cols-5 gap-[0.45rem] text-center mb-5">
                {activeItem.allSizes.map((size) => (
                  <SelectBlock
                    key={size}
                    id={`${size}`}
                    name="allSize"
                    roundedStyle="rounded-lg"
                    defaultChecked={size === activeItem.size}
                  >
                    {size.replace(/CM\s*/, "")}
                  </SelectBlock>
                ))}
              </div>
              <FeatureButton paddingStyle="py-4">更新尺寸</FeatureButton>
            </div>
          </div>
        </div>
      </section>
    </Modal>
  );
}
