import { useAppSelector } from "@/shared/model/store/hooks";
import { callOperatorAction } from "../api";
import {useCallback, useEffect, useMemo} from "react";
import { useServerAction } from "@/shared/lib";
import { setCallOperatorLoading } from "../model/store";

export const useCallSupport = () => {


  const [callOperator, response] = useServerAction({
    action: callOperatorAction,
    loadingAction: setCallOperatorLoading,
  });

  const userId = useAppSelector((state) => state.user.id);
    const isAppReady = useAppSelector((state) => state.ui.isAppReady);



  const callSupport =  () => {
    if (!isAppReady) return;
    if (!userId) {
      console.error("User ID is required");
      return;
    }
    callOperator({
      user_id: userId,
    });
  };

  useEffect(() => {
    if (response)
            if (
                window.Telegram &&
                window.Telegram.WebApp &&
                typeof window.Telegram.WebApp.close === "function"
            ) {
                window.Telegram.WebApp.close();
            } else {
                alert("Вы можете закрыть это окно вручную");
            }

  }, [response]);

  return {
    callSupport,
  };
};
