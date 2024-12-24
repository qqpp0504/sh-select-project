import { useState } from "react";

export function useInput(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(defaultValue);
  const [isChecked, setIsChecked] = useState(false);
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

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleEditInputChange,
    handleCheckboxChange,
    handleInputBlur,
    isChecked,
    hasError: didEdit && !valueIsValid,
  };
}
