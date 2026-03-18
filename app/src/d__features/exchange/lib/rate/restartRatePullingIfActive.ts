import {  RootState } from "@/shared/model/store";
import { RATE_INTERVAL_KEY } from "@/shared/config";
import { AppDispatch } from "@/shared/model/store";
import { setIsRateBeingPulled } from "@/d__features/exchange/model/store";
import { clearMyInterval } from "../../model/interval";

export const restartRatePullingIfActive = (
  isRateBeingPulled: boolean,
  dispatch: AppDispatch,
) => {
  if (isRateBeingPulled) {
    setTimeout(() => {
      dispatch(setIsRateBeingPulled(true));
    }, 100); // Small delay to ensure state is updated
  }
};

