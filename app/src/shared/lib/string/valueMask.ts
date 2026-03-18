export const valueMask = (value: number | null | undefined): string => {
  if (typeof value !== 'number' ||isNaN(value)) return "";
  const stringVal = value.toString().replace(".", ",");
  const maskedValue = formatWithSpaces(stringVal);
  return maskedValue;
};

export const formatWithSpaces = (value: string) => {
  const [intPart, decPart] = value.split(",");
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return decPart !== undefined ? `${formattedInt},${decPart}` : formattedInt;
};

export const normalizeInput = (val: string) => {
  return val
    .replace(/[^\d.,]/g, "")
    .replace(/[,\.]{2,}/g, "")
    .replace(/[.]/g, ",");
};

export const formatWithSpacesCardNumber = (value: string) => {
  return value.replace(/(.{4})/g, "$1 ").trim()

};

export const formatPhoneNumber = (value: string) => {
  // Remove all non-digits
  const digits = value.replace(/\D/g, '');
  
  // Handle different input scenarios
  let cleanDigits = digits;
  
  // If starts with 7, keep it
  // If starts with 8, replace with 7
  // If doesn't start with 7 or 8, add 7
  if (digits.startsWith('8') && digits.length > 1) {
    cleanDigits = '7' + digits.slice(1);
  } else if (!digits.startsWith('7') && digits.length > 0) {
    cleanDigits = '7' + digits;
  }
  
  // Apply mask: +7 (999) 999 99 99
  if (cleanDigits.length === 0) return '';
  if (cleanDigits.length === 1) return '+7';
  if (cleanDigits.length <= 4) return `+7 (${cleanDigits.slice(1)}`;
  if (cleanDigits.length <= 7) return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4)}`;
  if (cleanDigits.length <= 9) return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4, 7)} ${cleanDigits.slice(7)}`;
  
  return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4, 7)} ${cleanDigits.slice(7, 9)} ${cleanDigits.slice(9, 11)}`;
};

export const normalizePhoneInput = (value: string) => {
  return value.replace(/\D/g, '');
};

