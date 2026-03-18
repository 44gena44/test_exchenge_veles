export const preventKeysOnCountryNameInput = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const allowed = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
    const isLetter = /^[a-zA-Zа-яА-ЯёЁ]$/.test(e.key);
  
    if (!isLetter && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };
  