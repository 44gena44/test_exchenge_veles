import { ExchangeCurrencyType } from "@/shared/model/exchange";
import { Direction } from "../currency/calculateCurrencyTypeFromDirection";

type WayDetails = {
  title?: string;
  value: string;
}

type WayDetailsInput = {
  direction: Direction;
  position: "given" | "received";
  type: ExchangeCurrencyType;
  address?: string;
  cardNumber?: string;
  phoneNumber?: string;
  isPhoneNumberUsed?: boolean;
  city?: string;
}

export const calculateWayDetails = ({
  direction,
  position,
  type,
  address,
  cardNumber,
  phoneNumber,
  isPhoneNumberUsed,
  city,
}: WayDetailsInput): WayDetails | undefined => {
  // Для позиции "received" (получаю)
  if (position === "received") {
    // Для криптовалюты
    if (type === "COIN" && address) {
      return {
        value: address,
      };
    }

    // Для банковской карты или СБП
    if (type === "BANK") {
      if (isPhoneNumberUsed && phoneNumber) {
        return {
          value: phoneNumber,
        };
      } else if (cardNumber) {
        return {
          value: cardNumber,
        };
      }
    }

    // Для наличных
    if (type === "CASH" && city) {
      return undefined;
    }
  }

  // Для позиции "given" (отдаю)
  if (position === "given") {
    // Для криптовалюты
    if (type === "COIN" && address) {
      return {
        value: address,
      };
    }

    // Для банковской карты или СБП
    if (type === "BANK") {
      if (isPhoneNumberUsed && phoneNumber) {
        return {
          title: "Номер телефона",
          value: phoneNumber,
        };
      } else if (cardNumber) {
        return {
          title: "Карта отправления",
          value: cardNumber,
        };
      }
    }

    // Для наличных
    if (type === "CASH" && city) {
      return undefined;
    }
  }

  return undefined;
}; 