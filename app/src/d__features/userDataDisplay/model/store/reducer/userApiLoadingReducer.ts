import { UserApiLoadingReducerState } from "@/shared/model/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: UserApiLoadingReducerState = {
  isGetUserDataActionLoading: false,
  isUpdateUserDataActionLoading: false,
  isCheckMailRequirementActionLoading: false,
  isCheckConsentRequirementActionLoading: false,
};

export const userApiLoadingSlice = createSlice({
  name: "userLoading",
  initialState,
  reducers: {
    setGetUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isGetUserDataActionLoading = action.payload;
    },
    setUpdateUserDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isUpdateUserDataActionLoading = action.payload;
    },
    setCheckMailLoading: (state, action: PayloadAction<boolean>) => {
      state.isCheckMailRequirementActionLoading = action.payload;
    },
    setCheckConsentLoading: (state, action: PayloadAction<boolean>) => {
      state.isCheckConsentRequirementActionLoading = action.payload;
    },
    resetUserLoading: () => initialState,
  },
});

export const {
  setGetUserDataLoading,
  setUpdateUserDataLoading,
  setCheckMailLoading,
  setCheckConsentLoading,
  resetUserLoading,
} = userApiLoadingSlice.actions;

export const userApiLoadingReducer = userApiLoadingSlice.reducer;