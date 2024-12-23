import { useState } from "react";

export function useInput(defaultValue, validationFn, validationMessage) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleEditInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(true);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  const message = didEdit
    ? enteredValue // 如果已經編輯過並且有輸入值
      ? valueIsValid // 如果輸入有效
        ? { text: validationMessage, color: "green" } // 顯示有效訊息，並且顏色為綠色
        : { text: validationMessage, color: "red" } // 顯示錯誤訊息，並且顏色為紅色
      : { text: "必填", color: "" } // 如果沒有輸入值，則不顯示訊息
    : { text: " ", color: "red" }; // 如果尚未編輯過，顯示 "必填" 訊息，顏色為紅色

  return {
    value: enteredValue,
    handleInputChange,
    handleEditInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
    message,
  };
}
