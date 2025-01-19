import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "../../store/modal-slice.js";
import FeatureButton from "../UI/FeatureButton.jsx";

export default function ShippingModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isShowing, link } = useSelector((state) => state.modal.shippingModal);

  function handleCloseShippingModal() {
    dispatch(modalActions.closeModal({ modalType: "shippingModal" }));
  }

  function handleNavigateOtherPage() {
    dispatch(modalActions.closeModal({ modalType: "shippingModal" }));
    navigate(link);
  }

  return (
    <Modal open={isShowing} onClose={handleCloseShippingModal}>
      <div className="w-[30rem] h-[20rem] p-10 flex flex-col justify-between">
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl">正在跳離結帳頁面</p>
          <p className="text-gray">你的結帳資料將遺失。是否要離開結帳頁面？</p>
        </div>

        <div className="flex flex-col gap-2">
          <FeatureButton
            onClick={handleNavigateOtherPage}
            className="focus:outline-none"
          >
            離開結帳頁面
          </FeatureButton>
          <FeatureButton
            className="focus:outline-none"
            bgColor="white"
            onClick={handleCloseShippingModal}
          >
            繼續結帳
          </FeatureButton>
        </div>
      </div>
    </Modal>
  );
}
