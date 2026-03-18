import { AppDispatch, ExchangeReducerState, RootState } from "@/shared/model/store";
import {
  setSelectedBankError,
  setCardNumberError,
  setPhoneNumberError,
  setSelectedCityError,
  setCurrencySellAmountError,
  setCurrencyBuyAmountError,
  setWalletAddressError,
  setAreErrors,
  setSelectedCountryError,
} from "@/d__features/exchange/model/store";
import { validateExchangeInput } from "./validateExchangeInput";

export const validateAllFields = (exchangeReducerState: ExchangeReducerState, dispatch: AppDispatch) => {
  const { selectedCurrencySellType, selectedCurrencyBuyType, banks, cities, countries } =
    exchangeReducerState;
  let hasErrors = false;

  // Validate crypto fields
  if (
    selectedCurrencySellType === "COIN" ||
    selectedCurrencyBuyType === "COIN"
  ) {
    const {
      currencySellAmount,
      currencyBuyAmount,
      walletAddress,
      exchangeRate,
    } = exchangeReducerState;
    const position = selectedCurrencySellType === "COIN" ? "given" : "received";

    const amountError = validateExchangeInput({
      value:
        position === "given"
          ? currencySellAmount.value
          : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: exchangeRate?.currency_give_min_value || 0,
    });

    const walletAddressError = validateExchangeInput({
      value: walletAddress.value,
      inputType: "walletAddress",
      position,
      minValue: 0,
    });

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setWalletAddressError(walletAddressError));

    hasErrors = !!(amountError || walletAddressError);
  }

  // Validate card fields
  if (
    selectedCurrencySellType === "BANK" ||
    selectedCurrencyBuyType === "BANK"
  ) {
    const {
      currencySellAmount,
      currencyBuyAmount,
      selectedBank,
      cardNumber,
      phoneNumber,
      isPhoneNumberUsed,
      exchangeRate,
    } = exchangeReducerState;
    const position = selectedCurrencySellType === "BANK" ? "given" : "received";

    const amountError = validateExchangeInput({
      value:
        position === "given"
          ? currencySellAmount.value
          : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: exchangeRate?.currency_give_min_value || 0,
    });

    const bankError =
      banks && banks.length > 0
        ? validateExchangeInput({
            value: selectedBank.value,
            inputType: "bank",
            position,
            minValue: 0,
          })
        : null;

    // Validate either phone number or card number based on isPhoneNumberUsed
    let cardNumberError = null;
    let phoneNumberError = null;

    if (isPhoneNumberUsed) {
      phoneNumberError = validateExchangeInput({
        value: phoneNumber?.value || null,
        inputType: "phoneNumber",
        position,
        minValue: 0,
      });
    } else {
      cardNumberError = validateExchangeInput({
        value: cardNumber.value,
        inputType: "cardNumber",
        position,
        minValue: 0,
      });
    }

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setSelectedBankError(bankError));
    dispatch(setCardNumberError(cardNumberError));
    dispatch(setPhoneNumberError(phoneNumberError));

    hasErrors =
      hasErrors ||
      !!(amountError || bankError || cardNumberError || phoneNumberError);
  }

  // Validate cash fields
  if (
    selectedCurrencySellType === "CASH" ||
    selectedCurrencyBuyType === "CASH"
  ) {
    const {
      currencySellAmount,
      currencyBuyAmount,
      selectedCity,
      selectedCountry,
      exchangeRate,
    } = exchangeReducerState;
    const position = selectedCurrencySellType === "CASH" ? "given" : "received";

    const amountError = validateExchangeInput({
      value:
        position === "given"
          ? currencySellAmount.value
          : currencyBuyAmount.value,
      inputType: "amount",
      position,
      minValue: exchangeRate?.currency_give_min_value || 0,
    });

    const cityError =
      cities && cities.length > 0
        ? validateExchangeInput({
            value: selectedCity.value,
            inputType: "city",
            position,
            minValue: 0,
          })
        : null;

        const countryError =
        countries && countries.length > 0
          ? validateExchangeInput({
              value: selectedCountry?.value,
              inputType: "country",
              position,
              minValue: 0,
            })
          : null;

    if (position === "given") {
      dispatch(setCurrencySellAmountError(amountError));
    } else {
      dispatch(setCurrencyBuyAmountError(amountError));
    }
    dispatch(setSelectedCityError(cityError));
    dispatch(setSelectedCountryError(countryError));


    hasErrors = hasErrors || !!(amountError || cityError || countryError);
  }

  dispatch(setAreErrors(hasErrors));
  return hasErrors;
};
