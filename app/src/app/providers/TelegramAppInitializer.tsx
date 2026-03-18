"use client";
import {
  setIsAppReady,
  useAppDispatch,
  useAppSelector,
} from "@/shared/model/store";
import {TEST_USER_ID, TEST_USER_INIT_DATA} from "@/shared/config";
import {
  setGetUserDataLoading,
  setSessionId,
  setUserData,
  setUserId,
  setUserInitData,
} from "@/d__features/userDataDisplay/model";
import { RootState } from "@/shared/model/store/state";
import { getUserDataAction } from "@/d__features/userDataDisplay/api/actions/getUserDataAction";
import { useEffect } from "react";
import { useServerAction } from "@/shared/lib";
import { createTrackingSessionAction } from "@/d__features/userDataDisplay/api/actions/createTrackingSessionAction";

// Локальное объявление process, чтобы TypeScript не выдавал ошибку в клиентском компоненте.
// В среде Next.js значение process.env.NODE_ENV подставляется на этапе сборки.
declare const process: { env: { NODE_ENV?: string } };

export function TelegramAppInitializer() {
  const userId = useAppSelector((state: RootState) => state.user.id);
  const initData = useAppSelector((state: RootState) => state.user.initData);

  const dispatch = useAppDispatch();
  const handleScriptLoad = () => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();

      let userId: number | null = window.Telegram?.WebApp?.initDataUnsafe?.user?.id ||  null;

      let initDataString = window.Telegram?.WebApp?.initData || null;

      if (process.env.NODE_ENV === "development") {
        userId = TEST_USER_ID;
        initDataString = TEST_USER_INIT_DATA
      } else {
          if (!window.Telegram?.WebApp?.initData) {
              console.error("user initData not found");
          }
          if (!window.Telegram?.WebApp?.initDataUnsafe?.user) {
            console.error("user Id not found");
        }
      }

      if (initDataString) {
        dispatch(setUserInitData(initDataString));
      }

      if (userId) {
        dispatch(setUserId(userId));
      }
    }
  };

  const [getUserData, userData] = useServerAction({
    action: getUserDataAction,
    loadingAction: setGetUserDataLoading,
  });

  const [createTrackingSession, createTrackingSessionResponse] =
    useServerAction({
      action: createTrackingSessionAction,
    });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = handleScriptLoad;

    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (userId && initData) {
      getUserData({ userId, initData });
      createTrackingSession({ user_id: userId, initData });
    }
  }, [userId, initData]);

  useEffect(() => {
    if (userData) {
      dispatch(setUserData(userData));
      dispatch(setIsAppReady(true));
    }
  }, [userData]);

  useEffect(() => {
    if (createTrackingSessionResponse?.session_id) {
      dispatch(setSessionId(createTrackingSessionResponse.session_id));
    }
  }, [createTrackingSessionResponse]);

  return null;
}
