import { useServerAction } from "@/shared/lib";
import { useAppSelector } from "@/shared/model/store";
import { useEffect } from "react";
import { writeSessionDetailsAction } from "../api";

export const useTrackUserAction = () => {
  const trackingSessionId = useAppSelector((state) => state.user.sessionId);
  const [writeSessionDetails, response] = useServerAction({
    action: writeSessionDetailsAction,
  });

  const trackUserAction = (actionDescription: string) => {
    console.log(actionDescription, trackingSessionId);
    if (trackingSessionId)
      writeSessionDetails({
        session_id: trackingSessionId,
        action: actionDescription,
      });
  };

  const trackPushButton = (buttonName: string) =>
    trackUserAction(`Нажата кнопка '${buttonName}'`);

  const trackPageOpen = (pageName: string) =>
    trackUserAction(`Открыта страница '${pageName}'`);

  const trackInputChange = (label: string, value: string | number) =>
    trackUserAction(`Изменено значение поля '${label}' на '${value}'`);

    const trackCheckboxChange = (label: string, value: boolean) => 
    trackUserAction(value ? `Отмечен чекбокс '${label}'` : `Убрана отметка с чекбокса '${label}'`);

  return { trackUserAction, trackPushButton, trackPageOpen, trackInputChange, trackCheckboxChange };
};
