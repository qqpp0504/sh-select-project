/* eslint-disable react/prop-types */
import { useState } from "react";

import Input from "../UI/Input.jsx";
import { isValidPassword, hasMinLength } from "../../util/validation.js";
import showPasswordIcon from "../../assets/show-password-icon.png";
import hidePasswordIcon from "../../assets/hide-password-icon.png";

export default function PasswordInput({ authPasswordInput }) {
  const [showPassword, setShowPassword] = useState(false);

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

  function handleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  let visiblePasswordImage;

  if (showPassword) {
    visiblePasswordImage = (
      <img src={hidePasswordIcon} alt="Hide password Icon" className="w-6" />
    );
  } else {
    visiblePasswordImage = (
      <img
        src={showPasswordIcon}
        alt="Show password Icon"
        className="w-[1.4rem]"
      />
    );
  }

  return (
    <div className="relative">
      <Input
        type={`${showPassword ? "text" : "password"}`}
        paddingStyle="pl-4 pr-12"
        id="password"
        name="authPassword"
        value={authPasswordInput.value}
        onBlur={authPasswordInput.handleInputBlur}
        onChange={authPasswordInput.handleEditInputChange}
        error={authPasswordInput.hasError && "密碼*"}
        errorTextStyle="password"
        placeholderText="密碼*"
      />
      <button
        onClick={handleShowPassword}
        type="button"
        className="absolute right-4 top-4"
      >
        {visiblePasswordImage}
      </button>
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
