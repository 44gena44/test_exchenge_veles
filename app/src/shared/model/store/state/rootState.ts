import { ExchangeApiLoadingReducerState } from "./exchangeApiLoadingReducerState";
import { ExchangeReducerState } from "./exchangeReducerState";
import { FeaturesFlagsReducerState } from "./featuresFlagsReducerState";
import { PageDataReducerState } from "./pageDataReducerState";
import { RequestDetailsReducerState } from "./requestDetailsReducerState";
import { SupportApiLoadingReducerState } from "./supportApiLoadingReducerState";
import { TransferAbroadApiLoadingReducerState } from "./transferAbroadApiLoadingReducerState";
import { TransferAbroadReducerState } from "./transferAbroadReducerState";
import { UiReducerState } from "./uiReducerState";
import { UserApiLoadingReducerState } from "./userApiLoadingReducerState";
import { UserReducerState } from "./userReducerState";
import { MockApiLoadingReducerState } from "./mockApiLoadingReducerState";

export type RootState = {
  ui: UiReducerState;
  user: UserReducerState;
  requestDetails: RequestDetailsReducerState;
  exchange: ExchangeReducerState;
  pageData: PageDataReducerState;
  featuresFlags: FeaturesFlagsReducerState;
  transferAbroad: TransferAbroadReducerState;
  userApiLoading: UserApiLoadingReducerState;
  supportApiLoading: SupportApiLoadingReducerState;
  exchangeApiLoading: ExchangeApiLoadingReducerState
  transferAbroadApiLoading: TransferAbroadApiLoadingReducerState
  mockApiLoading: MockApiLoadingReducerState
};
