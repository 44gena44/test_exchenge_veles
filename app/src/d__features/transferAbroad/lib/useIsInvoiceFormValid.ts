import { useAppSelector } from "@/shared/model/store";
import { useEffect, useMemo } from "react";

export const useIsInvoiceFormValid = () => {
      const currencyAmountError = useAppSelector(
        (state) => state.transferAbroad.currencyAmountInputError
      );
    
      const countryInputError = useAppSelector(
        (state) => state.transferAbroad.countryInputError
      );

       const taskInputError = useAppSelector(
        (state) => state.transferAbroad.taskInputError
      );
    
      const isFormValid = useMemo(
        () => !currencyAmountError && !countryInputError && !taskInputError,
        [currencyAmountError, countryInputError, taskInputError]
      );

    
      return {
        isFormValid,
      };
}