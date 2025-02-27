import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import PasswordInput from "./PasswordInput.jsx";
import BirthdayInput from "./BirthdayInput.jsx";
import { useAuthForm } from "../hooks/useAuthForm.js";
import { isNumeric, hasExactLength } from "@/util/validation.js";
import { registerUser } from "@/util/http.js";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.account);
  const {
    authCodeInput,
    authLastNameInput,
    authFirstNameInput,
    authSubscribeInput,
    authAgreeInput,
    authPasswordInput,
    authYearInput,
    authMonthInput,
    authDayInput,
    hasError,
    allErrorsInput,
  } = useAuthForm();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    if (!email) {
      navigate("/accounts");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const authInputData = {
      ...Object.fromEntries(
        Array.from(fd.entries()).map(([key, value]) => {
          if (key === "subscribe" || key === "agree") {
            return [key, value === "true"];
          }
          return [key, value]; // 其他欄位保持字串
        })
      ),
      email: email,
    };

    const authInputValueIsEmpty = Object.values(authInputData).some(
      (value) => !value
    );

    if (hasError || authInputValueIsEmpty) {
      allErrorsInput.forEach((errorInput) => {
        errorInput.handleInputBlur();
      });
      return;
    }

    mutate(authInputData);
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
        <h1 className="text-3xl">馬上成為 SH SELECT 會員。</h1>
        <p className="text-gray-600 my-3 inline-block">
          代碼已寄送至 <br />
          {email}{" "}
          <Link to=".." className="text-gray underline">
            編輯
          </Link>
        </p>
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
              name="lastName"
              value={authLastNameInput.value}
              onBlur={authLastNameInput.handleInputBlur}
              onChange={authLastNameInput.handleInputChange}
              error={authLastNameInput.hasError && "姓氏*"}
              placeholderText="姓氏*"
            />
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={authFirstNameInput.value}
              onBlur={authFirstNameInput.handleInputBlur}
              onChange={authFirstNameInput.handleInputChange}
              error={authFirstNameInput.hasError && "名字*"}
              placeholderText="名字*"
            />
          </div>
          <PasswordInput authPasswordInput={authPasswordInput} />
          <BirthdayInput
            authYearInput={authYearInput}
            authMonthInput={authMonthInput}
            authDayInput={authDayInput}
          />
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
              <p
                className={`w-full ${
                  authAgreeInput.hasCheckedError &&
                  authAgreeInput.didEdit &&
                  "text-red-600"
                }`}
              >
                我同意 SH SELECT 的{" "}
                <span
                  className={`underline ${
                    authAgreeInput.hasCheckedError && authAgreeInput.didEdit
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  隱私權政策
                </span>
                與
                <span
                  className={`underline ${
                    authAgreeInput.hasCheckedError && authAgreeInput.didEdit
                      ? "text-red-600"
                      : "text-black"
                  }`}
                >
                  使用條款
                </span>
                。
              </p>
            </label>
          </div>
        </div>
        <div className="my-9 flex sm:justify-end">
          <Button
            type={`${isPending ? "button" : "submit"}`}
            size="custom"
            className={`w-full sm:w-auto ${
              isPending ? "py-3 px-8" : "py-3 px-6"
            }`}
          >
            {isPending ? (
              <LoadingIndicator color="white" margin="my-0" />
            ) : (
              "建立帳戶"
            )}
          </Button>
        </div>
        {isError && (
          <ErrorBlock message={error.info?.message || "無法建立帳戶"} />
        )}
      </form>
    </section>
  );
}
