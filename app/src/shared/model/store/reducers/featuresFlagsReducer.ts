import { createSlice } from "@reduxjs/toolkit";
import { FeaturesFlagsReducerState } from "../state";



const initialState: FeaturesFlagsReducerState = {
  isExchangeMode: true,
  isTransferAbroadMode: false,
};

export const featuresFlagsSlice = createSlice({
  name: "featuresFlags",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.isExchangeMode = !state.isExchangeMode;
      state.isTransferAbroadMode = !state.isTransferAbroadMode;
    },
  },
});

export const {toggleMode} = featuresFlagsSlice.actions;
export const featuresFlagsReducer = featuresFlagsSlice.reducer;
