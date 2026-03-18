import { SupportApiLoadingReducerState } from "@/shared/model/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: SupportApiLoadingReducerState = {
  isCallOperatorActionLoading: false,
};

export const supportLoadingSlice = createSlice({
  name: "supportLoading",
  initialState,
  reducers: {
    setCallOperatorLoading: (state, action: PayloadAction<boolean>) => {
      state.isCallOperatorActionLoading = action.payload;
    },
  },
});

export const { setCallOperatorLoading } = supportLoadingSlice.actions;

export const supportApiLoadingReducer = supportLoadingSlice.reducer;