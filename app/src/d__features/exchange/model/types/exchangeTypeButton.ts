import { ExchangeCurrencyType, ExchangeCurrencyPosition } from "@/shared/model/exchange";
import React, { ReactNode } from "react";
import {SvgIcon} from "@/shared/model/icon";

export type ExchangeTypeButton = {
  icon: React.ReactElement<SvgIcon> ;
  name: string;
  type: ExchangeCurrencyType;
  position?: ExchangeCurrencyPosition;
};