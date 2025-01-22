import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

import Modal from "../UI/Modal.jsx";
import { modalActions } from "@/store/modal-slice.js";
import Button from "../UI/Button.jsx";
import successIcon from "@/assets/success-icon.png";

export default function FavoriteAddedModal() {
  const timer = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isShowing } = useSelector((state) => state.modal.favoriteAddedModal);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isShowing) {
      const totalDuration = 3000;
      const updateInterval = 100;
      const step = (100 / totalDuration) * updateInterval; // 每次更新的進度

      timer.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + step;
          if (newProgress >= 100) {
            clearInterval(timer.current); // 如果進度條滿了，停止計時器
            handleCloseModal();
            return 100;
          }

          return newProgress;
        });
      }, updateInterval);

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing]);

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
      <Progress value={progress} className="w-full h-[0.35rem]" />
      <div className="w-[30rem] h-[16rem] p-11 flex flex-col justify-between">
        <div></div>

        <div className="flex justify-center items-center gap-1">
          <img src={successIcon} alt="Success icon" className="w-7" />
          <p className="text-lg font-500">已成功加入最愛！</p>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            onClick={handleCloseModal}
            bgColor="checkoutWhite"
            className="w-fit rounded-[1.25rem]"
            paddingStyle="px-6 py-[0.6rem]"
          >
            回到購物車
          </Button>
          <Button
            onClick={() => handleCloseModal("/favorites")}
            className="w-fit rounded-[1.25rem]"
            paddingStyle="px-6 py-[0.6rem]"
          >
            查看我的最愛
          </Button>
        </div>
      </div>
    </Modal>
  );
}
