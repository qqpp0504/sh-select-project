import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

import Input from "../UI/Input.jsx";

export default function ShowPasswordButton({ authPasswordInput }) {
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword((prevState) => !prevState);
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
        {showPassword ? <FiEyeOff size="1.4rem" /> : <FiEye size="1.4rem" />}
      </button>
    </div>
  );
}
