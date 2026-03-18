import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestDetails, RequestDetailsReducerState } from "../state";

export const requestDetailsSlice = createSlice({
  name: "requestDetails",
  initialState: { data: null } as RequestDetailsReducerState,
  reducers: {
    setRequestDetails: (state, action: PayloadAction<RequestDetails>) => {
      state.data = action.payload;
    },
  },
});

export const { setRequestDetails } = requestDetailsSlice.actions;

export const requestDetailsReducer = requestDetailsSlice.reducer;
