import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { selectExchangeInputsState } from "../../model";
import { useEffect } from "react";
import { validateAllFields } from "@/shared/lib";

export const useExchangeInputsValidation = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCurrencyBuy,
    selectedCurrencySell,
    currencyBuyAmount,
    currencySellAmount,
    walletAddress,
    phone,
    cardNumber,
    selectedBank,
    selectedCity,
    selectedCountry
  } = useAppSelector(selectExchangeInputsState);

  const state = useAppSelector((state) => state.exchange);

  useEffect(() => {
    validateAllFields(state, dispatch);
  }, [
    currencySellAmount.value,
    currencyBuyAmount.value,
    cardNumber.value,
    phone.value,
    selectedBank.value,
    selectedCity.value,
    walletAddress.value,
    selectedCurrencyBuy,
    selectedCurrencySell,
    selectedCountry
  ]);
};
