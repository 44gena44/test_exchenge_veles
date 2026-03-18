import { ValidationOptions } from "./types";

export type ValidateCountryProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateCountry = ({ value, options }: ValidateCountryProps): string | null => {
  if (!value) {
    return "Выберите страну";
  }


  return null;
}; 