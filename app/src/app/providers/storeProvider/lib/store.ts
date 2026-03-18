import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { saveState, loadState } from "@/shared/lib/store";
import {
  featuresFlagsReducer,
  pageDataReducer,
  requestDetailsReducer,
  uiReducer,
} from "@/shared/model/store";
import {
  exchangeApiLoadingReducer,
  exchangeReducer,
} from "@/d__features/exchange/model";
import {
  transferAbroadApiLoadingReducer,
  transferAbroadReducer,
} from "@/d__features/transferAbroad/model";
import {
  userApiLoadingReducer,
  userReducer,
} from "@/d__features/userDataDisplay/model";
import { supportApiLoadingReducer } from "@/d__features/support/model/store";
import { mockApiLoadingReducer } from "@/d__features/mockApi/model";

const rootReducer = combineReducers({
  ui: uiReducer,
  user: userReducer,
  requestDetails: requestDetailsReducer,
  exchange: exchangeReducer,
  pageData: pageDataReducer,
  featuresFlags: featuresFlagsReducer,
  transferAbroad: transferAbroadReducer,
  userApiLoading: userApiLoadingReducer,
  transferAbroadApiLoading: transferAbroadApiLoadingReducer,
  supportApiLoading: supportApiLoadingReducer,
  exchangeApiLoading: exchangeApiLoadingReducer,
  mockApiLoading: mockApiLoadingReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).prepend(
      // exchangeSliceListener.middleware,
      // validateListener.middleware,
    ),

  devTools: process.env.NODE_ENV !== "production",
});

store.subscribe(() => {
  const state = store.getState();
  saveState({
    exchange: state.exchange,
    requestDetails: state.requestDetails,
    featuresFlags: state.featuresFlags,
    transferAbroad: state.transferAbroad,
    // pageData: state.pageData
    // user: state.user,
  });
});
