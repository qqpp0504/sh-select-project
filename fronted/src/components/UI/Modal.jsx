import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;

    function handleDialogClose() {
      onClose();
    }

    if (open) {
      modal.showModal();
    } else {
      modal.close();
    }

    modal.addEventListener("close", handleDialogClose);

    return () => {
      modal.removeEventListener("close", handleDialogClose);
    };
  }, [open, onClose]);

  function handleBackdropClick(event) {
    if (event.target === dialog.current) {
      onClose();
    }
  }

  return createPortal(
    <dialog ref={dialog} onClick={handleBackdropClick} className="rounded-3xl">
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
