import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { ValidateBankProps } from "./validateBank";
import { ValidateCardNumberProps } from "./validateCardNumber";
import { ValidateCityProps } from "./validateCity";
import { ValidateNetProps } from "./validateNet";
import { ValidatePhoneNumberProps } from "./validatePhoneNumber";
import { ValidateWalletAddressProps } from "./validateWalletAddress";
import { ValidateCountryProps } from "./validateCountry";

// Validation Types
export type ValidationOptions = {
  minValue?: number | null;
  maxValue?: number | null;
  required?: boolean | null;
  pattern?: RegExp | null;
  customValidator?: (value: any) => boolean;
  position?: ExchangeCurrencyPosition;
};

export type ValidationContext = {
  type: "BANK" | "CASH" | "COIN";
  position: "given" | "received";
};

// Amount Validation Types
export type AmountValidationOptions = ValidationOptions & {
  minValue: number;
};

// Bank Validation Types
export type BankValidationOptions = ValidationOptions & {
  allowedBanks?: string[];
};

// Card Number Validation Types
export type CardNumberValidationOptions = ValidationOptions & {
  allowedCardTypes?: string[];
};

// City Validation Types
export type CityValidationOptions = ValidationOptions & {
  allowedCities?: string[];
};

// Net Validation Types
export type NetValidationOptions = ValidationOptions & {
  allowedNets?: string[];
};

// Wallet Address Validation Types
export type WalletAddressValidationOptions = ValidationOptions & {
  allowedNetworks?: string[];
};

// Validation Function Types
export type ValidationFunction<T = any> = (
  value: T,
  options?: ValidationOptions,
  context?: ValidationContext
) => string | null ;

// Helper Function Types
export type RoundFunction = (value: number, decimals?: number) => number;

export type TranslateFunction = (
  value: number,
  fromCurrency: string,
  toCurrency: string
) => number;

export type CurrencyTypeFunction = (action: any) => "BANK" | "CASH" | "COIN";

// Validation Result Types
export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

// Input Validation Types
export type InputValidationResult = {
  value: any;
  error?: string;
  isValid: boolean;
}; 

export type ValidatedField = "amount" | "walletAddress" | "cardNumber" | "phoneNumber" | "bank" | "city" | "net" | "country";

export type ValidatorProps = {
  amount: ValidateAmountProps;
  walletAddress: ValidateWalletAddressProps;
  cardNumber: ValidateCardNumberProps;
  phoneNumber: ValidatePhoneNumberProps;
  bank: ValidateBankProps;
  city: ValidateCityProps;
  net: ValidateNetProps;
  country: ValidateCountryProps
};

export type Validator = {
  [K in ValidatedField]: (props: ValidatorProps[K]) => string | null;
};

export type ValidateAmountProps = {
  value: number | null;
  options?: ValidationOptions;
};