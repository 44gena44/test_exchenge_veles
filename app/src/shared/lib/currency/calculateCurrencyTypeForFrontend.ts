import { ExchangeCurrencyType } from "@/shared/model/exchange";
import { ServerCurrencyType } from "./calculateCurrencyTypeForFetching";

export const calculateCurrencyTypeForFrontend = (currencyType: ServerCurrencyType): ExchangeCurrencyType => {
    switch (currencyType) {
        case "COIN":
            return "COIN";
        case "CASH":
            return "CASH";
        case "BANK":
            return "BANK";
        default:
            return "COIN";
    }
};  