import { SectionHeading } from "../sectionHeading";
import { ExchangeCurrencyDetails } from "./exchangeCurrencyDetails";


export type ExchangeDetails = {
  currency: ExchangeCurrencyDetails;
} & SectionHeading;


