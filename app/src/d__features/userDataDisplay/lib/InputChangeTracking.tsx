import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useTrackUserAction } from "./useTrackUserAction";
import { useAppSelector } from "@/shared/model/store";
import { useDebounce } from "@/shared/lib";

export const InputChangeTracking = () => {
  const pathname = usePathname();
  const sessionId = useAppSelector((state) => state.user.sessionId);

  const { debounce } = useDebounce();

  const { trackInputChange, trackUserAction } = useTrackUserAction();

  const handleInputChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;
    const label = input.dataset.trackingLabel;
    const type = input.type;
    if (label) {
      if (type === "file") {
        trackUserAction(label);
      } else {
        trackInputChange(label, value);
      }
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    setTimeout(() => {
      const allInputs = document.querySelectorAll(
        'input[type="text"], input[type="number"], input[type="tel"], input[type="email"], input[type="file"], textarea'
      );

      allInputs.forEach((input) =>
        input?.addEventListener("input", (e) => debounce(() => handleInputChange(e)))
      );

    }, 500);
  }, [pathname, sessionId]);
  return <></>;
};
