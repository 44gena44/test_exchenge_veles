import {
  selectExchangeInputsState,
  setIsPhoneNumberUsed,
} from "@/d__features/exchange/model";
import { setRateData } from "@/d__features/exchange/lib/rate/setRateData";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { startTransition, useEffect } from "react";

export const useSetSelectedBankEffect = () => {
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
    initialData,
  } = useAppSelector(selectExchangeInputsState);

  useEffect(() => {
    if (selectedBank.value) {
      if (selectedBank?.value?.name) {
        const isSpbBank = selectedBank?.value.name.includes("СБП");

        dispatch(setIsPhoneNumberUsed(isSpbBank));
      } else {
        dispatch(setIsPhoneNumberUsed(false));
      }

      if (
        !selectedCurrencySell?.id ||
        !selectedCurrencyBuy?.id ||
        !selectedCurrencySellType ||
        !selectedCurrencyBuyType ||
        !initialData
      )
        return;

      let selectedNetworkId = selectedNetwork.value?.id;

      if (selectedCurrencySellType === "COIN" && !selectedNetwork.value?.id) {
        selectedNetworkId = selectedCurrencySell?.id;
      }

      if (selectedCurrencyBuyType === "COIN" && !selectedNetwork.value?.id) {
        selectedNetworkId = selectedCurrencySell?.id;
      }

      startTransition(() => {
        setRateData({
          initialData,
          dispatch,
          isRateBeingPulled,
          selectedBankId: selectedBank.value?.id,
          selectedCityId: selectedCity.value?.id,
          selectedCurrencyBuyId: selectedCurrencyBuy.id,
          selectedCurrencyBuyType: selectedCurrencyBuyType,
          selectedCurrencySellId: selectedCurrencySell.id,
          selectedCurrencySellType: selectedCurrencySellType,
          selectedNetworkValueId: selectedNetworkId,
        });
      });
    }
  }, [selectedBank]);
};
