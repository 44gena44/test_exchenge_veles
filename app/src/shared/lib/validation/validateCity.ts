import { ValidationOptions } from "./types";

export type ValidateCityProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateCity = ({ value, options }: ValidateCityProps): string | null => {
  if (!value) {
    return "Выберите город";
  }


  return null;
}; 