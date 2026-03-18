import { useAppSelector } from "@/shared/model/store";
import { useMemo } from "react";

export const useIsCardsFormValid = () => {
  const currencyAmountError = useAppSelector(
    (state) => state.transferAbroad.currencyAmountInputError
  );
  const bankInputError = useAppSelector(
    (state) => state.transferAbroad.bankInputError
  );
  const cardInputNumber = useAppSelector(
    (state) => state.transferAbroad.cardNumberInputError
  );
  const isFormValid = useMemo(
    () => !currencyAmountError && !bankInputError && !cardInputNumber,
    [currencyAmountError, bankInputError, cardInputNumber]
  );
  return {
    isFormValid,
  };
};
