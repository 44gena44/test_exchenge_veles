import { ExchangeCurrencyPosition, ExchangeCurrencyType } from "@/shared/model/exchange";
import { HeadingRate } from "@/shared/ui";


type calculatePlaceholderProps = {
  position: ExchangeCurrencyPosition;
  minValue: number;
  rate: number | undefined;
  currencyType: ExchangeCurrencyType
};
export const calculatePlaceholder = ({
  position,
  minValue,
  rate,
  currencyType
}: calculatePlaceholderProps) => {
  if (position === "given") {
    return minValue;
  } else {
    if (rate === null || rate === undefined) return minValue;
    const result = (minValue * rate)
    return currencyType !== 'COIN' ? Number(result.toFixed(2)) : Number(result.toFixed(8));
  }
};
