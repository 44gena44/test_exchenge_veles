import React, { memo } from "react";
import ExchangeCardInput from "./ExchangeCardInput";
import ExchangeCashInput from "./ExchangeCashInput";
import ExchangeCryptoInput from "./ExchangeCryptoInput";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";


export type ExchangeInputProps = {
  position: ExchangeCurrencyPosition;
  type: "BANK" | "CASH" | "COIN" | null;
};

const ExchangeInput: React.FC<ExchangeInputProps> = memo(({ position, type }) => {
  
  switch (type) {
    case "BANK":
      return <ExchangeCardInput position={position} />;
    case "CASH":
      return <ExchangeCashInput position={position} />;
    case "COIN":
      return <ExchangeCryptoInput position={position} />;
    default:
      return null;
  }
});

ExchangeInput.displayName = "ExchangeInput";

export default ExchangeInput; 