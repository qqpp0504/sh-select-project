import { useNavigate } from "react-router-dom";

import Input from "../UI/Input.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import { useInput } from "../hooks/useInput.js";
import { isEmail, isNotEmpty } from "../../util/validation.js";

export default function AuthEmail() {
  const navigate = useNavigate();
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const { authEmail } = Object.fromEntries(fd.entries());

    if (authEmail === "" || emailHasError) {
      handleEmailBlur();
      return;
    }

    navigate("register");
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h1 className="text-3xl">輸入你的電子郵件即可註冊或登入。</h1>
        <span className="text-gray-600 my-3 inline-block">台灣</span>
        <div className="my-6">
          <Input
            type="email"
            id="email"
            name="authEmail"
            value={emailValue}
            onBlur={handleEmailBlur}
            onChange={handleEmailChange}
            error={emailHasError && "電子郵件*"}
            errorText={emailHasError && emailValue && "電子郵件地址無效"}
            placeholderText="電子郵件*"
          />
        </div>
        <p className="text-gray mt-10">
          繼續即代表我同意 SH SELECT 的{" "}
          <span className="underline">隱私權政策</span>與
          <span className="underline">使用條款</span>。
        </p>
        <div className="my-9 flex justify-end">
          <FeatureButton
            type="submit"
            bgColor="accountBlack"
            paddingStyle="py-3"
          >
            繼續
          </FeatureButton>
        </div>
      </form>
    </section>
  );
}
