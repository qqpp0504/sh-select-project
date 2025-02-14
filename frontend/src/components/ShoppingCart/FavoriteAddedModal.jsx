import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "@/store/modal-slice.js";
import Button from "../UI/Button.jsx";
import TimingProgress from "../UI/TimingProgress.jsx";

export default function FavoriteAddedModal() {
  const timer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShowing } = useSelector((state) => state.modal.favoriteAddedModal);
  const [progress, setProgress] = useState(0);

  function handleCloseModal(link) {
    dispatch(modalActions.closeModal({ modalType: "favoriteAddedModal" }));
    setProgress(0);
    clearInterval(timer.current);

    if (link) {
      navigate(link);
    }
  }

  return (
    <Modal open={isShowing} onClose={handleCloseModal}>
      <TimingProgress
        isShowing={isShowing}
        timer={timer}
        time={3000}
        onClose={handleCloseModal}
        className="w-full h-[0.35rem]"
        progress={progress}
        setProgress={setProgress}
      />
      <div className="w-full md:w-[30rem] h-[16rem] p-11 flex flex-col justify-between">
        <div></div>

        <div className="flex justify-center items-center gap-2">
          <FaCircleCheck size="1.2rem" color="green" />
          <p className="text-lg font-500">已成功加入最愛！</p>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            onClick={handleCloseModal}
            variant="bordered"
            size="custom"
            className="w-fit rounded-[1.25rem] px-6 py-[0.6rem]"
          >
            回到購物車
          </Button>
          <Button
            onClick={() => handleCloseModal("/favorites")}
            size="custom"
            className="w-fit rounded-[1.25rem] px-6 py-[0.6rem]"
          >
            查看我的最愛
          </Button>
        </div>
      </div>
    </Modal>
  );
}
