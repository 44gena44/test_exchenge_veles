import { RATE_INTERVAL_KEY } from "@/shared/config";
import { clearMyInterval } from "../../model/interval";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import {
  ExchangeTypeButton,
  setSelectedCurrencyBuyType,
} from "../../model";
import { filterReceiveVariants } from "../store/filterReceiveVariants";
import { useEffect, useState } from "react";
import { ExchangeCurrencyType } from "@/shared/model/exchange";

export const useSetSelectedCurrencySellTypeEffect = (
  hiddenFiatType?: ExchangeCurrencyType,
  preselectedBuyType?: ExchangeCurrencyType
) => {
  const [receiveTypesVariants, setReceiveTypesVariants] = useState<ExchangeTypeButton[]>([]);

  const selectedCurrencySellType = useAppSelector(
    (state) => state.exchange.selectedCurrencySellType
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (selectedCurrencySellType) {
      const receiveVariants = filterReceiveVariants(selectedCurrencySellType, hiddenFiatType);
      setReceiveTypesVariants(receiveVariants)
      if (receiveVariants.length) {
        const buyType = preselectedBuyType && receiveVariants.some(v => v.type === preselectedBuyType)
          ? preselectedBuyType
          : receiveVariants[0].type;
        dispatch(setSelectedCurrencyBuyType(buyType));
      }
    }
  }, [selectedCurrencySellType, hiddenFiatType, preselectedBuyType]);

  return {
    receiveTypesVariants,
  };
};
