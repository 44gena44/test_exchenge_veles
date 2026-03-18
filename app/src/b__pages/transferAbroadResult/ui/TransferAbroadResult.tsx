"use client"
import { RequestResult } from "@/entities/requestResult/ui";
import { useAppSelector } from "@/shared/model/store";

export const dynamic = "force-dynamic";

export const TransferAbroadResult = () => {

  const id = useAppSelector((state) => state.transferAbroad.orderId);

  return <RequestResult id={id} />;
};
