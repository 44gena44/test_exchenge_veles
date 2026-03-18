import { getRateAction } from "@/d__features/exchange/api";
import {
  selectExchangeInputsState,
  setBanks,
  setCities,
  setCountries,
  setExchangeRate,
  setGetRateLoading,
  setNetworks,
  setSelectedBankValue,
  setSelectedCityValue,
  setSelectedNetworkValue,
} from "@/d__features/exchange/model";
import { useServerAction } from "@/shared/lib";
import { restartRatePullingIfActive } from "@/d__features/exchange/lib/rate/restartRatePullingIfActive";
import { DirectionType } from "@/shared/model/api";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import { calculateSecondaryProperties } from "../store/calculateSecondaryProperties";

export const useSetSelectedCurrencyBuyEffect = () => {
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
    if (selectedCurrencyBuy) {
      const selectedCurrencyBuyCity =
        selectedCurrencyBuy?.cities && selectedCurrencyBuy?.cities[0];
      const selectedCurrencyBuyBank =
        selectedCurrencyBuy?.banks && selectedCurrencyBuy?.banks[0];

         const selectedCurrencyBuyNetwork =
      selectedCurrencyBuy?.networks && selectedCurrencyBuy?.networks[0];

      let selectedNetworkValueId = selectedNetwork.value?.id;

      if (selectedCurrencyBuyType === "COIN") {
        selectedNetworkValueId = selectedCurrencyBuyNetwork?.id

        dispatch(
          setSelectedNetworkValue(selectedCurrencyBuyNetwork || null)
        );
        dispatch(setNetworks(selectedCurrencyBuy?.networks || null));

        if (!selectedNetworkValueId) {
          selectedNetworkValueId = selectedCurrencyBuy?.id;
        }
      }

      if (selectedCurrencyBuyType === "CASH") {
        dispatch(setSelectedCityValue(null));
      }

      if (selectedCurrencyBuyType === "BANK") {
        const bank =
          selectedCurrencyBuy?.banks && selectedCurrencyBuy?.banks[0];
        if (selectedCurrencyBuy?.banks && bank) {
          dispatch(setSelectedBankValue(bank));
          dispatch(setBanks(selectedCurrencyBuy?.banks));
        }
      }

      if (
        !selectedCurrencySell?.id ||
        !selectedCurrencyBuy?.id ||
        !selectedCurrencySellType ||
        !selectedCurrencyBuyType
      )
        return;

      getRate({
        direction_type:
          `${selectedCurrencySellType} - ${selectedCurrencyBuyType}` as DirectionType,
        currency_give_id: selectedCurrencySell?.id,
        currency_get_id: selectedCurrencyBuy?.id,
        network_id: selectedNetworkValueId,
        bank_id: selectedCurrencyBuyBank?.id || selectedBank?.value?.id,
        city_id: selectedCurrencyBuyCity?.id || selectedCity?.value?.id,
      });
    }
  }, [selectedCurrencyBuy]);

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
