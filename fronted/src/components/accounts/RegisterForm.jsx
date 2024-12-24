import Input from "../UI/Input.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import { useInput } from "../hooks/useInput.js";
import PasswordInput from "./PasswordInput.jsx";
import BirthdayInput from "./BirthdayInput.jsx";
import {
  isNotEmpty,
  isNumeric,
  hasExactLength,
  hasMinLength,
  isValidPassword,
  isGreaterThanZero,
} from "../../util/validation.js";

export default function RegisterForm() {
  const authInput = {
    authCodeInput: useInput(
      "",
      (value) => hasExactLength(value, 8) && isNumeric(value)
    ),
    authLastNameInput: useInput("", (value) => isNotEmpty(value)),
    authFirstNameInput: useInput("", (value) => isNotEmpty(value)),
    authSubscribeInput: useInput("", () => true),
    authAgreeInput: useInput("", () => true),
    authPasswordInput: useInput(
      "",
      (value) => hasMinLength(value, 8) && isValidPassword(value)
    ),
    authYearInput: useInput(
      "",
      (value) =>
        isNotEmpty(value) && hasMinLength(value, 4) && isGreaterThanZero(value)
    ),
    authMonthInput: useInput(
      "",
      (value) => isNotEmpty(value) && isGreaterThanZero(value)
    ),
    authDayInput: useInput(
      "",
      (value) => isNotEmpty(value) && isGreaterThanZero(value)
    ),
  };

  const {
    authCodeInput,
    authLastNameInput,
    authFirstNameInput,
    authSubscribeInput,
    authAgreeInput,
  } = authInput;

  const hasError = Object.values(authInput).some((input) => input.hasError);

  function handleSubmit(event) {
    event.preventDefault();

    if (hasError) {
      return;
    }

    const fd = new FormData(event.target);
    const authInputData = Object.fromEntries(
      Array.from(fd.entries()).map(([key, value]) => {
        if (key === "subscribe" || key === "agree") {
          return [key, value === "true"];
        }

        return [key, value]; // 其他欄位保持字串
      })
    );

    console.log(authInputData);
  }

  let authCodeInputMessage;
  if (authCodeInput.value) {
    if (!hasExactLength(authCodeInput.value, 8)) {
      authCodeInputMessage = "驗證碼必須為 8 位數";
    } else if (
      hasExactLength(authCodeInput.value, 8) &&
      !isNumeric(authCodeInput.value)
    ) {
      authCodeInputMessage = "驗證無效";
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {" "}
        <h1 className="text-3xl">馬上成為 SH SELECT 會員。</h1>
        <span className="text-gray-600 my-3 inline-block">
          代碼已寄送至 email
        </span>
        <div className="py-4 flex flex-col gap-7">
          <Input
            type="text"
            id="authCode"
            name="authCode"
            value={authCodeInput.value}
            onBlur={authCodeInput.handleInputBlur}
            onChange={authCodeInput.handleEditInputChange}
            error={authCodeInput.hasError && "驗證碼*"}
            errorText={authCodeInputMessage}
            placeholderText="驗證碼*"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              id="lastName"
              name="authLastName"
              value={authLastNameInput.value}
              onBlur={authLastNameInput.handleInputBlur}
              onChange={authLastNameInput.handleInputChange}
              error={authLastNameInput.hasError && "姓氏*"}
              placeholderText="姓氏*"
            />
            <Input
              type="text"
              id="firstName"
              name="authFirstName"
              value={authFirstNameInput.value}
              onBlur={authFirstNameInput.handleInputBlur}
              onChange={authFirstNameInput.handleInputChange}
              error={authFirstNameInput.hasError && "名字*"}
              placeholderText="名字*"
            />
          </div>
          <PasswordInput />
          <BirthdayInput />
        </div>
        <div className="text-gray-600 mt-10 flex flex-col gap-4">
          <div>
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              value={authSubscribeInput.isChecked}
              onChange={authSubscribeInput.handleCheckboxChange}
              className="hidden peer"
            />
            <label
              htmlFor="subscribe"
              className="account-unchecked peer-checked:account-checked cursor-pointer"
            >
              <p className="w-full">
                訂閱電子郵件就能收到 SH SELECT 商品優惠和會員福利的最新消息。
              </p>
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="agree"
              name="agree"
              value={authAgreeInput.isChecked}
              onChange={authAgreeInput.handleCheckboxChange}
              className="hidden peer"
            />
            <label
              htmlFor="agree"
              className="account-unchecked peer-checked:account-checked cursor-pointer"
            >
              <p className="w-full">
                我同意 SH SELECT 的{" "}
                <span className="underline text-black">隱私權政策</span>與
                <span className="underline text-black">使用條款</span>。
              </p>
            </label>
          </div>
        </div>
        <div className="my-9 flex justify-end">
          <FeatureButton
            type="submit"
            bgColor="accountBlack"
            paddingStyle="py-3"
          >
            建立帳號
          </FeatureButton>
        </div>
      </form>
    </section>
  );
}
