import { useServerAction } from "@/shared/lib";
import { useAppSelector } from "@/shared/model/store";
import { useState, useEffect } from "react";
import { getCurrenciesAction } from "../api";
import { setGetCurrenciesLoading } from "../model";
import { TransferAbroadCurrency } from "@/shared/model/api";

export const useTransferCurrenciesOptions = () => {
  const selectedTranserTypeOptionId = useAppSelector(
    (state) => state.transferAbroad.selectedTranserTypeOptionId
  );

  const [currencies, setCurrencies] = useState<TransferAbroadCurrency[]>([]);

  const [getCurrencies, getCurrenciesResponse] = useServerAction({
    action: getCurrenciesAction,
    loadingAction: setGetCurrenciesLoading,
  });

  useEffect(() => {
    if (selectedTranserTypeOptionId) {
      getCurrencies(selectedTranserTypeOptionId);
    }
  }, [selectedTranserTypeOptionId]);

  useEffect(() => {
    if (getCurrenciesResponse?.currencies) {
      setCurrencies(getCurrenciesResponse?.currencies);
    }
  }, [getCurrenciesResponse]);

  return {
    currencies,
  };
};
