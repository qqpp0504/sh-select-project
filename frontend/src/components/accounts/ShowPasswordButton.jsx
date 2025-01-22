/* eslint-disable react/prop-types */
import { useState } from "react";

import Input from "../UI/Input.jsx";
import showPasswordIcon from "@/assets/show-password-icon.png";
import hidePasswordIcon from "@/assets/hide-password-icon.png";

export default function ShowPasswordButton({ authPasswordInput }) {
  const [showPassword, setShowPassword] = useState(false);

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
    <div>
      <Input
        type={`${showPassword ? "text" : "password"}`}
        paddingStyle="pl-4 pr-12 px-4 py-[0.9rem]"
        id="password"
        name="password"
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
    </div>
  );
}
