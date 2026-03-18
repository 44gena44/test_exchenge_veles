import { ValidateAmountProps, ValidationOptions } from "./types";


export const validateAmount = ({ value, options }: ValidateAmountProps): string | null => {
  if (options?.position === "received") {
    return null;
  }
  if (value === null) {
    return "Введите сумму";
  }

  if (options?.minValue && value < options.minValue) {
    return `Минимальная сумма ${options.minValue}`;
  }

   if (options?.maxValue && value > options.maxValue) {
    return `Максимальная сумма ${options.minValue}`;
  }

  return null;
}; 