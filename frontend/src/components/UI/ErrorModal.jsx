import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export default function ErrorModal({ message, buttonText, link }) {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  function handleClose(link) {
    setIsOpen(false);

    if (link) {
      navigate(link);
    }
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="w-[30rem] h-[16rem] p-11 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-500 mb-6">錯誤</h3>
          <p>{message}</p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => handleClose(link)}
            className="w-fit rounded-[1.25rem]"
            paddingStyle="px-6 py-[0.6rem]"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
