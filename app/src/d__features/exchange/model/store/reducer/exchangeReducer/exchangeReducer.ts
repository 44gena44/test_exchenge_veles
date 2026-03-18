import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  Bank,
  City,
  Country,
  Currency,
  GetCurrenciesGetApiResponse,
  GetDirectionInitialDataByDirectionTypeApiResponse,
  Network,
  Rate,
} from "@/shared/model/api/exchange/types";
import { getAvailableCurrenciesBuyDetails } from "@/shared/lib/currency";
import { ExchangeCurrencyPosition, ExchangeCurrencyType, ExchangeType } from "@/shared/model/exchange";
import { exchangeReducerInitialState } from "./exchangeReducerInitialState";
import { calculateSecondaryProperties } from "@/d__features/exchange/lib";

export const exchangeSlice = createSlice({
  name: "exchange",
  initialState: exchangeReducerInitialState,
  reducers: {
    setInitialData: (
      state,
      action: PayloadAction<{
        initData: GetDirectionInitialDataByDirectionTypeApiResponse;
        availableCurrenciesGet: GetCurrenciesGetApiResponse;
      }>
    ) => {
      const initData = action.payload.initData;
      const availableCurrenciesGet = action.payload.availableCurrenciesGet;
// console.log(initData)
      state.initialData = initData;
      state.availableCurrenciesGetData = availableCurrenciesGet;
      state.exchangeRate = initData?.rate || null;

      state.currenciesSell = initData?.currencies_give || [];

      const {
        selectedNetwork,
        selectedBank,
        networks,
        banks,
        selectedCurrencyBuy,
        currenciesBuy,
      } = getAvailableCurrenciesBuyDetails({
        initialData: initData,
        availableCurrenciesGet,
      });
      

      state.currenciesBuy = currenciesBuy;

      state.selectedCurrencySell = initData?.rate?.currency_give || null;
      if (selectedCurrencyBuy)
      state.selectedCurrencyBuy = selectedCurrencyBuy;

      const cities = calculateSecondaryProperties({
        rate: initData.rate,
        initialData: initData,
        propertyKey: "cities",
      });

      const countries = calculateSecondaryProperties({
        rate: initData.rate,
        initialData: initData,
        propertyKey: "countries",
      });

      state.networks = networks;
      state.banks = banks;
      state.cities = cities;
      state.countries = countries;


      state.selectedNetwork.value = selectedNetwork;
      state.selectedBank.value = selectedBank;
      state.selectedCity = {
        value: null,
        error: null,
      }
      state.selectedCountry = {
        value: null,
        error: null,
      }

      state.promocode = "";
      state.isPromocodeValid = false;

      // Reset phone number fields
      if (!state.phoneNumber) {
        state.phoneNumber = { value: null, error: null };
      } else {
        state.phoneNumber.value = null;
        state.phoneNumber.error = null;
      }
      if (state.isPhoneNumberUsed === undefined) {
        state.isPhoneNumberUsed = false;
      } else {
        state.isPhoneNumberUsed = false;
      }
    },
    setPromocode: (state, action: PayloadAction<string>) => {
      state.promocode = action.payload;
    },
    setCurrenciesSell: (state, action: PayloadAction<Currency[]>) => {
      state.currenciesSell = action.payload;
    },
    setCurrenciesBuy: (state, action: PayloadAction<Currency[]>) => {
      state.currenciesBuy = action.payload;
    },
    setSelectedCurrencySell: (
      state,
      action: PayloadAction<Currency | null>
    ) => {
      state.selectedCurrencySell = action.payload;
    },
    setSelectedCurrencyBuy: (state, action: PayloadAction<Currency | null>) => {
      state.selectedCurrencyBuy = action.payload;
    },
    setSelectedCurrencyBuyWithoutListening: (
      state,
      action: PayloadAction<Currency | null>
    ) => {
      state.selectedCurrencyBuy = action.payload;
    },
    setSelectedCurrencySellType: (
      state,
      action: PayloadAction<ExchangeCurrencyType | null>
    ) => {
      if (state.selectedCurrencySellType === action.payload) return;
      state.selectedCurrencySellType = action.payload;
    },
    setSelectedCurrencyBuyType: (
      state,
      action: PayloadAction<ExchangeCurrencyType | null>
    ) => {
      if (state.selectedCurrencyBuyType === action.payload) return;
      state.selectedCurrencyBuyType = action.payload;
    },
  
    setCities: (state, action: PayloadAction<City[] | null>) => {
      state.cities = action.payload;
    },
  
    setSelectedCityValue: (state, action: PayloadAction<City | null>) => {
      state.selectedCity.value = action.payload;
    },
    setSelectedCityError: (state, action: PayloadAction<string | null>) => {
      state.selectedCity.error = action.payload;
    },
    setCountries: (state, action: PayloadAction<Country[] | null>) => {
      state.countries = action.payload;
    },
    setSelectedCountryValue: (state, action: PayloadAction<Country | null>) => {
      state.selectedCountry.value = action.payload;
    },
    setSelectedCountryError: (state, action: PayloadAction<string | null>) => {
      state.selectedCountry.error = action.payload;
    },
    setNetworks: (state, action: PayloadAction<Network[] | null>) => {
      state.networks = action.payload;
    },
    setSelectedNetworkValue: (state, action: PayloadAction<Network | null>) => {
      state.selectedNetwork.value = action.payload;
    },
    setSelectedNetworkValueWithoutListening: (
      state,
      action: PayloadAction<Network | null>
    ) => {
      state.selectedNetwork.value = action.payload;
    },
    setSelectedNetworkError: (state, action: PayloadAction<string | null>) => {
      state.selectedNetwork.error = action.payload;
    },
    setBanks: (state, action: PayloadAction<Bank[] | null>) => {
      state.banks = action.payload;
    },
    setSelectedBankValue: (state, action: PayloadAction<Bank | null>) => {
      state.selectedBank.value = action.payload;
    },
    setSelectedBankValueWithoutListening: (
      state,
      action: PayloadAction<Bank | null>
    ) => {
      state.selectedBank.value = action.payload;
    },
    setSelectedBankError: (state, action: PayloadAction<string | null>) => {
      state.selectedBank.error = action.payload;
    },
    setCardNumberValue: (state, action: PayloadAction<string | null>) => {
      state.cardNumber.value = action.payload;
    },
    setCardNumberError: (state, action: PayloadAction<string | null>) => {
      state.cardNumber.error = action.payload;
    },
    setPhoneNumberValue: (state, action: PayloadAction<string | null>) => {
      if (!state.phoneNumber) {
        state.phoneNumber = { value: null, error: null };
      }
      state.phoneNumber.value = action.payload;
    },
    setPhoneNumberError: (state, action: PayloadAction<string | null>) => {
      if (!state.phoneNumber) {
        state.phoneNumber = { value: null, error: null };
      }
      state.phoneNumber.error = action.payload;
    },
    setIsPhoneNumberUsed: (state, action: PayloadAction<boolean>) => {
      if (state.isPhoneNumberUsed === undefined) {
        state.isPhoneNumberUsed = false;
      }
      state.isPhoneNumberUsed = action.payload;
    },
    setWalletAddressValue: (state, action: PayloadAction<string | null>) => {
      state.walletAddress.value = action.payload;
    },
    setWalletAddressError: (state, action: PayloadAction<string | null>) => {
      state.walletAddress.error = action.payload;
    },
    setAreErrorsVisible: (state, action: PayloadAction<boolean>) => {
      state.areErrorsVisible = action.payload;
    },
    setAreErrors: (state, action: PayloadAction<boolean>) => {
      state.areErrors = action.payload;
    },
    setActiveInputType: (
      state,
      action: PayloadAction<ExchangeCurrencyPosition | null>
    ) => {
      state.activeInputType = action.payload;
    },
    setExchangeRate: (state, action: PayloadAction<Rate | null>) => {
      state.exchangeRate = action.payload;
    },
    setCurrencySellAmountValue: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.currencySellAmount.value = action.payload;
    },
    setCurrencySellAmountError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.currencySellAmount.error = action.payload;
    },
    setCurrencyBuyAmountValue: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.currencyBuyAmount.value = action.payload;
    },
    setCurrencyBuyAmountError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.currencyBuyAmount.error = action.payload;
    },
    clearCurrencies: (state) => {
      state.currenciesSell = [];
      state.currenciesBuy = [];
      state.selectedCurrencySell = null;
      state.selectedCurrencyBuy = null;
      state.selectedCurrencySellType = null;
      state.selectedCurrencyBuyType = null;
    },
    clearAll: (state) => {
      return exchangeReducerInitialState;
    },
    setIsRateBeingPulled: (state, action: PayloadAction<boolean>) => {
      state.isRateBeingPulled = action.payload;
    },
    setIsPromocodeValid: (state, action: PayloadAction<boolean>) => {
      state.isPromocodeValid = action.payload;
    },

    setAvailableCurrenciesGetData: (
      state,
      action: PayloadAction<Currency[]>
    ) => {
      state.availableCurrenciesGetData = action.payload;
    },
  },
});

