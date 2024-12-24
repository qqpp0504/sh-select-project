import { useRef } from "react";

import Input from "../UI/Input.jsx";
import { useInput } from "../hooks/useInput.js";
import {
  isNotEmpty,
  hasMinLength,
  isGreaterThanZero,
} from "../../util/validation.js";

export default function BirthdayInput() {
  const monthInputRef = useRef(null);
  const dayInputRef = useRef(null);
  const authYearInput = useInput(
    "",
    (value) =>
      isNotEmpty(value) && hasMinLength(value, 4) && isGreaterThanZero(value)
  );
  const authMonthInput = useInput(
    "",
    (value) => isNotEmpty(value) && isGreaterThanZero(value)
  );
  const authDayInput = useInput(
    "",
    (value) => isNotEmpty(value) && isGreaterThanZero(value)
  );

  function handleInput(e, nextRef) {
    let inputValue = e.target.value;
    const maxYear = new Date().getFullYear();
    const minYear = 1900;
    const maxMonth = 12;
    const maxDay = 31;

    e.target.value = inputValue.replace(/[^0-9]/g, ""); // 移除非數字
    // 如果輸入框值為空，則不做處理
    if (e.target.value === "") {
      return;
    }

    if (e.target.name === "birthdayYear") {
      e.target.value = Math.min(inputValue, maxYear);
      if (inputValue.length === 4) {
        if (e.target.value < minYear) {
          e.target.value = minYear;
        }
        nextRef?.current?.focus(); // 切換到下一個輸入框
      }
    } else if (e.target.name === "birthdayMonth") {
      e.target.value = Math.min(inputValue, maxMonth);
      if (inputValue.length === 2) {
        nextRef?.current?.focus(); // 切換到下一個輸入框
      }
    } else if (e.target.name === "birthdayDay") {
      e.target.value = Math.min(inputValue, maxDay);
    }
  }

  let authBirthdayInputMessage;
  const hasBirthdayInputError =
    authYearInput.hasError || authMonthInput.hasError || authDayInput.hasError;
  if (hasBirthdayInputError) {
    if (!hasMinLength(authYearInput.value, 4) && authYearInput.value) {
      authBirthdayInputMessage = "出生日期無效（請輸入西元年）";
    } else {
      authBirthdayInputMessage = "必填";
    }
  }

  return (
    <div className="grid grid-cols-[12rem_1fr_1fr] gap-3">
      <Input
        type="number"
        id="birthday-year"
        name="birthdayYear"
        value={authYearInput.value}
        onBlur={authYearInput.handleInputBlur}
        onChange={authYearInput.handleInputChange}
        error={hasBirthdayInputError && "年*"}
        errorText={authBirthdayInputMessage}
        placeholderText="年*"
        onInput={(e) => handleInput(e, monthInputRef)}
      />
      <Input
        ref={monthInputRef}
        type="number"
        id="birthday-month"
        name="birthdayMonth"
        value={authMonthInput.value}
        onBlur={authMonthInput.handleInputBlur}
        onChange={authMonthInput.handleInputChange}
        error={hasBirthdayInputError && "月*"}
        errorText=" "
        placeholderText="月*"
        onInput={(e) => handleInput(e, dayInputRef)}
      />
      <Input
        ref={dayInputRef}
        type="number"
        id="birthday-day"
        name="birthdayDay"
        value={authDayInput.value}
        onBlur={authDayInput.handleInputBlur}
        onChange={authDayInput.handleInputChange}
        error={hasBirthdayInputError && "日*"}
        errorText=" "
        placeholderText="日*"
        onInput={handleInput}
      />
    </div>
  );
}
