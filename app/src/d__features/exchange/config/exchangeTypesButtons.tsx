import { CardIcon, CryptoIcon, CashIcon } from "@/shared/ui";
import { ExchangeTypeButton } from "../model";

export const EXCHANGE_TYPES_BUTTONS: ExchangeTypeButton[] = [
    { icon: <CryptoIcon className="w-19 h-19 [&_path]:transition-[fill] [&_path]:duration-500"/>, name: "Криптовалюта", type: "COIN" },
    { icon: <CardIcon className="w-19 h-19 [&_path]:transition-[fill] [&_path]:duration-500"/>, name: "Безналичные", type: "BANK" },
    { icon: <CashIcon className="w-21 h-21 mr-[-2px] [&_path]:transition-[fill] [&_path]:duration-500"/>, name: "Наличные", type: "CASH" },
  ];
  