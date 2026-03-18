import { ValidationOptions } from "./types";

export type ValidateWalletAddressProps = {
  value: string | null;
  options?: ValidationOptions;
};

export const validateWalletAddress = ({ value, options }: ValidateWalletAddressProps): string | null => {
  
  if (options?.position === "given") {
    return null;
  }
  
  if (!value || value.trim().length < 3) {
    return "Введите адрес кошелька";
  }

  // Basic Ethereum address validation
 

  return null;
}; 
