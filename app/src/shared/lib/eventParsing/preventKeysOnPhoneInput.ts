export const preventKeysOnPhoneInput = (
  e: React.KeyboardEvent<HTMLInputElement>
) => {
  const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
  const isNumber = /^[0-9]$/.test(e.key);

  if (!isNumber && !allowed.includes(e.key)) {
    e.preventDefault();
  }
};
