import { ValidationOptions } from "./types";

export type ValidateNetProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateNet = ({ value, options }: ValidateNetProps): string | null => {
  if (!value) {
    return "Выберите сеть";
  }

  return null;
}; 