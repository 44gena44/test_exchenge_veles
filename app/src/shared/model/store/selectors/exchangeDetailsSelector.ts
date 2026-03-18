import { calculateRate, valueMask, roundTo8 } from "@/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { ExchangesCreateApiArg } from "../../api/exchange/types";
import { selectBankValue, selectNetValue } from "./exchangeSelector";
import { RootState } from "../state";
import { ExchangeDetails } from "../../exchange/exchangeDetails";

export const selectExchangeDetails = createSelector(
  (state: RootState) => state.exchange.selectedCurrencySellType,
  (state: RootState) => state.exchange.selectedCurrencyBuyType,
  (state: RootState) => state.exchange.exchangeRate,
  (state: RootState) => state.exchange.selectedCurrencySell,
  (state: RootState) => state.exchange.selectedCurrencyBuy,
  (state: RootState) => state.exchange.currencySellAmount,
  (state: RootState) => state.exchange.currencyBuyAmount,
  (state: RootState) => state.exchange.walletAddress,
  selectBankValue,
  (state: RootState) => state.exchange.cardNumber,
  (state: RootState) => state.exchange.phoneNumber,
  (state: RootState) => state.exchange.isPhoneNumberUsed,
  (state: RootState) => state.exchange.selectedCity,
  selectNetValue,
  (
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    exchangeRate,
    selectedCurrencySell,
    selectedCurrencyBuy,
    currencySellAmount,
    currencyBuyAmount,
    walletAddress,
    selectedBank,
    cardNumber,
    phoneNumber,
    isPhoneNumberUsed,
    selectedCity,
    selectedNetwork
  ): ExchangeDetails[] => {
    // "Я отдаю"
    let give: ExchangeDetails | null = null;
    if (selectedCurrencySellType === "COIN") {
      give = {
        title: "Я отдаю",
        rate: calculateRate({
          course: exchangeRate?.course || 0,
          currencyGive: selectedCurrencySell?.name || "",
          currencyGet: selectedCurrencyBuy?.name || "",
        }),
        currency: {
          icon: selectedCurrencySell?.icon || "",
          name: selectedCurrencySell?.name || "",
          type: "COIN",
          typeLabel: selectedNetwork?.name || "",
          value: currencySellAmount.value
            ? valueMask(roundTo8(currencySellAmount.value))
            : "",
          position: "given",
        },
      };
    } else if (selectedCurrencySellType === "BANK") {
      const wayDetails = isPhoneNumberUsed
        ? phoneNumber?.value
          ? {  value: phoneNumber.value }
          : undefined
        : cardNumber?.value
        ? {  value: cardNumber.value }
        : undefined;

      give = {
        title: "Я отдаю",
        rate: calculateRate({
          course: exchangeRate?.course || 0,
          currencyGive: selectedCurrencySell?.name || "",
          currencyGet: selectedCurrencyBuy?.name || "",
        }),
        currency: {
          icon: selectedCurrencySell?.icon || "",
          name: selectedCurrencySell?.name || "",
          type: "BANK",
          typeLabel: selectedBank?.name || "",
          value: currencySellAmount.value
            ? valueMask(roundTo8(currencySellAmount.value))
            : "",
          position: "given",
          wayDetails: wayDetails,
        },
      };
    } else if (selectedCurrencySellType === "CASH") {
      give = {
        title: "Я отдаю",
        rate: calculateRate({
          course: exchangeRate?.course || 0,
          currencyGive: selectedCurrencySell?.name || "",
          currencyGet: selectedCurrencyBuy?.name || "",
        }),
        currency: {
          icon: selectedCurrencySell?.icon || "",
          name: selectedCurrencySell?.name || "",
          type: "CASH",
          typeLabel: selectedCity.value?.name || '',
          value: currencySellAmount.value
            ? valueMask(roundTo8(currencySellAmount.value))
            : "",
          position: "given",
        },
      };
    }

    // "Я получаю"
    let receive: ExchangeDetails | null = null;
    if (selectedCurrencyBuyType === "COIN") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: selectedCurrencyBuy?.icon || "",
          name: selectedCurrencyBuy?.name || "",
          type: "COIN",
          typeLabel: selectedNetwork?.name || "",
          value: currencyBuyAmount.value
            ? valueMask(roundTo8(currencyBuyAmount.value))
            : "",
          position: "received",
          wayDetails: walletAddress.value
            ? {  value: walletAddress.value }
            : undefined,
        },
      };
    } else if (selectedCurrencyBuyType === "BANK") {
      const wayDetails = isPhoneNumberUsed
        ? phoneNumber?.value
          ? {  value: phoneNumber.value }
          : undefined
        : cardNumber?.value
        ? {  value: cardNumber.value }
        : undefined;

      receive = {
        title: "Я получаю",
        currency: {
          icon: selectedCurrencyBuy?.icon || "",
          name: selectedCurrencyBuy?.name || "",
          type: "BANK",
          typeLabel: selectedBank?.name || "",
          value: currencyBuyAmount.value
            ? valueMask(roundTo8(currencyBuyAmount.value))
            : "",
          position: "received",
          wayDetails: wayDetails,
        },
      };
    } else if (selectedCurrencyBuyType === "CASH") {
      receive = {
        title: "Я получаю",
        currency: {
          icon: selectedCurrencyBuy?.icon || "",
          name: selectedCurrencyBuy?.name || "",
          type: "CASH",
          typeLabel: "Наличные",
          value: currencyBuyAmount.value
            ? valueMask(roundTo8(currencyBuyAmount.value))
            : "",
          position: "received",
          wayDetails: selectedCity?.value?.name
            ? { title: "Город получения", value: selectedCity.value.name }
            : undefined,
        },
      };
    }

    return [give, receive].filter(Boolean) as ExchangeDetails[];
  }
);

