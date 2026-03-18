"use client";

import { useAppDispatch, useAppSelector } from "@/shared/model/store/hooks";
import {
  setIsLoading,
  setPageName,
} from "@/shared/model/store/reducers/uiReducer";
import { useRouter, useSearchParams } from "next/navigation";
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useCallSupport } from "@/d__features/support/lib";
import ExchangeLayout from "@/c__widgets/processLayout/ui";
import RateNoteModal from "@/c__widgets/rateNoteModal/ui";
import ExchangeTypeBlock from "./exchangeTypeSelect/ExchangeTypeBlock";
import { EXCHANGE_TYPES_BUTTONS } from "@/d__features/exchange/config";
import {
  useSetInitDirections,
  useSetSelectedCurrencyTypesEffect,
  useSetSelectedCurrencySellTypeEffect,
} from "@/d__features/exchange/lib";
import { setSelectedCurrencySellType } from "@/d__features/exchange/model";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import { useDebounce } from "@/shared/lib";
import { ExchangeCurrencyType } from "@/shared/model/exchange";

export default memo(function Page() {
  const sessionId = useAppSelector((state) => state.user.sessionId);
  const selectedCurrencyBuyType = useAppSelector(
    (state) => state.exchange.selectedCurrencyBuyType
  );
  const selectedCurrencySellType = useAppSelector(
    (state) => state.exchange.selectedCurrencySellType
  );


  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const onSubmit = useCallback(() => {
    router.push("/exchange/input");
  }, [router]);

  const { callSupport } = useCallSupport();
  const { trackUserAction } = useTrackUserAction();

  useEffect(() => {
    dispatch(setPageName("выбор типа обмена"));
    dispatch(setIsLoading(false));
  }, [dispatch]);

  useSetInitDirections();

  const directionParam = searchParams.get("direction");

  const directionConfig = useMemo(() => {
    if (!directionParam) return null;

    const directionMap: Record<string, { 
      sell: ExchangeCurrencyType; 
      buy: ExchangeCurrencyType;
      hiddenFiat?: ExchangeCurrencyType;
    }> = {
      // COIN to others
      COIN_BANK: { sell: "COIN", buy: "BANK", hiddenFiat: "CASH" },
      COIN_CASH: { sell: "COIN", buy: "CASH", hiddenFiat: "BANK" },
      USDT_BANK: { sell: "COIN", buy: "BANK", hiddenFiat: "CASH" },
      USDT_CASH: { sell: "COIN", buy: "CASH", hiddenFiat: "BANK" },
      // BANK to others
      BANK_COIN: { sell: "BANK", buy: "COIN", hiddenFiat: "CASH" },
      BANK_CASH: { sell: "BANK", buy: "CASH", hiddenFiat: "COIN" },
      // CASH to others
      CASH_COIN: { sell: "CASH", buy: "COIN", hiddenFiat: "BANK" },
      CASH_BANK: { sell: "CASH", buy: "BANK", hiddenFiat: "COIN" },
    };

    return directionMap[directionParam] || null;
  }, [directionParam]);

  const hiddenFiatType = directionConfig?.hiddenFiat;

  const filteredGiveButtons = useMemo(() => {
    if (!hiddenFiatType) return EXCHANGE_TYPES_BUTTONS;
    return EXCHANGE_TYPES_BUTTONS.filter((btn) => btn.type !== hiddenFiatType);
  }, [hiddenFiatType]);

  const preselectedBuyType = directionConfig?.buy;
  const { receiveTypesVariants } = useSetSelectedCurrencySellTypeEffect(hiddenFiatType, preselectedBuyType);
  useSetSelectedCurrencyTypesEffect();

  const {debounce} = useDebounce()

  useEffect(() => {
    if (sessionId && selectedCurrencyBuyType && selectedCurrencySellType) {
      const direction = `${selectedCurrencySellType} - ${selectedCurrencyBuyType}`;
      debounce(() => trackUserAction(`Выбрано направление ${direction}`))
    }
  }, [sessionId, selectedCurrencyBuyType, selectedCurrencySellType]);

  useEffect(() => {
    if (!directionConfig) return;

    dispatch(setSelectedCurrencySellType(directionConfig.sell));
  }, [dispatch, directionConfig]);

  

  return (
    <ExchangeLayout onMainButtonClick={onSubmit} buttonText="Подтвердить выбор">
      <div className="flex flex-col gap-12 justify-between mb-50">
        <ExchangeTypeBlock
          position="given"
          title="Отдаёте"
          buttons={filteredGiveButtons}
        ></ExchangeTypeBlock>
        <ExchangeTypeBlock
          position="received"
          title="Получаете"
          buttons={receiveTypesVariants}
        ></ExchangeTypeBlock>
        <div className="w-full h-70 flex flex-col items-center justify-center">

          <button
            data-tracking-label="Связаться с поддержкой"
            onClick={callSupport}
            className="text-13 font-medium text-[var(--text-main)] underline underline-offset-2"
          >
              меня интересует другой тип обмена
          </button>
        </div>
      </div>
      <RateNoteModal />
    </ExchangeLayout>
  );
});
