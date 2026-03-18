import { ValidationOptions } from "./types";

export type ValidateCardNumberProps = {
  value: string | null;
  options?: ValidationOptions;
};

 
export const validateCardNumber = ({ value, options }: ValidateCardNumberProps): string | null => {
  if (options?.position === "given") {
    return null;
  }
  
  if (!value || value.length === 0) {
    return "Введите номер карты";
  }

  const cleanNumber = value.replace(/[\s-]/g, "");

  if (cleanNumber.length < 16 || cleanNumber.length > 19) {
    return "Номер карты должен содержать от 16 до 19 цифр";
  }

 

  return null;
}; 