// types/transferAbroad.ts
export type TransferOption = {
  id: number;
  icon: string;
  name: string;
  weight: number;
  description: string;
};

export type TransferOptionsResponse = {
  individual: TransferOption[];
  legal_entity: TransferOption[];
};

export type TransferAbroadCurrency = {
  id: number;
  name: string;
  icon: string;
  limit?: number | null;
};

export type CurrenciesResponse = {
  currencies: TransferAbroadCurrency[];
};

export type CurrencySubOption = {
  id: number;
  name: string;
};

export type TransferDetailsResponse = {
  banks?: CurrencySubOption[];
  platforms?: CurrencySubOption[];
  countries?: CurrencySubOption[];
};

// POST bodies
export type InvoiceOrderBody = {
  transfer_type: string;
  currency_name: string;
  amount: number;
  country_name: string;
  task_description: string;
  user_id: number;
};

export type FTAOrderBody = {
  currency_name: string;
  amount: number;
  user_id: number;
  task_description: string;
  russian_company_requisites?: string;
  abroad_company_requisites?: string;
  file_1?: File | null;
  file_2?: File | null;
};

export type ChinesePlatformOrderBody = {
  currency_name: string;
  amount: number;
  platform_name: string;
  user_id: number;
};

export type AbroadCardOrderBody = {
  currency_name: string;
  amount: number;
  bank_name: string;
  card_number: string;
  user_id: number;
};

export type OrderResponse = {
  order_id: string;
};
