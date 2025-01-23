import { useInput } from "./useInput.js";
import {
  isEmail,
  isNotEmpty,
  hasExactLength,
  isChinese,
} from "@/util/validation.js";

export function useShippingForm() {
  const shippingInput = {
    lastNameInput: useInput("", (value) => isNotEmpty(value)),
    firstNameInput: useInput("", (value) => isNotEmpty(value)),
    postalInput: useInput(
      "",
      (value) => isNotEmpty(value) && hasExactLength(value, 3),
      "number"
    ),
    citySelect: useInput("", (value) => isNotEmpty(value)),
    districtsInput: useInput(
      "",
      (value) => isNotEmpty(value) && isChinese(value)
    ),
    addressInput: useInput(
      "",
      (value) => isNotEmpty(value) && isChinese(value)
    ),
    emailInput: useInput("", (value) => isEmail(value) && isNotEmpty(value)),
    phoneInput: useInput("", (value) => hasExactLength(value, 10)),
  };

  // 驗證邏輯
  const hasError = Object.values(shippingInput).some((input) => input.hasError);
  const allErrorsInput = Object.values(shippingInput).filter(
    (input) => input.hasError || !input.value
  );

  return {
    shippingInput,
    hasError,
    allErrorsInput,
  };
}
