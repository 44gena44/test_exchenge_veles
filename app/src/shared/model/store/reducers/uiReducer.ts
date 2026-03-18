// src/lib/features/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectName } from "../../project";
import { PROJECT_NAME } from "@/shared/config";
import { UiReducerState } from "../state";



const initialState: UiReducerState = {
  projectName: PROJECT_NAME,
  pageName: "",
  isLoading: true,
  exchangeId: null,
  isAppReady: false,
  isFirstPageLoading: true,
  hasRateNoteOpenedOnce: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setProjectName(state, action: PayloadAction<ProjectName>) {
      state.projectName = action.payload;
    },
    setPageName(state, action: PayloadAction<string | null>) {
      state.pageName = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setExchangeId(state, action: PayloadAction<number | null | undefined>) {
      if (!action.payload) return;
      state.exchangeId = action.payload;
    },
    setIsAppReady(state, action: PayloadAction<boolean>) {
      state.isAppReady = action.payload;
    },
    setIsFirstPageLoading(state, action: PayloadAction<boolean>) {
      state.isFirstPageLoading = action.payload;
    },
    setHasRateNoteOpenedOnce(state, action: PayloadAction<boolean>) {
      state.hasRateNoteOpenedOnce = action.payload;
    },
  },
});

export const {
  setPageName,
  setIsLoading,
  setExchangeId,
  setIsAppReady,
  setProjectName,
  setIsFirstPageLoading,
  setHasRateNoteOpenedOnce,
} = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
