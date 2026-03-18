
import {
  Bank,
  City,
  Country,
  Currency,
  GetCurrenciesGetApiResponse,
  GetDirectionInitialDataByDirectionTypeApiResponse,
  Network,
  Rate,
} from "../../api";
import {
  ExchangeCurrencyPosition,
  ExchangeCurrencyType,
  ExchangeInput,
  ExchangeType,
} from "../../exchange";

export type ExchangeReducerState = {
  currenciesSell: Currency[];
  currenciesBuy: Currency[];
  selectedCurrencySell: Currency | null;
  selectedCurrencyBuy: Currency | null;
  selectedCurrencySellType: ExchangeCurrencyType | null;
  selectedCurrencyBuyType: ExchangeCurrencyType | null;
  cities: City[] | null;
  countries: Country[] | null;
  selectedCity: ExchangeInput<City | null>;
  selectedCountry: ExchangeInput<Country | null>;
  networks: Network[] | null;
  selectedNetwork: ExchangeInput<Network | null>;
  banks: Bank[] | null;
  selectedBank: ExchangeInput<Bank | null>;
  cardNumber: ExchangeInput<string | null>;
  phoneNumber: ExchangeInput<string | null>;
  isPhoneNumberUsed: boolean;
  walletAddress: ExchangeInput<string | null>;
  areErrorsVisible: boolean;
  areErrors: boolean;
  activeInputType: ExchangeCurrencyPosition | null;
  exchangeRate: Rate | null;
  currencySellAmount: ExchangeInput<number | null>;
  currencyBuyAmount: ExchangeInput<number | null>;
  isRateBeingPulled: boolean;
  promocode: string;
  isPromocodeValid: boolean;
  availableCurrenciesGetData: GetCurrenciesGetApiResponse | null;
  initialData: GetDirectionInitialDataByDirectionTypeApiResponse | null;
};
