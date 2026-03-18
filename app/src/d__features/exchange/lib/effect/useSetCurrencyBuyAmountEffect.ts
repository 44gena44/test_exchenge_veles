import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import {
  selectExchangeInputsState,
  setCurrencySellAmountValue,
} from "../../model";
import { calculateInputAmountBasedOnAnotherOne } from "../inputField";

export const useSetCurrencyBuyAmountEffect = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    selectedCurrencyBuy,
    selectedCurrencySell,
    currencyBuyAmount,
    rate,
    activeInputType,
  } = useAppSelector(selectExchangeInputsState);

  useEffect(() => {
    if (
      !selectedCurrencySellType ||
      !selectedCurrencyBuyType ||
      !selectedCurrencySell ||
      !selectedCurrencyBuy ||
      !rate ||
      activeInputType !== "received"
    )
      return;

    const currencySellAmount = calculateInputAmountBasedOnAnotherOne(
      currencyBuyAmount.value,
      rate,
      "received"
    );
    dispatch(setCurrencySellAmountValue(currencySellAmount));
  }, [currencyBuyAmount.value]);
};
