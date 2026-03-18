import { validateAmount } from "@/shared/lib";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/store";
import { useEffect, useMemo, useState } from "react";
import { setCurrencyAmountInputError } from "../model";

export const useCurrencyAmountError = () => {
  const currencyAmount = useAppSelector((state) => state.transferAbroad.amount);

  const currencyAmountInputError = useAppSelector(
    (state) => state.transferAbroad.currencyAmountInputError
  );

  const areErrorsVisible = useAppSelector(
    (state) => state.transferAbroad.areTransferAbroadErrorsVisible
  );

  const maxCurrencyAmount = useAppSelector(
    (state) => state.transferAbroad.maxCurrencyAmount
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const error = validateAmount({
      value: currencyAmount,
      options: { maxValue: maxCurrencyAmount },
    });
    dispatch(setCurrencyAmountInputError(error));
  }, [currencyAmount, maxCurrencyAmount]);

  return {
    isAmountInputError: !!currencyAmountInputError && areErrorsVisible,
    isLimitError:
      !!currencyAmount &&
      !!maxCurrencyAmount &&
      currencyAmount > maxCurrencyAmount && areErrorsVisible,
  };
};
