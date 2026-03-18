export type PostCallingOperatorApiResponse =
  /** status 201 Успешное создание */ {
    status?: string;
    id?: number;
  };
export type PostCallingOperatorApiArg = {
    /** ID пользователя */
    user_id: number;
};
export type Country = SecondaryPropertiesOption;
export type City = SecondaryPropertiesOption & {country?: string};
export type Bank = SecondaryPropertiesOption;
export type Network = SecondaryPropertiesOption;
export type Currency = {
  id: number;
  icon: string;
  name: string;
  cities?: City[];
  countries?: Country[];
  banks?: Bank[];
  networks?: Network[];
};

export type GetCurrenciesGetApiResponse = Currency[];
export type GetCurrenciesGetApiArg = {
  /** Идентификатор отдаваемой валюты */
  giveCurrencyId?: number | null;
  /** Тип валюты ('BANK' — банковская валюта, 'COIN' — криптовалюта, 'CASH' — наличная) */
  currencyType?: string | null;
};

type SecondaryPropertiesOption = {
  name: string;
  /** ID сети */
  id: number;
};

export type GetDirectionInitialDataByDirectionTypeApiResponse =
  /** status 200 Успешный ответ */ {
    rate?: {
      /** ID направления обмена */
      id: number;
      /** Текущий курс обмена */
      course: number;
      /** Формат отображаемого курса */
      course_view: string;
      /** Минимальная сумма для обмена */
      currency_give_min_value: number;
      network: Network;
      city: City;
      bank: Bank;
      /** Тип направления обмена */
      direction_type: DirectionType;
      currency_give: Currency;
      currency_get: Currency;
      course_title: string;
    };
    currencies_give?: Currency[];
    currencies_get?: Currency[];
  };
export type GetDirectionInitialDataByDirectionTypeApiArg = {
  /** Тип направления обмена, состоящий из двух частей ('тип-отдаваемой-валюты - тип-получаемой-валюты') */
  directionType: string;
};
export type PostExchangesOtherApiResponse =
  /** status 201 Успешное создание */ {
    status?: string;
    id?: number;
  };
export type PostExchangesOtherApiArg = {
  body: {
    /** ID пользователя */
    user_id: number;
  };
};
export type ExchangesCreateApiResponse = /** status 201 Успешное создание */ {
  status?: string;
  exchange_id?: number;
};
export type ExchangesCreateApiArg = {
  user_id: number;
  direction_id: number;
  currency_give_amount: number;
  currency_get_amount: number;
  card?: string;
  wallet?: string;
  phone?: string;
  course_title: string;
  promo_code?: string;
};

export type Faq = {
  /** Сортировка */
  weight: number;
  /** Вопрос */
  title: string;
  /** Ответ */
  description: string;
};
export type FaqsListApiResponse = /** status 200 Успешный ответ */ {
  /** Сортировка */
  weight: number;
  /** Название раздела */
  title: string;
  /** Список вопросов и ответов */
  faqs: Faq[];
}[];
export type FaqsListApiArg = void;

export type DirectionType =
  | "COIN - BANK"
  | "COIN - CASH"
  | "BANK - COIN"
  | "CASH - COIN";

export type Rate = {
  /** ID направления обмена */
  id: number;
  /** Текущий курс обмена */
  course: number;
  /** Формат отображаемого курса */
  course_view: string;
  /** Минимальная сумма для обмена */
  currency_give_min_value: number;
  network: Network;
  city: City;
  bank: Bank;
  /** Тип направления обмена */
  direction_type: DirectionType;
  currency_give: Currency;
  currency_get: Currency;
  course_title: string;
};
export type GetJivoMessagesApiResponse = unknown;
export type GetJivoMessagesApiArg = void;
export type PostJivoMessagesApiResponse = unknown;
export type PostJivoMessagesApiArg = void;
export type RateListApiResponse = /** status 200 Успешный ответ */ {
  rate?: Rate;
};
export type RateListApiArg = {
  direction_type: DirectionType;
  currency_give_id: number;
  currency_get_id: number;
  network_id?: number;
  bank_id?: number;
  city_id?: number;
};

export type RequestCurrency = {
  amount?: number;
  name?: string;
  icon?: string;
  network?: string;
  bank?: string;
};

export type CheckPromocodeApiArg = {
  code: string;
};

export type CheckPromocodeApiResponse = {
  detail: string;
  error?: any
};


