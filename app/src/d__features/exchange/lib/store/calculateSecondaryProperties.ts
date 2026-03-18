import { calculateCurrencyTypeFromDirection } from "@/shared/lib";
import { Rate, GetDirectionInitialDataByDirectionTypeApiResponse, Currency } from "@/shared/model/api";

export const calculateSecondaryProperties = ({
  rate,
  propertyKey,
  initialData,
  selectedCurrencyBuyId,
  selectedCurrencySellId,
}: {
  rate?: Rate;
  propertyKey?: "banks" | "networks" | "cities" | "countries";
  initialData?: GetDirectionInitialDataByDirectionTypeApiResponse;
  selectedCurrencySellId?: number;
  selectedCurrencyBuyId?: number;
}) => {
  if (!rate || !propertyKey) return [];
  const currencySellType = calculateCurrencyTypeFromDirection(
    rate.direction_type,
    "given"
  );

  let currencyGive: Currency | undefined = rate.currency_give;
  let currencyGet: Currency | undefined = rate.currency_get;

  if (selectedCurrencySellId) {
    currencyGive = initialData?.currencies_give?.find(
      (currency) => currency.id === selectedCurrencySellId
    );
  }

  if (selectedCurrencyBuyId) {
    currencyGet = initialData?.currencies_get?.find(
      (currency) => currency.id === selectedCurrencyBuyId
    );
  }

  switch (propertyKey) {
    case "networks": {
      if (currencySellType === "COIN") {
        return currencyGive?.networks || [];
      } else {
        return currencyGet?.networks || [];
      }
    }
    case "banks": {
      if (currencySellType === "BANK") {
        return currencyGive?.banks || [];
      } else {
        return currencyGet?.banks || [];
      }
    }
    case "cities": {
      if (currencySellType === "CASH") {
        return currencyGive?.cities || [];
      } else {
        return currencyGet?.cities || [];
      }
    }

    case "countries": {
      if (currencySellType === "CASH") {
        return currencyGive?.countries || [];
      } else {
        return currencyGet?.countries || [];
      }
    }
  }
};