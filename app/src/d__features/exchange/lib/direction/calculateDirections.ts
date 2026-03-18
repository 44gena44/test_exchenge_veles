import { DirectionType } from "@/shared/model/api/exchange/types";
import { ExchangeCurrencyType } from "@/shared/model/exchange";

export const calculateDirections = (giveType: ExchangeCurrencyType, getType: ExchangeCurrencyType) : DirectionType => {
    if (giveType === "COIN" && getType === "BANK") {
        return 'COIN - BANK';
    } else if (giveType === "COIN" && getType === "CASH") {
        return 'COIN - CASH';
    } else if (giveType === "BANK" && getType === "COIN") {
        return 'BANK - COIN';
    }  else if (giveType === "CASH" && getType === "COIN") {
        return 'CASH - COIN';
    }
    return 'COIN - BANK';
}

