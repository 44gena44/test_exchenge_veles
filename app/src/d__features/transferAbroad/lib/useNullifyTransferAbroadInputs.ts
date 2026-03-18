
import { useAppDispatch } from "@/shared/model/store";
import { useEffect } from "react";
import { setTransferAbroadAreErrorsVisible, setMaxCurrencyAmount, setAbroadCompanyRequisites, setRussianCompanyRequisites, setFile1, setFile1PreviewUrl, setFile2, setFile2PreviewUrl, setTaskDescription, setTransferAbroadCurrencyAmount, setCountryName, setBank, setCardNumber, setPlatform } from "../model";

export const useNullifyTransferAbroadInputs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransferAbroadAreErrorsVisible(false));
    dispatch(setMaxCurrencyAmount(null));
    dispatch(setAbroadCompanyRequisites(""));
    dispatch(setRussianCompanyRequisites(""));
    dispatch(setFile1(null));
    dispatch(setFile1PreviewUrl(null));
    dispatch(setFile2(null));
    dispatch(setFile2PreviewUrl(null));
    dispatch(setTaskDescription(null));
    dispatch(setTransferAbroadCurrencyAmount(null));
    dispatch(setCountryName(''))
    dispatch(setBank(null))
    dispatch(setCardNumber(''))
    dispatch(setPlatform(null))
  }, []);
};
