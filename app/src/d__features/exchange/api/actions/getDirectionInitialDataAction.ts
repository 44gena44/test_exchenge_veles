'use server'

import { FetchApiProps, fetchApi } from "@/shared/lib/serverAction";
import { GetDirectionInitialDataByDirectionTypeApiArg, GetDirectionInitialDataByDirectionTypeApiResponse } from "@/shared/model/api";

export async function getDirectionInitialDataAction(
  directionType: GetDirectionInitialDataByDirectionTypeApiArg["directionType"]
): Promise<GetDirectionInitialDataByDirectionTypeApiResponse> {
  const props: FetchApiProps = {
    path: `/direction-initial-data/${directionType}`,
    method: "GET",
  };
  return await fetchApi<GetDirectionInitialDataByDirectionTypeApiResponse>(props);
}