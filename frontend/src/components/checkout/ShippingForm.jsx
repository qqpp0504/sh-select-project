import Input from "../UI/Input.jsx";
import Select from "./Select.jsx";
import {
  isEmail,
  hasExactLength,
  isChinese,
  validateInput,
} from "../../util/validation.js";

export default function ShippingForm({
  lastNameInput,
  firstNameInput,
  postalInput,
  citySelect,
  districtsInput,
  addressInput,
  emailInput,
  phoneInput,
}) {
  const postalInputMessage = validateInput(
    postalInput,
    (value) => hasExactLength(value, 3),
    "請輸入郵遞區號",
    "郵遞區號無效"
  );

  const districtsInputMessage = validateInput(
    districtsInput,
    isChinese,
    "請輸入鄉鎮市區",
    "城市必須為中文"
  );

  const addressInputMessage = validateInput(
    addressInput,
    isChinese,
    "請輸入你的詳細地址",
    "地址必須為中文"
  );

  const emailInputMessage = validateInput(
    emailInput,
    (value) => isEmail(value),
    "請輸入你的電子郵件地址",
    "請輸入有效的電子郵件地址"
  );

  const phoneInputMessage = validateInput(
    phoneInput,
    (value) => hasExactLength(value, 10),
    "請輸入你的電話號碼",
    "請輸入有效的電話號碼"
  );

  return (
    <>
      <div>
        <h2 className="font-500 text-xl">輸入你的姓名和地址：</h2>
        <p className="text-gray">
          你將能夠在填完聯絡詳細資料輸入促銷代碼 (如有)。
        </p>
        <div className="py-4 flex flex-col gap-7">
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholderText="姓氏"
            value={lastNameInput.value}
            onBlur={lastNameInput.handleInputBlur}
            onChange={lastNameInput.handleInputChange}
            error={lastNameInput.hasError}
            errorText="請輸入你的姓氏"
          >
            請輸入你的姓氏，以利辦理清關手續
          </Input>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholderText="名字"
            value={firstNameInput.value}
            onBlur={firstNameInput.handleInputBlur}
            onChange={firstNameInput.handleInputChange}
            error={firstNameInput.hasError}
            errorText="請輸入你的名字"
          >
            請輸入你的名字，以利辦理清關手續
          </Input>
          <Input
            type="text"
            id="country"
            name="country"
            value="台灣"
            className="greenPoint"
            readOnly
          >
            {" "}
          </Input>
          <Input
            type="number"
            id="postal"
            name="postal"
            placeholderText="郵遞區號"
            min="0"
            value={postalInput.value}
            onBlur={postalInput.handleInputBlur}
            onChange={postalInput.handleEditInputChange}
            error={postalInput.hasError}
            errorText={postalInputMessage}
          />
          <Select userSelect={citySelect} />
          <div className="relative">
            <Input
              type="text"
              id="districts"
              name="districts"
              placeholderText="鄉鎮市區"
              value={districtsInput.value}
              onBlur={districtsInput.handleInputBlur}
              onChange={districtsInput.handleInputChange}
              error={districtsInput.hasError}
              errorText={districtsInputMessage}
              className="greenPoint"
            />
            {!districtsInput.hasError && districtsInput.value && (
              <div className="absolute bg-green-600 rounded-full w-2 h-2 right-4 top-1/2 -translate-y-1/2"></div>
            )}
          </div>

          <div className="relative">
            <Input
              type="text"
              id="address"
              name="address"
              placeholderText="地址"
              value={addressInput.value}
              onBlur={addressInput.handleInputBlur}
              onChange={addressInput.handleInputChange}
              error={addressInput.hasError}
              errorText={addressInputMessage}
            >
              我們無法送貨至郵政信箱
            </Input>
            {!addressInput.hasError && addressInput.value && (
              <div className="absolute bg-green-600 rounded-full w-2 h-2 right-4 top-1/2 -translate-y-1/2"></div>
            )}
          </div>
        </div>
      </div>

      <div className="my-12">
        <h2 className="font-500 text-xl mb-3">你的聯絡資訊為何？</h2>
        <div className="py-4 flex flex-col gap-7">
          <Input
            type="email"
            id="email"
            name="email"
            placeholderText="電子郵件"
            value={emailInput.value}
            onBlur={emailInput.handleInputBlur}
            onChange={emailInput.handleEditInputChange}
            error={emailInput.hasError}
            errorText={emailInputMessage}
          >
            結帳後會寄發確認電子郵件
          </Input>
          <Input
            type="tel"
            id="phone"
            name="phone"
            placeholderText="電話號碼"
            value={phoneInput.value}
            onBlur={phoneInput.handleInputBlur}
            onChange={phoneInput.handleEditInputChange}
            error={phoneInput.hasError}
            errorText={phoneInputMessage}
          >
            請輸入你的電話號碼，以利辦理清關手續
          </Input>
        </div>
      </div>
    </>
  );
}
