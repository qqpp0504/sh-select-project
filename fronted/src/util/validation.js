export function isEmail(value) {
  // 基本的 email 格式正則表達式
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // 額外的驗證規則
  const additionalRules = {
    hasNoConsecutiveDots: !value.includes(".."), // 不能有連續的點
  };

  // 檢查所有規則
  const passesBasicRegex = emailRegex.test(value);
  const passesAllRules = additionalRules.hasNoConsecutiveDots;

  return passesBasicRegex && passesAllRules;
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isNumeric(value) {
  return /^\d+$/.test(value);
}

export function isGreaterThanZero(value) {
  return value > 0;
}

export function isValidPassword(value) {
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/;
  return pattern.test(value);
}

export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function hasExactLength(value, length) {
  return value.length === length;
}
