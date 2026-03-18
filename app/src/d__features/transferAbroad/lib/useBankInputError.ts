import { validateBank } from "@/shared/lib";
import {
  useAppSelector,
  useAppDispatch,
} from "@/shared/model/store";
import { useEffect } from "react";
import { setBankInputError } from "../model";

export const useBankInputError = () => {
  const bank = useAppSelector((state) => state.transferAbroad.bank);

  const bankInputError = useAppSelector(
    (state) => state.transferAbroad.bankInputError
  );

  const dispatch = useAppDispatch();

  const areErrorsVisible = useAppSelector(
    (state) => state.transferAbroad.areTransferAbroadErrorsVisible
  );

  useEffect(() => {
    const error = validateBank({ value: bank?.name || null });

    dispatch(setBankInputError(error));
  }, [bank]);

  return { bankInputError: areErrorsVisible ? bankInputError : null };
};
