import { ExchangeCurrencyType } from "@/shared/model/exchange";
import { EXCHANGE_TYPES_BUTTONS } from "../../config";

export const filterReceiveVariants = (
  selectedGiveType: ExchangeCurrencyType,
  hiddenFiatType?: ExchangeCurrencyType
) => {
  let result = EXCHANGE_TYPES_BUTTONS;

  switch (selectedGiveType) {
    case "COIN": {
      result = EXCHANGE_TYPES_BUTTONS.filter(
        (item) => item.type !== selectedGiveType
      );
      break;
    }
    default: {
      result = EXCHANGE_TYPES_BUTTONS.filter((item) => item.type === "COIN");
      break;
    }
  }

  if (hiddenFiatType) {
    result = result.filter((item) => item.type !== hiddenFiatType);
  }

  return result;
};