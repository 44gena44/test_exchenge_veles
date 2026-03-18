import {
  Network,
  City,
  Bank,
  DirectionType,
  Currency,
  GetCurrenciesGetApiResponse,
  GetDirectionInitialDataByDirectionTypeApiResponse,
} from "@/shared/model/api/exchange/types";
import {
  calculateCurrencyTypeFromDirection,
  Direction,
} from "./calculateCurrencyTypeFromDirection";
import { calculateSecondaryProperties } from "@/d__features/exchange/lib";

type Props = {
  availableCurrenciesGet: GetCurrenciesGetApiResponse;
  initialData: GetDirectionInitialDataByDirectionTypeApiResponse;
  selectedCurrencyBuyId?: number;
  selectedCurrencySellId?: number;
  selectedNetworkId?: number;
  selectedBankId?: number;
};

export const getAvailableCurrenciesBuyDetails = ({
  availableCurrenciesGet,
  initialData,
  selectedCurrencyBuyId,
  selectedCurrencySellId,
  selectedNetworkId,
  selectedBankId,
}: Props) => {
  const currencyBuyType = calculateCurrencyTypeFromDirection(
    initialData?.rate?.direction_type as Direction,
    "received"
  );

  let currenciesBuy: Currency[] = initialData?.currencies_get || [];

  // console.log(availableCurrenciesGet)

  if (currencyBuyType === "CASH") {
    currenciesBuy =
      initialData?.currencies_get?.filter((currency) =>
        availableCurrenciesGet.some((cur) => cur.id === currency.id)
      ) || [];
  } else {
    const propertyName = currencyBuyType === "BANK" ? "banks" : "networks"
    currenciesBuy =
      initialData?.currencies_get?.filter((currency) =>
        availableCurrenciesGet.some((item) =>
          currency[propertyName]?.some(
            (option) => option.id === item.id
          ) || item.id === currency.id
        )
      ).map(cur => ({...cur, [propertyName]:cur[propertyName]?.filter(item => {
        const availableCurrency = availableCurrenciesGet.find(c => c.id === cur.id)
        if (!availableCurrency) return false
        return availableCurrency[propertyName]?.some(i => i.id === item.id)
      })})) || [];
  }

  if (currenciesBuy.length === 0) {
    currenciesBuy = availableCurrenciesGet;
  }

  const isCurrencyBuyValid = currenciesBuy.some(
    (cur) => cur.id === selectedCurrencyBuyId
  );

  const isBankValid = currenciesBuy.some((cur) =>
    cur.banks?.some((b) => b.id === selectedBankId)
  );

  const isNetworkValid = currenciesBuy.some((cur) =>
    cur.networks?.some((n) => n.id === selectedNetworkId)
  );


  const selectedCurrencyBuy: Currency = JSON.parse(
    JSON.stringify(
      isCurrencyBuyValid
        ? currenciesBuy.find((cur) => cur.id === selectedCurrencyBuyId)
        : currenciesBuy[0]
    )
  );

  const calculateSecondaryPropertiesProps = {
    rate: initialData.rate,
    initialData: initialData,
    selectedCurrencyBuyId: isCurrencyBuyValid
      ? selectedCurrencyBuyId
      : currenciesBuy[0].id,
    selectedCurrencySellId,
  };

  let networks = calculateSecondaryProperties({
    ...calculateSecondaryPropertiesProps,
    propertyKey: "networks",
  });

  let banks = calculateSecondaryProperties({
    ...calculateSecondaryPropertiesProps,
    propertyKey: "banks",
  });

  if (currencyBuyType === "BANK" && selectedCurrencyBuy) {
    banks = banks.filter((bank) =>
      availableCurrenciesGet.some((cur) =>
        cur.banks?.some((b) => b.id === bank.id)
      )
    );
    if (banks.length === 0 && selectedCurrencyBuy.banks) {
      banks = selectedCurrencyBuy.banks;
    }
    selectedCurrencyBuy.banks = banks;
  }

  if (currencyBuyType === "COIN" && selectedCurrencyBuy) {
    networks = networks.filter((network) =>
      availableCurrenciesGet.some((cur) =>
        cur.networks?.some((n) => n.id === network.id)
      )
    );
    selectedCurrencyBuy.networks = networks;
  }

  return {
    selectedNetwork: networks[0] || null,
    selectedBank: banks[0] || null,
    networks,
    banks,
    selectedCurrencyBuy,
    currenciesBuy,
    isCurrencyBuyValid,
    isBankValid,
    isNetworkValid,
  };
};
