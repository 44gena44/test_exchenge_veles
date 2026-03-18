export type FastExchangeTransaction = {
  id: number;
  date: string;
  status: FastExchangeTransactionStatus;
  is_payment_proceed: boolean;
  payment_url: string | null;
  amount: string;
};

export type FastExchangeTransactionStatus = 'В процессе'|
'Ждем ответ банка'| 
'Завершено'| 
'Удержано'| 
'Отменено'| 
'Ошибка ANTIFRAUD'| 
'Ошибка банка'| 
'Запрошен возврат'| 
'Возвращено'| 
'Ошибка инициализации'| 
'Время вышло'

export type FastExchangeHistoryApiResponse = {
  transactions: FastExchangeTransaction[];
};
export type FastExchangeHistoryApiArg = void;

export type FastExchangeWay = {
  id: number;
  name: string;
};

export type FastExchangeRateApiResponse = {
  usdt_rub_rate: number;
  rub_usdt_rate: number;
  network_fee_usdt: number;
  payment_ways: FastExchangeWay[];
  receive_ways: FastExchangeWay[];
};
export type FastExchangeRateApiArg = void;

export type FastExchangeOrderCreateApiArg = {
user_id: number;
  amount_give: number;
  amount_get: number;
  fee: number;
  payment_way_id: number
  wallet: string
  rub_usdt_rate: number 
};
export type FastExchangeOrderCreateApiResponse = {
  id: number;
  payment_url: string,
};

export type RateDisplayItem = {
  id: number;
  weight: number;
  title: string;
  description: string;
  currency_give: string;
  currency_get: string;
};
export type RateDisplayApiResponse = RateDisplayItem[];
export type RateDisplayApiArg = void;

export type NewsItem = {
  title: string;
  description: string;
  label: string;
};
export type NewsListApiResponse = NewsItem[];
export type NewsListApiArg = void;

export type LimitsInfoItem = {
  ignoreParseDesc?: boolean
  limit_icon?: string;
  title?: string;
  info_list: {
    title: string;
    description: string;
    limit_left?: number;
  }[];
};
export type LimitsInfoApiResponse = {
  title: string;
  description: string;
  info_list: LimitsInfoItem[];
};
export type LimitsInfoApiArg = {
  user_id: number;
};

export type ProfileKycApiResponse = {
  kyc_verified: boolean;
  status: string;
};
export type ProfileKycApiArg = void;

export type UserInfoApiResponse = {
  kyc_verified: boolean;
};
export type UserInfoApiArg = void;
