import { useAppSelector } from "@/shared/model/store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTrackUserAction } from ".";

export const ButtonPressTracking = () => {
  const pathname = usePathname();
  const sessionId = useAppSelector((state) => state.user.sessionId);

  const { trackPushButton } = useTrackUserAction();

  const handleButtonPress = (element: Element) => {
    const button = element as HTMLButtonElement | HTMLAnchorElement;
    const label = button.dataset.trackingLabel;
    if (label) {
      trackPushButton(label);
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    setTimeout(() => {
      const allButtons = document.querySelectorAll("a, button");

      allButtons.forEach((button) =>
        button?.addEventListener("click", (e) => handleButtonPress(button))
      );

    }, 500);
  }, [pathname, sessionId]);
  return <></>;
};
