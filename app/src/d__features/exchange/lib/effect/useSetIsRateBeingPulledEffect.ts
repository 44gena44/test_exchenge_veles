import { RATE_INTERVAL_KEY } from "@/shared/config";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect, useState } from "react";
import {
  selectExchangeInputsState,
  setCurrencyBuyAmountValue,
  setCurrencySellAmountValue,
  setExchangeRate,
  setGetRateLoading,
} from "../../model";
import { useServerAction } from "@/shared/lib";
import { DirectionType } from "@/shared/model/api";
import { getRateAction } from "../../api";
import { calculateInputAmountBasedOnAnotherOne } from "../inputField";
import { clearMyInterval, setMyInterval } from "../../model/interval";

export const useSetIsRateBeingPulledEffect = () => {
  const {
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    selectedCurrencyBuy,
    selectedCurrencySell,
    currencySellAmount,
    selectedNetwork,
    selectedBank,
    selectedCity,
    currencyBuyAmount,
    rate,
    activeInputType,
    isRateBeingPulled,
  } = useAppSelector(selectExchangeInputsState);

  const dispatch = useAppDispatch();

  const [getRate, rateData] = useServerAction({
    action: getRateAction,
    loadingAction: setGetRateLoading,
  });

  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
     if (
      !selectedCurrencySell?.id ||
      !selectedCurrencyBuy?.id ||
      !selectedCurrencySellType ||
      !selectedCurrencyBuyType
    ) {
      return;
    }
    getRate({
      direction_type:
        `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
      currency_give_id: selectedCurrencySell?.id,
      currency_get_id: selectedCurrencyBuy?.id,
      network_id: selectedNetwork?.value?.id,
      bank_id: selectedBank?.value?.id,
      city_id: selectedCity.value?.id,
    });
  }, [refetchTrigger]);


  useEffect(() => {

    if (!isRateBeingPulled) {
      clearMyInterval(RATE_INTERVAL_KEY);
      return;
    }

    setMyInterval(
      () => {
        setRefetchTrigger((prev) => prev + 1);
      },
      30000,
      RATE_INTERVAL_KEY
    );

    return () => {
      clearMyInterval(RATE_INTERVAL_KEY);
    };
  }, [isRateBeingPulled, rate]);

  useEffect(() => {
    if (rateData?.rate?.currency_give_min_value) {
      dispatch(setExchangeRate(rateData?.rate));
    }
  }, [rateData]);
};
