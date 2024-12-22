import Input from "../UI/Input.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import { useInput } from "../hooks/useInput.js";
import { isNotEmpty } from "../../util/validation.js";

export default function RegisterForm() {
  const authCodeInput = useInput("", (value) => isNotEmpty(value));
  const authLastNameInput = useInput("", (value) => isNotEmpty(value));
  const authFirstNameInput = useInput("", (value) => isNotEmpty(value));
  const authPasswordInput = useInput("", (value) => isNotEmpty(value));
  const authYearInput = useInput("", (value) => isNotEmpty(value));
  const authMonthInput = useInput("", (value) => isNotEmpty(value));
  const authDateInput = useInput("", (value) => isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    console.log(data);
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
            onChange={authCodeInput.handleInputChange}
            error={authCodeInput.hasError && "驗證碼*"}
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
          <Input
            type="password"
            id="password"
            name="authPassword"
            value={authPasswordInput.value}
            onBlur={authPasswordInput.handleInputBlur}
            onChange={authPasswordInput.handleInputChange}
            error={authPasswordInput.hasError && "密碼*"}
            placeholderText="密碼*"
          />
          <div className="grid grid-cols-[12rem_1fr_1fr] gap-3">
            <Input
              type="number"
              id="birthday-year"
              name="birthdayYear"
              value={authYearInput.value}
              onBlur={authYearInput.handleInputBlur}
              onChange={authYearInput.handleInputChange}
              error={authYearInput.hasError && "年*"}
              placeholderText="年*"
            />
            <Input
              type="number"
              id="birthday-month"
              name="birthdayMonth"
              value={authMonthInput.value}
              onBlur={authMonthInput.handleInputBlur}
              onChange={authMonthInput.handleInputChange}
              error={authMonthInput.hasError && "月*"}
              placeholderText="月*"
            />
            <Input
              type="number"
              id="birthday-date"
              name="birthdayDate"
              value={authDateInput.value}
              onBlur={authDateInput.handleInputBlur}
              onChange={authDateInput.handleInputChange}
              error={authDateInput.hasError && "日*"}
              placeholderText="日*"
            />
          </div>
        </div>
        <div className="text-gray-600 mt-10 flex flex-col gap-4">
          <div>
            <input type="checkbox" id="subscribe" className="hidden peer" />
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
            <input type="checkbox" id="agree" className="hidden peer" />
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
          <FeatureButton bgColor="accountBlack" paddingStyle="py-3">
            建立帳號
          </FeatureButton>
        </div>
      </form>
    </section>
  );
}
