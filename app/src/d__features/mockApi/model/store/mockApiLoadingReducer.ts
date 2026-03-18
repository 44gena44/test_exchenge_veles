import { MockApiLoadingReducerState } from "@/shared/model/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MockApiLoadingReducerState = {
  isGetFastExchangeHistoryActionLoading: false,
  isGetFastExchangeRateActionLoading: false,
  isCreateFastExchangeOrderActionLoading: false,
  isGetRateDisplayActionLoading: false,
  isGetNewsActionLoading: false,
  isGetLimitsInfoActionLoading: false,
  isPostProfileKycActionLoading: false,
  isGetUserInfoActionLoading: false,
};

export const mockApiLoadingSlice = createSlice({
  name: "mockApiLoading",
  initialState,
  reducers: {
    setGetFastExchangeHistoryLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isGetFastExchangeHistoryActionLoading = action.payload;
    },
    setGetFastExchangeRateLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isGetFastExchangeRateActionLoading = action.payload;
    },
    setCreateFastExchangeOrderLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isCreateFastExchangeOrderActionLoading = action.payload;
    },
    setGetRateDisplayLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetRateDisplayActionLoading = action.payload;
    },
    setGetNewsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetNewsActionLoading = action.payload;
    },
    setGetLimitsInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetLimitsInfoActionLoading = action.payload;
    },
    setPostProfileKycLoading: (state, action: PayloadAction<boolean>) => {
      state.isPostProfileKycActionLoading = action.payload;
    },
    setGetUserInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetUserInfoActionLoading = action.payload;
    },
  },
});

export const {
  setGetFastExchangeHistoryLoading,
  setGetFastExchangeRateLoading,
  setCreateFastExchangeOrderLoading,
  setGetRateDisplayLoading,
  setGetNewsLoading,
  setGetLimitsInfoLoading,
  setPostProfileKycLoading,
  setGetUserInfoLoading,
} = mockApiLoadingSlice.actions;

export const mockApiLoadingReducer = mockApiLoadingSlice.reducer;
