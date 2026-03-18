import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../state";
import { ExchangeCurrencyType } from "../../exchange";


export type ExchangeCurrencyTypes = {
  givenType: ExchangeCurrencyType | null;
  receivedType: ExchangeCurrencyType | null;
};

export const selectCurrencyTypes = createSelector(
  (state: RootState) => state.exchange,
  (exchange): ExchangeCurrencyTypes => ({
    givenType: exchange.selectedCurrencySellType,
    receivedType: exchange.selectedCurrencyBuyType,
  })
); 