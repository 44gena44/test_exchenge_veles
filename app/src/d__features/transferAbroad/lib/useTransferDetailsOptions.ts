import { useServerAction } from "@/shared/lib";
import { CurrencySubOption } from "@/shared/model/api";
import { useAppSelector } from "@/shared/model/store";
import { useState, useEffect } from "react";
import { getTransferDetailsAction } from "../api";
import { setGetTransferDetailsLoading } from "../model";

export const useTransferDetailsOptions = () => {
  const [countries, setCountries] = useState<CurrencySubOption[]>([]);
  const [platforms, setPlatforms] = useState<CurrencySubOption[]>([]);
  const [banks, setBanks] = useState<CurrencySubOption[]>([]);

  const transferTypeId = useAppSelector(
    (state) => state.transferAbroad.selectedTranserTypeOptionId
  );
  const currency = useAppSelector((state) => state.transferAbroad.currency);

  const [getTransferDetails, getTransferDetailsResponse] = useServerAction({
    action: getTransferDetailsAction,
    loadingAction: setGetTransferDetailsLoading,
  });

  useEffect(() => {
    if (currency && transferTypeId) {
      getTransferDetails({
        currency_id: currency.id,
        transfer_option_id: transferTypeId,
      })
    }
  }, [currency, transferTypeId]);

  useEffect(() => {
    if (getTransferDetailsResponse) {
      if (getTransferDetailsResponse?.countries) {
        setCountries([{id: 99999, name: "Свой вариант"},...getTransferDetailsResponse?.countries]);
      }
      if (getTransferDetailsResponse?.banks) {
        setBanks(getTransferDetailsResponse?.banks);
      }
      if (getTransferDetailsResponse?.platforms) {
        setPlatforms(getTransferDetailsResponse?.platforms);
      }
    }
  }, [getTransferDetailsResponse]);
  return {
    countries,
    banks,
    platforms,
  };
};
