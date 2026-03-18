import {
  useAppSelector,
  useAppDispatch,
} from "@/shared/model/store";
import { useEffect } from "react";
import { setCountryInputError } from "../model";

export const useCountryInputError = (isSelectedManualInput: boolean) => {
  const countryName = useAppSelector(
    (state) => state.transferAbroad.countryName
  );

  const countryInputError = useAppSelector(
    (state) => state.transferAbroad.countryInputError
  );

  const dispatch = useAppDispatch();

  const areErrorsVisible = useAppSelector(
    (state) => state.transferAbroad.areTransferAbroadErrorsVisible
  );

  useEffect(() => {
    let error = null;

    if (countryName.trim().length === 0) {
      if (isSelectedManualInput) 
        error = "Введите название страны";
      else
        error = "Выберите страну";
    }

    if (isSelectedManualInput && countryName.trim().length < 3 && countryName.trim().length > 0) {
      error = "Минимум 3 символа";
    }

    dispatch(setCountryInputError(error));
  }, [countryName, isSelectedManualInput]);

  return { countryInputError: areErrorsVisible ? countryInputError : null };
};
