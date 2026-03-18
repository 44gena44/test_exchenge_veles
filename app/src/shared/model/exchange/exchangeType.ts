
import { ReactNode } from "react";
import { ExchangeCurrencyPosition } from "./exchangeCurrencyPosition";
import { ExchangeCurrencyType } from "./exchangeCurrencyType";

export type ExchangeType = {
  icon: ReactNode;
  name: string;
  type: ExchangeCurrencyType;
  position?: ExchangeCurrencyPosition;
};