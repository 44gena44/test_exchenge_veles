import { useRef } from "react";

export const useDebounce = () => {
  const debounceDelay = 800;
  const timeuotId = useRef<NodeJS.Timeout | null>(null);
  const debounce = <TAction extends () => void>(
    cd: TAction
  ) => {
    if (timeuotId.current) clearTimeout(timeuotId.current);
    timeuotId.current = setTimeout(() => {
      cd();
    }, debounceDelay);
  };
  return {
    debounce,
  };
};
