import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "../UI/Modal";
import { modalActions } from "@/store/modal-slice.js";
import Button from "../UI/Button.jsx";
import TimingProgress from "../UI/TimingProgress.jsx";

export default function SuccessSendOrdersModal() {
  const timer = useRef();
  const { isShowing } = useSelector(
    (state) => state.modal.successSendOrdersModal
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);

  const token = localStorage.getItem("token");

  function handleCloseModal() {
    dispatch(modalActions.closeModal({ modalType: "successSendOrdersModal" }));
    setProgress(0);
    clearInterval(timer.current);

    navigate("/");
  }

  return (
    <Modal open={isShowing}>
      <TimingProgress
        isShowing={isShowing}
        timer={timer}
        time={5000}
        onClose={handleCloseModal}
        className="w-full h-[0.35rem]"
        progress={progress}
        setProgress={setProgress}
      />
      <div className="px-12 py-8 lg:p-5 lg:w-[30rem] lg:h-[25rem] flex flex-col justify-center items-center gap-3">
        {isShowing && (
          <DotLottieReact
            className="w-[18rem]"
            src="https://lottie.host/d61e4285-988e-4115-9d2a-702bad10447f/1yz0LurKGU.lottie"
            autoplay
          />
        )}

        <div className="flex flex-col gap-5 items-center">
          <div className="flex flex-col gap-1 items-center">
            <p className="text-xl font-500">已經收到您的訂單！</p>
            <p className="text-sm text-gray">將在 5 秒後回到首頁</p>
          </div>

          <div className="flex gap-6">
            <Button link="/" variant="bordered" size="lg" className="w-fit">
              回到首頁
            </Button>
            {token && (
              <Button link="/orders" size="lg" className="w-fit">
                查看訂單
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
