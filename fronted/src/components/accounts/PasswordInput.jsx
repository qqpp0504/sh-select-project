import Input from "../UI/Input.jsx";
import { useInput } from "../hooks/useInput.js";
import { isValidPassword, hasMinLength } from "../../util/validation.js";

export default function PasswordInput() {
  const authPasswordInput = useInput(
    "",
    (value) => hasMinLength(value, 8) && isValidPassword(value)
  );

  let errorHasMinLengthStyle;
  let errorPasswordStyle;

  if (authPasswordInput.value) {
    if (hasMinLength(authPasswordInput.value, 8)) {
      errorHasMinLengthStyle = "text-green-600";
    } else {
      errorHasMinLengthStyle = "text-red-600";
    }

    if (isValidPassword(authPasswordInput.value)) {
      errorPasswordStyle = "text-green-600";
    } else {
      errorPasswordStyle = "text-red-600";
    }
  }

  return (
    <div>
      <Input
        type="password"
        id="password"
        name="authPassword"
        value={authPasswordInput.value}
        onBlur={authPasswordInput.handleInputBlur}
        onChange={authPasswordInput.handleEditInputChange}
        error={authPasswordInput.hasError && "密碼*"}
        errorTextStyle="password"
        placeholderText="密碼*"
      />
      <div className="flex flex-col gap-1 text-xs text-gray pl-4 pt-2">
        <p
          className={`${errorHasMinLengthStyle} flex items-center gap-[0.35rem]`}
        >
          <span className="text-base font-extralight">&#x2713;</span>{" "}
          <span>至少 8 個字元</span>
        </p>
        <p className={`${errorPasswordStyle} flex items-center gap-1`}>
          <span className="text-[1.5rem] font-thin">&#x00D7;</span>{" "}
          <span className="pt-1">大寫字母、小寫字母以及 1 個數字</span>
        </p>
      </div>
    </div>
  );
}
