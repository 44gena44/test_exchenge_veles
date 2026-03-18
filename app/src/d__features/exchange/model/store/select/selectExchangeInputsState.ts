import { createSelector } from '@reduxjs/toolkit';
import { RootState } from "@/shared/model/store";

const selectExchangeSlice = (state: RootState) => state.exchange;

export const selectExchangeInputsState = createSelector(
  selectExchangeSlice,
  (exchange) => ({
    selectedCurrencySellType: exchange.selectedCurrencySellType,
    selectedCurrencyBuyType: exchange.selectedCurrencyBuyType,
    selectedBank: exchange.selectedBank,
    selectedCity: exchange.selectedCity,
    selectedCountry: exchange.selectedCountry,

    selectedCurrencyBuy: exchange.selectedCurrencyBuy,
    selectedCurrencySell: exchange.selectedCurrencySell,
    initialData: exchange.initialData,
    selectedNetwork: exchange.selectedNetwork,
    isRateBeingPulled: exchange.isRateBeingPulled,
    currencySellAmount: exchange.currencySellAmount,
    currencyBuyAmount: exchange.currencyBuyAmount,
    rate: exchange.exchangeRate,
    activeInputType: exchange.activeInputType,
    cardNumber: exchange.cardNumber,
    phone: exchange.phoneNumber,
    walletAddress: exchange.walletAddress,
  })
);