import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../UI/Button.jsx";

export default function ResponsiveCheckoutButton() {
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { userData } = useSelector((state) => state.account);

  function handleOpenCheckoutButtonModal() {
    if (!userData.token) {
      setIsOpenModal(true);
    } else {
      navigate("/checkout");
    }
  }

  function handleCloseCheckoutButtonModal() {
    setIsOpenModal(false);
  }

  useEffect(() => {
    if (isOpenModal) {
      document.body.style.overflow = "hidden"; // 禁止滾動
    } else {
      document.body.style.overflow = ""; // 恢復滾動
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenModal]);

  return (
    <div className="lg:hidden">
      <div className="px-3 py-4 fixed left-0 bottom-0 border-t border-gray-200 w-full bg-white">
        <Button
          onClick={handleOpenCheckoutButtonModal}
          size="xl"
          variant={totalQuantity === 0 ? "disable" : "black"}
          className="w-full rounded-full"
        >
          前往結帳
        </Button>
      </div>

      {!userData.token && (
        <div
          className={`p-5 fixed left-0 bottom-0 border-t border-gray-200 w-full bg-white flex flex-col text-center gap-3 z-50 transition duration-200 ${
            isOpenModal ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <Button
            link="/checkout"
            size="xl"
            variant={totalQuantity === 0 ? "disable" : "black"}
            className="w-full rounded-full"
          >
            訪客結帳
          </Button>
          <Button
            link="/accounts"
            size="xl"
            variant={totalQuantity === 0 ? "disable" : "black"}
            className="w-full rounded-full"
          >
            會員結帳
          </Button>
        </div>
      )}

      {!userData.token && isOpenModal && (
        <div
          onClick={handleCloseCheckoutButtonModal}
          className="fixed top-0 left-0 bg-black opacity-30 w-full h-screen z-40"
        ></div>
      )}
    </div>
  );
}
