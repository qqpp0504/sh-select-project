import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import ShippingForm from "./ShippingForm.jsx";
import Information from "./Information.jsx";
import { currencyFormatter } from "@/util/formatting.js";
import cardIcon from "@/assets/card-icon.png";
import DeliveryTime from "./DeliveryTime.jsx";
import { useShippingForm } from "../hooks/useShippingForm.js";
import { addOrder } from "@/util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { modalActions } from "@/store/modal-slice.js";

export default function ShippingInformation() {
  const { shippingInput, hasError, allErrorsInput } = useShippingForm();
  const { items, totalAmount, totalPrice, shippingFee } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      dispatch(modalActions.showModal({ modalType: "successSendOrdersModal" }));
    },
  });

  const token = localStorage.getItem("token");

  let displayShippingFee =
    shippingFee > 0
      ? `NT${currencyFormatter.format(shippingFee)} 運費`
      : "免運費";

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const inputValueIsEmpty = Object.values(formData).some((value) => !value);

    if (hasError || inputValueIsEmpty || !formData.city) {
      allErrorsInput.forEach((errorInput) => {
        errorInput.handleInputBlur();
      });
      return;
    }

    let orderData = {
      ...formData,
      products: items,
      totalAmount,
      totalPrice,
      shippingFee,
    };

    if (token) {
      orderData = { ...orderData, orderType: "member" };
      mutate(orderData);
    } else {
      orderData = { ...orderData, orderType: "guest" };
      mutate(orderData);
    }
  }

  return (
    <section className="w-[28rem]">
      <h1 className="text-[1.7rem] font-500">寄送資訊</h1>
      {!token ? (
        <div className="font-500 flex flex-col gap-3 my-10">
          <Button
            variant="white"
            size="lg"
            link="/accounts"
            className="border border-gray-300 w-fit"
          >
            加入會員
          </Button>
          <Button
            variant="white"
            size="lg"
            link="/accounts"
            className="border border-gray-300 w-fit"
          >
            登入
          </Button>
        </div>
      ) : (
        <div className="py-6"></div>
      )}
      <form onSubmit={handleSubmit}>
        <ShippingForm {...shippingInput} />

        <hr />

        <Information title="運送資訊">
          <div className="text-gray flex flex-col gap-3">
            <p>{displayShippingFee}</p>
            <DeliveryTime className="text-gray" />
            <p>此為國際配送，必須進行清關作業</p>
          </div>
        </Information>

        <hr />

        <Information title="付款">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-500 text-xl mb-5">有促銷代碼嗎？</h2>
              <Input
                type="text"
                id="promoCode"
                placeholder="促銷"
                readOnly
                className="bg-gray-100"
              />
            </div>

            <div>
              <h2 className="font-500 text-xl mb-5">你想要如何付款？</h2>
              <Button
                type="button"
                variant="checkout"
                size="custom"
                className="flex items-center gap-3 px-6 py-6 rounded-xl"
              >
                <img src={cardIcon} alt="Card icon" className="w-5" />
                信用卡或金融簽帳卡
              </Button>
            </div>

            <div>
              <h2 className="font-500 text-xl mb-5">
                請輸入你的詳細付款資訊：
              </h2>
              <div className="py-4 flex flex-col gap-7">
                <Input
                  type="text"
                  id="cardName"
                  placeholder="信用卡持有人姓名"
                  readOnly
                />
                <Input
                  type="number"
                  id="cardNumber"
                  placeholder="卡號"
                  readOnly
                />
                <div className="grid grid-cols-2 gap-5">
                  <Input
                    type="number"
                    id="cardMD"
                    placeholder="月份/年份末兩碼"
                    readOnly
                  />
                  <Input
                    type="number"
                    id="cardSecurityCode"
                    placeholder="安全碼"
                    readOnly
                  />
                </div>
              </div>
              <Button
                type="submit"
                variant={`${
                  Object.values(shippingInput).some((input) => !input.value)
                    ? "disable"
                    : "black"
                }`}
                size="xl"
                className="my-5 w-full"
              >
                {isPending ? (
                  <LoadingIndicator color="white" margin="" />
                ) : (
                  "下訂單"
                )}
              </Button>
            </div>
          </div>
        </Information>
      </form>

      {isError && <p>{error.message}</p>}
    </section>
  );
}
