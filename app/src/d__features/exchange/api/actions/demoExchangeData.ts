import {
  Bank,
  City,
  Country,
  Currency,
  DirectionType,
  GetCurrenciesGetApiResponse,
  GetDirectionInitialDataByDirectionTypeApiResponse,
  Network,
  RateListApiArg,
  RateListApiResponse,
} from "@/shared/model/api";

type CurrencyType = "COIN" | "BANK" | "CASH";

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const TRC20: Network = { id: 5001, name: "TRC20" };
const ERC20: Network = { id: 5002, name: "ERC20" };
const BTC_NETWORK: Network = { id: 5003, name: "Bitcoin" };

const BANK_SBP: Bank = { id: 7001, name: "СБП" };
const BANK_SBER: Bank = { id: 7002, name: "Сбербанк" };
const BANK_TBANK: Bank = { id: 7003, name: "Т-Банк" };
const BANK_VTB: Bank = { id: 7004, name: "ВТБ" };

const COUNTRY_RU: Country = { id: 9001, name: "Россия" };
const COUNTRY_TR: Country = { id: 9002, name: "Турция" };

const CITY_MOSCOW: City = { id: 9101, name: "Москва", country: "Россия" };
const CITY_SPB: City = { id: 9102, name: "Санкт-Петербург", country: "Россия" };
const CITY_ISTANBUL: City = { id: 9103, name: "Стамбул", country: "Турция" };

const COIN_CURRENCIES: Currency[] = [
  {
    id: 101,
    icon: "/images/icons/usdt.svg",
    name: "USDT",
    networks: [TRC20, ERC20],
  },
  {
    id: 102,
    icon: "/images/icons/crypt.svg",
    name: "BTC",
    networks: [BTC_NETWORK],
  },
];

const CASH_CURRENCIES: Currency[] = [
  {
    id: 201,
    icon: "/images/icons/rub.svg",
    name: "RUB",
    countries: [COUNTRY_RU],
    cities: [CITY_MOSCOW, CITY_SPB],
  },
  {
    id: 202,
    icon: "/images/icons/cash.svg",
    name: "USD",
    countries: [COUNTRY_TR],
    cities: [CITY_ISTANBUL],
  },
];

const BANK_CURRENCIES: Currency[] = [
  {
    id: 301,
    icon: "/images/icons/card.svg",
    name: "RUB",
    banks: [BANK_SBP, BANK_SBER, BANK_TBANK, BANK_VTB],
  },
  {
    id: 302,
    icon: "/images/icons/card.svg",
    name: "USD",
    banks: [BANK_SBP, BANK_SBER],
  },
];

// "Справедливая" демо-оценка в RUB за 1 единицу валюты.
const RUB_EQUIVALENT_BY_CURRENCY_ID: Record<number, number> = {
  101: 81.6, // USDT
  102: 6_900_000, // BTC
  201: 1, // cash RUB
  202: 92, // cash USD
  301: 1, // bank RUB
  302: 92, // bank USD
};

const getCurrenciesByType = (type: CurrencyType): Currency[] => {
  if (type === "COIN") return clone(COIN_CURRENCIES);
  if (type === "BANK") return clone(BANK_CURRENCIES);
  return clone(CASH_CURRENCIES);
};

const parseDirection = (direction: string | undefined | null): { give: CurrencyType; receive: CurrencyType } => {
  const [leftRaw, rightRaw] = (direction || "COIN - CASH")
    .split("-")
    .map((part) => part.trim().toUpperCase());

  const normalize = (value: string): CurrencyType => {
    if (value === "COIN") return "COIN";
    if (value === "BANK") return "BANK";
    if (value === "CASH") return "CASH";
    return "COIN";
  };

  return {
    give: normalize(leftRaw || "COIN"),
    receive: normalize(rightRaw || "CASH"),
  };
};

const findCurrencyById = (id: number | undefined | null): Currency | null => {
  if (!id) return null;
  const all = [...COIN_CURRENCIES, ...BANK_CURRENCIES, ...CASH_CURRENCIES];
  return clone(all.find((currency) => currency.id === id) || null);
};

const calculateCourse = (currencyGiveId: number, currencyGetId: number): number => {
  const giveRub = RUB_EQUIVALENT_BY_CURRENCY_ID[currencyGiveId] || 1;
  const getRub = RUB_EQUIVALENT_BY_CURRENCY_ID[currencyGetId] || 1;
  const raw = giveRub / getRub;

  if (!Number.isFinite(raw) || raw <= 0) {
    return 1;
  }

  return raw < 1 ? Number(raw.toFixed(8)) : Number(raw.toFixed(2));
};

const makeRate = ({
  directionType,
  currencyGive,
  currencyGet,
}: {
  directionType: string;
  currencyGive: Currency;
  currencyGet: Currency;
}) => {
  const course = calculateCourse(currencyGive.id, currencyGet.id);
  const bank = currencyGet.banks?.[0] || currencyGive.banks?.[0] || BANK_SBP;
  const network = currencyGive.networks?.[0] || currencyGet.networks?.[0] || TRC20;
  const city = currencyGet.cities?.[0] || currencyGive.cities?.[0] || CITY_MOSCOW;

  return {
    id: Number(`${currencyGive.id}${currencyGet.id}`.slice(0, 8)),
    course,
    course_view: `1 ${currencyGive.name} = ${course.toLocaleString("ru-RU", {
      minimumFractionDigits: course < 1 ? 6 : 2,
      maximumFractionDigits: course < 1 ? 8 : 2,
    })} ${currencyGet.name}`,
    currency_give_min_value: 1000,
    network,
    city,
    bank,
    direction_type: directionType as DirectionType,
    currency_give: clone(currencyGive),
    currency_get: clone(currencyGet),
    course_title: "Демо-курс",
  };
};

export const getDemoDirectionInitialData = (
  directionType: string
): GetDirectionInitialDataByDirectionTypeApiResponse => {
  const { give, receive } = parseDirection(directionType);
  const currenciesGive = getCurrenciesByType(give);
  const currenciesGet = getCurrenciesByType(receive);

  const currencyGive = currenciesGive[0];
  const currencyGet = currenciesGet[0];

  return {
    rate: makeRate({
      directionType,
      currencyGive,
      currencyGet,
    }),
    currencies_give: currenciesGive,
    currencies_get: currenciesGet,
  };
};

export const getDemoCurrenciesGet = (currencyType: string | null | undefined): GetCurrenciesGetApiResponse => {
  const normalizedType = (currencyType || "COIN").toUpperCase() as CurrencyType;
  return getCurrenciesByType(normalizedType);
};

export const getDemoRate = (params?: RateListApiArg): RateListApiResponse => {
  const { give, receive } = parseDirection(params?.direction_type);
  const currenciesGive = getCurrenciesByType(give);
  const currenciesGet = getCurrenciesByType(receive);

  const currencyGive =
    findCurrencyById(params?.currency_give_id) ||
    currenciesGive.find((currency) => currency.id === params?.currency_give_id) ||
    currenciesGive[0];

  const currencyGet =
    findCurrencyById(params?.currency_get_id) ||
    currenciesGet.find((currency) => currency.id === params?.currency_get_id) ||
    currenciesGet[0];

  return {
    rate: makeRate({
      directionType: params?.direction_type || `${give} - ${receive}`,
      currencyGive,
      currencyGet,
    }),
  };
};
