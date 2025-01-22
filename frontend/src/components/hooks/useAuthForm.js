// src/hooks/useAuthForm.js
import { useInput } from "./useInput.js";
import { useCheckboxInput } from "../hooks/useCheckboxInput.js";
import {
  hasExactLength,
  isNumeric,
  isNotEmpty,
  hasMinLength,
  isValidPassword,
  isGreaterThanZero,
} from "@/util/validation.js";

export function useAuthForm() {
  const authInput = {
    authCodeInput: useInput(
      "",
      (value) => hasExactLength(value, 8) && isNumeric(value)
    ),
    authLastNameInput: useInput("", (value) => isNotEmpty(value)),
    authFirstNameInput: useInput("", (value) => isNotEmpty(value)),
    authSubscribeInput: useCheckboxInput(false),
    authAgreeInput: useCheckboxInput(true),
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

  // 驗證邏輯
  const hasError = Object.values(authInput).some(
    (input) => input.hasError || input.hasCheckedError
  );
  const allErrorsInput = Object.values(authInput).filter(
    (input) => input.hasError || !input.value || !input.isChecked
  );

  return {
    ...authInput,
    hasError,
    allErrorsInput,
  };
}
