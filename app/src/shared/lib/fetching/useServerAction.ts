import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { startTransition, useState } from "react";
import { useAppDispatch } from "@/shared/model/store";

export const useServerAction = <
  TAction extends (payload: any) => Promise<any>
>(params: {
  action: TAction;
  loadingAction?: ActionCreatorWithPayload<boolean, string>;
}) => {
  const [data, setData] = useState<Awaited<ReturnType<TAction>> | null>(null);
  const [error, setError] = useState<Awaited<ReturnType<any>> | null>(null);

  const dispatch = useAppDispatch();

  const callback = (payload: Parameters<TAction>[0]) => {
    startTransition(async () => {
      if (params.loadingAction) dispatch(params.loadingAction(true));
      try {
        const result = await params.action(payload);
        setData(result);
      } catch (e) {
        setError(e);
        console.error("Server Action failed:", e);
      } finally {
        if (params.loadingAction) dispatch(params.loadingAction(false));
      }
    });
  };

  return [callback, data, error] as const;
};
