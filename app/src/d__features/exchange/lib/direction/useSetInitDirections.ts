import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import {
  setSelectedCurrencySellType,
  setSelectedCurrencyBuyType,
} from "../../model";

export const useSetInitDirections = () => {
  const dispatch = useAppDispatch();
  const isAppReady = useAppSelector((state) => state.ui.isAppReady);
  const selectedCurrencySellType = useAppSelector(
    (state) => state.exchange.selectedCurrencySellType
  );
  const selectedCurrencyBuyType = useAppSelector(
    (state) => state.exchange.selectedCurrencyBuyType
  );
  useEffect(() => {
    if (isAppReady) {
      if (!selectedCurrencySellType)
        dispatch(setSelectedCurrencySellType("COIN"));
      if (!selectedCurrencyBuyType)
        dispatch(setSelectedCurrencyBuyType("BANK"));
    }
  }, [isAppReady]);
};
