import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import {
  selectExchangeInputsState,
  setCurrencyBuyAmountValue,
  setCurrencySellAmountValue,
} from "../../model";
import { useEffect } from "react";
import { calculateInputAmountBasedOnAnotherOne } from "../inputField";

export const useSetExchangeRateEffect = () => {
  const dispatch = useAppDispatch();
  const {
    currencyBuyAmount,
    currencySellAmount,
    rate,
    activeInputType,
  } = useAppSelector(selectExchangeInputsState);

  useEffect(() => {
    if (rate) {
      if (activeInputType === "given" && currencySellAmount.value !== null) {
        const newBuyAmount = calculateInputAmountBasedOnAnotherOne(
          currencySellAmount.value,
          rate,
          "given"
        );

        dispatch(setCurrencyBuyAmountValue(newBuyAmount));
      } else if (
        activeInputType === "received" &&
        currencyBuyAmount.value !== null
      ) {
        const newSellAmount = calculateInputAmountBasedOnAnotherOne(
          currencyBuyAmount.value,
          rate,
          "received"
        );

        dispatch(setCurrencySellAmountValue(newSellAmount));
      }
    }
  }, [rate]);
};
