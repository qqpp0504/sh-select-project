import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ShippingInformation.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import ShippingForm from "./ShippingForm.jsx";
import Information from "./Information.jsx";
import { currencyFormatter } from "@/util/formatting.js";
import FeatureButton from "../UI/FeatureButton.jsx";
import cardIcon from "@/assets/card-icon.png";
import DeliveryTime from "./DeliveryTime.jsx";
import { useShippingForm } from "../hooks/useShippingForm.js";

export default function ShippingInformation() {
  const { shippingInput, hasError, allErrorsInput } = useShippingForm();
  const { shippingFee } = useSelector((state) => state.cart);

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
  }

  return (
    <section className="w-[28rem]">
      <h1 className="text-[1.7rem] font-500">寄送資訊</h1>
      {!token ? (
        <div className="font-500 flex flex-col gap-3 my-10">
          <Link to="/accounts">
            <Button variant="checkoutWhite" size="lg">
              加入會員
            </Button>
          </Link>
          <Link to="/accounts">
            <Button variant="checkoutWhite" size="lg">
              登入
            </Button>
          </Link>
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
              <FeatureButton
                type="button"
                bgColor="checkoutWhite"
                className="border-black"
              >
                <img src={cardIcon} alt="Card icon" className="w-5" />
                信用卡或金融簽帳卡
              </FeatureButton>
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
              <FeatureButton
                type="submit"
                bgColor={`${
                  Object.values(shippingInput).some((input) => !input.value)
                    ? "gray"
                    : "black"
                }`}
                className="my-5"
              >
                下訂單
              </FeatureButton>
            </div>
          </div>
        </Information>
      </form>
    </section>
  );
}
