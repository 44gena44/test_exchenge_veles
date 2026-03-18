import { ExchangeReducerState } from "@/shared/model/store";

export const exchangeReducerInitialState: ExchangeReducerState = {
  currenciesSell: [],
  currenciesBuy: [],
  selectedCurrencySell: null,
  selectedCurrencyBuy: null,
  selectedCurrencySellType: null,
  selectedCurrencyBuyType: null,
  cities: null,
  countries: null,
  selectedCity: {
    value: null,
    error: null,
  },
  selectedCountry: {
    value: null,
    error: null,
  },
  networks: null,
  selectedNetwork: {
    value: null,
    error: null,
  },
  banks: null,
  selectedBank: {
    value: null,
    error: null,
  },
  cardNumber: {
    value: null,
    error: null,
  },
  phoneNumber: {
    value: null,
    error: null,
  },
  isPhoneNumberUsed: false,
  walletAddress: {
    value: null,
    error: null,
  },
  areErrorsVisible: false,
  areErrors: false,
  activeInputType: null,
  exchangeRate: null,
  currencySellAmount: {
    value: null,
    error: null,
  },
  currencyBuyAmount: {
    value: null,
    error: null,
  },
  isRateBeingPulled: false,
  promocode: "",
  isPromocodeValid: false,
  availableCurrenciesGetData: null,
  initialData: null,
};