"use client";
import { exchangeApiLoadingReducer } from "@/d__features/exchange/model";
import { mockApiLoadingReducer } from "@/d__features/mockApi/model";
import { supportApiLoadingReducer } from "@/d__features/support/model/store";
import { transferAbroadApiLoadingReducer } from "@/d__features/transferAbroad/model";
import { userApiLoadingReducer } from "@/d__features/userDataDisplay/model";
import { RootState } from "@/shared/model/store";
import { Reducer } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const hasLoadingActions = (state: any) => {

  return Object.values(state).some(
    (isLoading: any) => !!isLoading
  );
}
 
export const selectIsLoading = (state: RootState) =>
  hasLoadingActions(state.exchangeApiLoading) ||
  hasLoadingActions(state.mockApiLoading) ||
  hasLoadingActions(state.supportApiLoading) ||
  hasLoadingActions(state.transferAbroadApiLoading) ||
  hasLoadingActions(state.userApiLoading);

export const useGlobalLoading = () => {
  const isLoading = useSelector(selectIsLoading);

  return {
    isLoading,
  };
};