export const {
  setCurrenciesSell,
  setCurrenciesBuy,
  setSelectedCurrencySell,
  setSelectedCurrencyBuy,
  setSelectedCurrencySellType,
  setSelectedCurrencyBuyType,
  setCities,
  setSelectedCityValue,
  setSelectedCityError,
  setCountries,
  setSelectedCountryValue,
  setSelectedCountryError,
  setNetworks,
  setSelectedNetworkValue,
  setSelectedNetworkError,
  setBanks,
  setSelectedBankValue,
  setSelectedBankError,
  setCardNumberValue,
  setCardNumberError,
  setPhoneNumberValue,
  setPhoneNumberError,
  setIsPhoneNumberUsed,
  setWalletAddressValue,
  setWalletAddressError,
  setAreErrorsVisible,
  setAreErrors,
  setActiveInputType,
  setExchangeRate,
  setCurrencySellAmountValue,
  setCurrencySellAmountError,
  setCurrencyBuyAmountValue,
  setCurrencyBuyAmountError,
  clearCurrencies,
  clearAll,
  setInitialData,
  setIsRateBeingPulled,
  setPromocode,
  setIsPromocodeValid,
  setAvailableCurrenciesGetData,
  setSelectedBankValueWithoutListening,
  setSelectedCurrencyBuyWithoutListening,
  setSelectedNetworkValueWithoutListening,
} = exchangeSlice.actions;

export const exchangeReducer = exchangeSlice.reducer;
