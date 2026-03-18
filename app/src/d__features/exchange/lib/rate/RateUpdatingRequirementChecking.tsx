"use client";

import { setIsRateBeingPulled } from "@/d__features/exchange/model/store/reducer";
import { useAppSelector } from "@/shared/model/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const RateUpdatingRequirementChecking = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isRateBeingPulled = useAppSelector(
    (state) => state.exchange.isRateBeingPulled
  );
  useEffect(() => {
    const hasRateToBePulled = pathname.startsWith("/exchange");
    
    if (hasRateToBePulled !== isRateBeingPulled) {
      dispatch(setIsRateBeingPulled(hasRateToBePulled));
    }
  }, [pathname]);

  return <></>;
};
