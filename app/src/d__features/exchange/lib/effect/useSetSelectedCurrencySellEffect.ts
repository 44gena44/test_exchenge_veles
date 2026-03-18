import {
  selectExchangeInputsState,
  setBanks,
  setNetworks,
  setSelectedBankValue,
  setSelectedCityValue,
  setSelectedNetworkValue,
} from "@/d__features/exchange/model";
import { RATE_INTERVAL_KEY } from "@/shared/config";
import { clearMyInterval } from "../../model/interval";
import { setRateData } from "@/d__features/exchange/lib/rate/setRateData";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { startTransition, useEffect } from "react";

export const useSetSelectedCurrencySellEffect = () => {
  const {
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    selectedBank,
    selectedCity,
    selectedCurrencyBuy,
    selectedCurrencySell,
    initialData,
    selectedNetwork,
    isRateBeingPulled,
  } = useAppSelector(selectExchangeInputsState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedCurrencySell) {
      if (
        !selectedCurrencySell?.id ||
        !selectedCurrencyBuy?.id ||
        !selectedCurrencySellType ||
        !selectedCurrencyBuyType ||
        !initialData
      )
        return;

      let selectedNetworkValueId = selectedNetwork.value?.id;
      if (selectedCurrencySellType === "COIN") {

        dispatch(
          setSelectedNetworkValue(selectedCurrencySell?.networks?.[0] || null)
        );

        if (selectedCurrencySell?.networks?.[0]) {
          selectedNetworkValueId = selectedCurrencySell?.networks?.[0].id;
        } else {
          selectedNetworkValueId = selectedCurrencySell.id;
        }

        dispatch(setNetworks(selectedCurrencySell?.networks || null));
      }

      if (selectedCurrencySellType === "CASH") {
        dispatch(setSelectedCityValue(null));
      }
      if (selectedCurrencySellType === "BANK" && selectedCurrencySell?.banks) {
        dispatch(setSelectedBankValue(selectedCurrencySell?.banks[0]));
        dispatch(setBanks(selectedCurrencySell?.banks || null));
      }

      startTransition(() => {
        setRateData({
          dispatch,
          initialData,
          selectedBankId: selectedBank.value?.id,
          selectedCityId: selectedCity.value?.id,
          selectedCurrencyBuyId: selectedCurrencyBuy.id,
          selectedCurrencyBuyType: selectedCurrencyBuyType,
          selectedCurrencySellId: selectedCurrencySell.id,
          selectedCurrencySellType: selectedCurrencySellType,
          selectedNetworkValueId: selectedNetworkValueId,
          isRateBeingPulled,
        });
      });
    }
  }, [selectedCurrencySell]);
};
