import {  usePathname } from "next/navigation";
import { useTrackUserAction } from "./useTrackUserAction";
import { useEffect } from "react";
import { ROUTES_NAMES } from "@/shared/config";
import { RootState, useAppSelector } from "@/shared/model/store";

export const PageOpenTracking = () => {
  const pathname = usePathname();
  const sessionId = useAppSelector(state => state.user.sessionId)
  const request = useAppSelector((state: RootState) => state.requestDetails.data);

  const { trackPageOpen } = useTrackUserAction();

  useEffect(() => {
    let pageName = ROUTES_NAMES[pathname]
    if (!pageName || !sessionId) return
    if (pathname === "/profile/request") {
        pageName +=`: Заявка #${request?.id}`
    }
    trackPageOpen(pageName);
  }, [pathname, sessionId]);
  return <></>;
};
