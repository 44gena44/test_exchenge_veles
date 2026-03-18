import { Validator } from "./types";
import { validateAmount } from "./validateAmount";
import { validateBank } from "./validateBank";
import { validateCardNumber } from "./validateCardNumber";
import { validateCity } from "./validateCity";
import { validateCountry } from "./validateCountry";
import { validateNet } from "./validateNet";
import { validatePhoneNumber } from "./validatePhoneNumber";
import { validateWalletAddress } from "./validateWalletAddress";

export const validators: Validator = {
    amount: validateAmount,
    walletAddress: validateWalletAddress,
    cardNumber: validateCardNumber,
    phoneNumber: validatePhoneNumber,
    bank: validateBank,
    city: validateCity,
    net: validateNet,
    country: validateCountry
  }; 