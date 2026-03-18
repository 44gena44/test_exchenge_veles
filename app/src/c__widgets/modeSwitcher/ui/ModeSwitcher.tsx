import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";
import {
  toggleMode,
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/store";
import { Toggle } from "@/shared/ui";
import { memo, useCallback, useEffect, useState } from "react";

export const ModeSwitcher = () => {
  const isExchangeMode = useAppSelector(
    (state) => state.featuresFlags.isExchangeMode
  );
  const isTransferAbroadMode = useAppSelector(
    (state) => state.featuresFlags.isTransferAbroadMode
  );

  const dispatch = useAppDispatch();

  const { trackUserAction } = useTrackUserAction();

  const handleToggle = useCallback(() => {
    dispatch(toggleMode());
  }, [isExchangeMode]);

  const [trackText, setTrackText] = useState<string>();

  useEffect(() => {
    if (!isExchangeMode) {
      return () => {
        setTrackText("Включен режим 'Обмен криптовалют'");
      };
    }
  }, [isExchangeMode]);

  useEffect(() => {
    if (!isTransferAbroadMode) {
      return () => {
        setTrackText("Включен режим 'Платежи за рубеж'");
      };
    }
  }, [isTransferAbroadMode]);

  useEffect(() => {
    if (trackText) {
      trackUserAction(trackText);
    }
  }, [trackText]);

  return (
    <Toggle
      firstButtonText="Обмен криптовалют"
      secondButtonText="Платежи за рубеж"
      isFirstSelected={isExchangeMode && !isTransferAbroadMode}
      setIsFirstSelected={handleToggle}
    ></Toggle>
  );
};

ModeSwitcher.displayName = "ModeSwitcher";