export const selectExchangeCreateData = createSelector(
  (state: RootState) => state.exchange.selectedCurrencySellType,
  (state: RootState) => state.exchange.selectedCurrencyBuyType,
  (state: RootState) => state.exchange.currencySellAmount,
  (state: RootState) => state.exchange.currencyBuyAmount,
  (state: RootState) => state.exchange.walletAddress,
  (state: RootState) => state.exchange.cardNumber,
  (state: RootState) => state.exchange.phoneNumber,
  (state: RootState) => state.exchange.isPhoneNumberUsed,
  (state: RootState) => state.user.id,
  (state: RootState) => state.exchange.exchangeRate?.id,
  (state: RootState) => state.exchange.exchangeRate?.course_title,
  (state: RootState) => state.exchange.promocode,
  (state: RootState) => state.exchange.isPromocodeValid,

  (
    selectedCurrencySellType,
    selectedCurrencyBuyType,
    currencySellAmount,
    currencyBuyAmount,
    walletAddress,
    cardNumber,
    phoneNumber,
    isPhoneNumberUsed,
    userId,
    exchangeRateId,
    course_title,
    promocode,
    isPromocodeValid
  ): ExchangesCreateApiArg => {
    let baseData: ExchangesCreateApiArg = {
      user_id: userId || -1,
      direction_id: exchangeRateId || -1,
      currency_give_amount: currencySellAmount.value || -1,
      currency_get_amount: currencyBuyAmount.value || -1,
      course_title: course_title || "",
    };

    if (isPromocodeValid) {
      baseData = { ...baseData, promo_code: promocode };
    }

    // Determine what to send based on direction type
    if (
      selectedCurrencyBuyType === "COIN"
    ) {
      // bank → coin: send wallet address for receiving crypto
      return {
        ...baseData,
        wallet: walletAddress.value || "",
      };
    } else if (
      selectedCurrencySellType === "COIN" &&
      selectedCurrencyBuyType === "BANK"
    ) {
      // coin → bank: send card/phone for receiving fiat
      if (isPhoneNumberUsed) {
        return {
          ...baseData,
          phone: phoneNumber?.value || "",
        };
      } else {
        return {
          ...baseData,
          card: cardNumber?.value || "",
        };
      }
    }

    // Fallback (shouldn't happen in normal flow)
    return baseData;
  }
);
