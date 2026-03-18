import { ExchangeRequest } from "../../api";

export type RequestDetails = ExchangeRequest;

export type RequestDetailsReducerState = {
  data: RequestDetails | null;
};