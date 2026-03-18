import { useAppSelector } from "@/shared/model/store";
import { useMemo } from "react";

export const useIsFtaCurrencyAndTaskFormValid = () => {
  const currencyAmountError = useAppSelector(
    (state) => state.transferAbroad.currencyAmountInputError
  );

  const taskInputError = useAppSelector(
    (state) => state.transferAbroad.taskInputError
  );

  const isFormValid = useMemo(
    () => !currencyAmountError && !taskInputError,
    [currencyAmountError, taskInputError]
  );

  return {
    isFormValid,
  };
};
