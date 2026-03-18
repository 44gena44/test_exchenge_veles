import { useAppSelector } from "@/shared/model/store";

export const useIsChinesePlatformfFormValid = () => {
  const currencyAmountError = useAppSelector(
    (state) => state.transferAbroad.currencyAmountInputError
  );

  return {
    isFormValid: !currencyAmountError,
  };
};
