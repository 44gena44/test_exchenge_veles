import { ExchangeCurrencyPosition } from "./exchangeCurrencyPosition";
import { ExchangeCurrencyType } from "./exchangeCurrencyType";

export type ExchangeCurrencyDetails = {
  icon: string;
  name: string;
  value: string;
  type: ExchangeCurrencyType;
  typeLabel: string;
  position: ExchangeCurrencyPosition;
  wayDetails?: {
    title?: string;
    value: string;
  };
};