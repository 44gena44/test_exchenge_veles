import { TransferAbroadApiLoadingReducerState } from "@/shared/model/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: TransferAbroadApiLoadingReducerState = {
  isCreateAbroadCardOrderActionLoading: false,
  isCreateChinesePlatformOrderActionLoading: false,
  isCreateFTAOrderActionLoading: false,
  isCreateInvoiceOrderActionLoading: false,
  isGetCurrenciesActionLoading: false,
  isGetTransferDetailsActionLoading: false,
  isGetTransferOptionsActionLoading: false,
};

export const transferAbroadLoadingSlice = createSlice({
  name: "transferAbroadLoading",
  initialState,
  reducers: {
    setCreateAbroadCardOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateAbroadCardOrderActionLoading = action.payload;
    },
    setCreateChinesePlatformOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateChinesePlatformOrderActionLoading = action.payload;
    },
    setCreateFTAOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateFTAOrderActionLoading = action.payload;
    },
    setCreateInvoiceOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isCreateInvoiceOrderActionLoading = action.payload;
    },
    setGetCurrenciesLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetCurrenciesActionLoading = action.payload;
    },
    setGetTransferDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetTransferDetailsActionLoading = action.payload;
    },
    setGetTransferOptionsLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetTransferOptionsActionLoading = action.payload;
    },
  },
});

export const {
  setCreateAbroadCardOrderLoading,
  setCreateChinesePlatformOrderLoading,
  setCreateFTAOrderLoading,
  setCreateInvoiceOrderLoading,
  setGetCurrenciesLoading,
  setGetTransferDetailsLoading,
  setGetTransferOptionsLoading,
} = transferAbroadLoadingSlice.actions;

export const transferAbroadApiLoadingReducer = transferAbroadLoadingSlice.reducer;