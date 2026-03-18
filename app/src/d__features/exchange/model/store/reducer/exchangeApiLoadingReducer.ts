// store/slices/exchangeLoadingSlice.ts
import { ExchangeApiLoadingReducerState } from "@/shared/model/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ExchangeApiLoadingReducerState = {
  isCheckPromocodeActionLoading: false,
  isCreateExchangeActionLoading: false,
  isGetCurrenciesActionLoading: false,
  isGetDirectionInitialDataActionLoading: false,
  isGetFaqsActionLoading: false,
  isGetRateActionLoading: false,
};

export const exchangeLoadingSlice = createSlice({
  name: "exchangeApiLoading",
  initialState,
  reducers: {
    setCheckPromocodeLoading: (state, action: PayloadAction<boolean>) => {
      state.isCheckPromocodeActionLoading = action.payload;
    },
    setCreateExchangeLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateExchangeActionLoading = action.payload;
    },
    setGetCurrenciesLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetCurrenciesActionLoading = action.payload;
    },
    setGetDirectionInitialDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetDirectionInitialDataActionLoading = action.payload;
    },
    setGetFaqsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetFaqsActionLoading = action.payload;
    },
    setGetRateLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetRateActionLoading = action.payload;
    },
  },
});

export const {
  setCheckPromocodeLoading,
  setCreateExchangeLoading,
  setGetCurrenciesLoading,
  setGetDirectionInitialDataLoading,
  setGetFaqsLoading,
  setGetRateLoading,
} = exchangeLoadingSlice.actions;

export const exchangeApiLoadingReducer =  exchangeLoadingSlice.reducer;