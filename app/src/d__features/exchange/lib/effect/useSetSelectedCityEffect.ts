import { getRateAction } from "@/d__features/exchange/api";
import {
  selectExchangeInputsState,
  setCities,
  setCountries,
  setExchangeRate,
  setGetRateLoading,
} from "@/d__features/exchange/model";
import { RATE_INTERVAL_KEY } from "@/shared/config";
import { useServerAction } from "@/shared/lib";
import { restartRatePullingIfActive } from "@/d__features/exchange/lib/rate/restartRatePullingIfActive";
import { DirectionType } from "@/shared/model/api";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import { calculateSecondaryProperties } from "../store/calculateSecondaryProperties";

export const useSetSelectedCityEffect = () => {
  const dispatch = useAppDispatch();
  const {
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    selectedBank,
    selectedCity,
    selectedCurrencyBuy,
    selectedCurrencySell,
    selectedNetwork,
    isRateBeingPulled,
  } = useAppSelector(selectExchangeInputsState);

  const [getRate, rateData] = useServerAction({
    action: getRateAction,
    loadingAction: setGetRateLoading,
  });

  useEffect(() => {
    if (selectedCity.value) {
      if (
        !selectedCurrencySell?.id ||
        !selectedCurrencyBuy?.id ||
        !selectedCurrencySellType ||
        !selectedCurrencyBuyType ||
        !selectedCity.value
      )
        return;

      getRate({
        direction_type:
          `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
        currency_give_id: selectedCurrencySell?.id,
        currency_get_id: selectedCurrencyBuy?.id,
        network_id: selectedNetwork?.value?.id,
        bank_id: selectedBank?.value?.id,
        city_id: selectedCity.value?.id,
      });
    }
  }, [selectedCity]);

  useEffect(() => {
    if (rateData) {
      dispatch(setExchangeRate(rateData?.rate || null));
      const cities = calculateSecondaryProperties({
        rate: rateData?.rate,
        propertyKey: "cities",
      });
      dispatch(setCities(cities));
      const countries = calculateSecondaryProperties({
        rate: rateData?.rate,
        propertyKey: "countries",
      });
      dispatch(setCountries(countries));
      restartRatePullingIfActive(isRateBeingPulled, dispatch);
    }
  }, [rateData]);
};
