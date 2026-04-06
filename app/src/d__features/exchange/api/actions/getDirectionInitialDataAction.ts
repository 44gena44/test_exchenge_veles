'use server'

import { PROJECT_SERVER_DATA } from "@/shared/config/server";
import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { GetDirectionInitialDataByDirectionTypeApiArg, GetDirectionInitialDataByDirectionTypeApiResponse } from "@/shared/model/api";
import { getDemoDirectionInitialData } from "./demoExchangeData";

export async function getDirectionInitialDataAction(
  directionType: GetDirectionInitialDataByDirectionTypeApiArg["directionType"]
): Promise<GetDirectionInitialDataByDirectionTypeApiResponse> {
  if (!PROJECT_SERVER_DATA.apiUrl) {
    return getDemoDirectionInitialData(directionType);
  }

  const props: FetchApiProps = {
    path: `/direction-initial-data/${directionType}`,
    method: "GET",
  };
  return await fetchApi<GetDirectionInitialDataByDirectionTypeApiResponse>(props);
}
