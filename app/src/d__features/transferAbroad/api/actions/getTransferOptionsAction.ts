'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { TransferOptionsResponse } from "@/shared/model/api";

export async function getTransferOptionsAction(): Promise<TransferOptionsResponse> {
  const props: FetchApiProps = {
    path: "/transfer-abroad/options",
    method: "GET",
  };

  return await fetchApi<TransferOptionsResponse>(props);
}