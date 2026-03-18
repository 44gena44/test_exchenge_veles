import { selectExchangeInputsState } from "@/d__features/exchange/model";
import { setRateData } from "@/d__features/exchange/lib/rate/setRateData";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { startTransition, useEffect } from "react";

export const useSetSelectedNetworkEffect = () => {
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
    if (selectedNetwork.value) {
      if (
        !selectedCurrencySell?.id ||
        !selectedCurrencyBuy?.id ||
        !selectedCurrencySellType ||
        !selectedCurrencyBuyType ||
        !selectedNetwork.value ||
        !initialData
      )
        return;

      startTransition(() => {
        setRateData({
          dispatch,
          isRateBeingPulled,
          initialData,
          selectedBankId: selectedBank.value?.id,
          selectedCityId: selectedCity.value?.id,
          selectedCurrencyBuyId: selectedCurrencyBuy.id,
          selectedCurrencyBuyType: selectedCurrencyBuyType,
          selectedCurrencySellId: selectedCurrencySell.id,
          selectedCurrencySellType: selectedCurrencySellType,
          selectedNetworkValueId: selectedNetwork?.value?.id,
        });
      });
    }
  }, [selectedNetwork]);
};
