import { useState } from "react";

export function useCheckboxInput(validateError) {
  const [isChecked, setIsChecked] = useState(false);
  const [didEdit, setDidEdit] = useState(false);

  function handleInputChange(event) {
    setIsChecked(event.target.checked);
    setDidEdit(false);
  }

  function handleCheckboxChange(event) {
    setIsChecked(event.target.checked);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  const hasCheckedError = validateError === true && !isChecked;

  return {
    handleInputChange,
    handleCheckboxChange,
    handleInputBlur,
    isChecked,
    didEdit,
    hasCheckedError,
  };
}
