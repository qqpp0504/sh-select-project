import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";

import Input from "../UI/Input.jsx";
import FeatureButton from "../UI/FeatureButton.jsx";
import { useInput } from "../hooks/useInput.js";
import { isEmail, isNotEmpty } from "../../util/validation.js";
import { authEmail } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import LoadingIndicator from "../UI/LoadingIndicator.jsx";
import { accountActions } from "../../store/account-slice.js";

export default function AuthEmail() {
  const { email } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput(email, (value) => isEmail(value) && isNotEmpty(value));

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: authEmail,
    onSuccess: (data) => {
      dispatch(accountActions.updatedEmail(data.email));

      if (data.isNotExist) {
        navigate("register");
      } else {
        navigate("login");
      }
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    if (formData.email === "" || emailHasError) {
      handleEmailBlur();
      return;
    }

    mutate(formData);
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
            name="email"
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
            type={`${isPending ? "button" : "submit"}`}
            bgColor="accountBlack"
            paddingStyle={`${isPending ? "py-3 px-8" : "py-3 px-6"}`}
          >
            {isPending ? (
              <LoadingIndicator color="white" margin="my-0" />
            ) : (
              "繼續"
            )}
          </FeatureButton>
        </div>

        {isError && (
          <ErrorBlock message={error.info?.message || "無法驗證信箱"} />
        )}
      </form>
    </section>
  );
}
