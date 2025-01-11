import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./ShippingInformation.css";
import Button from "../UI/Button.jsx";
import Input from "../UI/Input.jsx";
import CustomerForm from "./CustomerForm.jsx";
import Information from "./Information.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import FeatureButton from "../UI/FeatureButton.jsx";
import cardIcon from "../../assets/card-icon.png";
import DeliveryTime from "./DeliveryTime.jsx";

export default function ShippingInformation() {
  const [isShowingPayInfo, setIsShowingPayInfo] = useState(false);
  const { userData } = useSelector((state) => state.account);
  const { shippingFee } = useSelector((state) => state.cart);

  let displayShippingFee =
    shippingFee > 0
      ? `NT${currencyFormatter.format(shippingFee)} 運費`
      : "免運費";

  function handleShowPayInfo() {
    setIsShowingPayInfo((isShowing) => !isShowing);
  }

  return (
    <section className="w-[28rem]">
      <h1 className="text-[1.7rem] font-500">寄送資訊</h1>
      {!userData.token ? (
        <div className="font-500 flex flex-col gap-2 my-10">
          <Link to="/accounts" className="w-fit">
            <Button bgColor="checkoutWhite" paddingStyle="py-2 px-6">
              加入會員
            </Button>
          </Link>
          <Link to="/accounts" className="w-fit">
            <Button bgColor="checkoutWhite" paddingStyle="py-2 px-6">
              登入
            </Button>
          </Link>
        </div>
      ) : (
        <div className="py-6"></div>
      )}
      <form>
        <div>
          <h2 className="font-500 text-xl">輸入你的姓名和地址：</h2>
          <p className="text-gray">
            你將能夠在填完聯絡詳細資料輸入促銷代碼 (如有)。
          </p>
          <CustomerForm />
        </div>

        <div className="my-12">
          <h2 className="font-500 text-xl mb-3">你的聯絡資訊為何？</h2>
          <div className="py-4 flex flex-col gap-7">
            <Input type="email" id="email" placeholderText="電子郵件">
              結帳後會寄發確認電子郵件
            </Input>
            <Input type="tel" id="phone" placeholderText="電話號碼">
              請輸入你的電話號碼，以利辦理清關手續
            </Input>
          </div>
        </div>

        <hr />

        <Information title="帳單">
          <h2 className="font-500 text-xl mb-3">你的帳單地址為何？</h2>
          <div className="mt-6">
            <input
              id="text"
              type="checkbox"
              className="hidden dropdown-toggle peer"
            />
            <label
              htmlFor="text"
              className="checked peer-checked:unchecked cursor-pointer"
            >
              帳單地址同送貨地址
            </label>
            <div className="dropdown-form">
              <CustomerForm bill="bill" />
              <div className="my-2"></div>
              <Input type="tel" id="bill-phone" placeholderText="電話號碼">
                請輸入你的電話號碼，以利辦理清關手續
              </Input>
              <div className="my-3"></div>
            </div>
          </div>
        </Information>

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
                bgColor="checkoutWhite"
                className={`${
                  isShowingPayInfo ? "border-black" : "border-gray-300"
                }`}
                onClick={handleShowPayInfo}
              >
                <img src={cardIcon} alt="Card icon" className="w-5" />
                信用卡或金融簽帳卡
              </FeatureButton>
            </div>

            {isShowingPayInfo && (
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
                <FeatureButton className="my-5" bgColor="gray">
                  下訂單
                </FeatureButton>
              </div>
            )}
          </div>
        </Information>
      </form>
    </section>
  );
}
