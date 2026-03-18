import { ValidationOptions } from "./types";

export type ValidateBankProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateBank = ({ value, options }: ValidateBankProps): string | null => {
  if (!value) {
    return "Выберите банк";
  }

  return null;
}; 