import { number } from "zod";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransferAbroadReducerState } from "../../../../shared/model/store/state";
import { TransferAbroadCurrency, CurrencySubOption } from "../../../../shared/model/api";



const initialState: TransferAbroadReducerState = {
  transferTypeCategorySlug: null,
  transferTypeCategory: "individual",
  selectedTranserTypeOptionId: null,
  amount: null,
  currency: null,
  isNextPageAvailable: false,
  taskDescription: null,
  abroadCompanyRequisites: "",
  russianCompanyRequisites: "",
  file1: null,
  file2: null,
  file1PreviewUrl: null,
  file2PreviewUrl: null,
  countryName: "",
  platform: null,
  bank: null,
  cardNumber: "",
  currencyAmountInputError: null,
  taskInputError: null,
  countryInputError: null,
  bankInputError: null,
  cardNumberInputError: null,
  maxCurrencyAmount: null,
  areTransferAbroadErrorsVisible: false,
  orderId: null,
};

export const transferAbroadSlice = createSlice({
  name: "transferAbroad",
  initialState,
  reducers: {
    setSelectedTranserTypeOptionId: (state, action: PayloadAction<number>) => {
      state.selectedTranserTypeOptionId = action.payload;
    },
    setTransferTypeCategory: (state, action: PayloadAction<string>) => {
      if (
        action.payload !== "individual" &&
        action.payload !== "legal_entity"
      ) {
        console.error("transfer type is not correct");
        return;
      }
      state.transferTypeCategory = action.payload;
    },
    setTransferTypeCategorySlug: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.transferTypeCategorySlug = action.payload;
    },
    setTransferAbroadCurrencyAmount: (
      state,
      action: PayloadAction<number | null>
    ) => {
      state.amount = action.payload;
    },
    setTransferAbroadCurrency: (
      state,
      action: PayloadAction<TransferAbroadCurrency>
    ) => {
      state.currency = action.payload;
    },
    setIsNextPageAvailable: (state, action: PayloadAction<boolean>) => {
      state.isNextPageAvailable = action.payload;
    },
    setTaskDescription: (state, action: PayloadAction<string | null>) => {
      state.taskDescription = action.payload;
    },
    setAbroadCompanyRequisites: (state, action: PayloadAction<string>) => {
      state.abroadCompanyRequisites = action.payload;
    },
    setRussianCompanyRequisites: (state, action: PayloadAction<string>) => {
      state.russianCompanyRequisites = action.payload;
    },
    setFile1: (state, action: PayloadAction<File | null>) => {
      state.file1 = action.payload;
    },
    setFile2: (state, action: PayloadAction<File | null>) => {
      state.file2 = action.payload;
    },
    setFile1PreviewUrl: (state, action: PayloadAction<string | null>) => {
      state.file1PreviewUrl = action.payload;
    },
    setFile2PreviewUrl: (state, action: PayloadAction<string | null>) => {
      state.file2PreviewUrl = action.payload;
    },
    setCountryName: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload;
    },
    setPlatform: (state, action: PayloadAction<CurrencySubOption | null>) => {
      state.platform = action.payload;
    },
    setBank: (state, action: PayloadAction<CurrencySubOption | null>) => {
      state.bank = action.payload;
    },
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardNumber = action.payload;
    },
    setCardNumberInputError: (state, action: PayloadAction<string | null>) => {
      state.cardNumberInputError = action.payload;
    },
    setCurrencyAmountInputError: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.currencyAmountInputError = action.payload;
    },
    setTaskInputError: (state, action: PayloadAction<string | null>) => {
      state.taskInputError = action.payload;
    },
    setCountryInputError: (state, action: PayloadAction<string | null>) => {
      state.countryInputError = action.payload;
    },
    setBankInputError: (state, action: PayloadAction<string | null>) => {
      state.bankInputError = action.payload;
    },
    setMaxCurrencyAmount: (state, action: PayloadAction<number | null>) => {
      state.maxCurrencyAmount = action.payload;
    },
    setTransferAbroadAreErrorsVisible: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.areTransferAbroadErrorsVisible = action.payload;
    },
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
  },
});

export const {
  setTransferTypeCategorySlug,
  setIsNextPageAvailable,
  setSelectedTranserTypeOptionId,
  setTransferTypeCategory,
  setTransferAbroadCurrencyAmount,
  setTransferAbroadCurrency,
  setTaskDescription,
  setAbroadCompanyRequisites,
  setFile1,
  setFile2,
  setRussianCompanyRequisites,
  setFile1PreviewUrl,
  setFile2PreviewUrl,
  setCountryName,
  setPlatform,
  setBank,
  setCardNumber,
  setCardNumberInputError,
  setCurrencyAmountInputError,
  setTaskInputError,
  setCountryInputError,
  setBankInputError,
  setMaxCurrencyAmount,
  setTransferAbroadAreErrorsVisible,
  setOrderId
} = transferAbroadSlice.actions;
export const transferAbroadReducer = transferAbroadSlice.reducer;
