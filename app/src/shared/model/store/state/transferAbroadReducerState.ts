import { CurrencySubOption, TransferAbroadCurrency } from "../../api";

export type TransferAbroadReducerState = {
  transferTypeCategory: "individual" | "legal_entity";
  transferTypeCategorySlug: string | null;
  selectedTranserTypeOptionId: number | null;
  amount: number | null;
  currency: TransferAbroadCurrency | null;
  isNextPageAvailable: boolean;
  taskDescription: string | null;
  abroadCompanyRequisites: string;
  russianCompanyRequisites: string;
  file1: File | null;
  file2: File | null;
  file1PreviewUrl: string | null;
  file2PreviewUrl: string | null;
  countryName: string;
  platform: CurrencySubOption | null;
  bank: CurrencySubOption | null;
  cardNumber: string;
  currencyAmountInputError: string | null;
  taskInputError: string | null;
  countryInputError: string | null;
  bankInputError: string | null;
  cardNumberInputError: string | null;
  maxCurrencyAmount: number | null;
  areTransferAbroadErrorsVisible: boolean;
  orderId: string | null;
};