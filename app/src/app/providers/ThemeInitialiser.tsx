import { switchTheme } from "@/d__features/themeSwitcher/lib";
import { PROJECT_DATA } from "@/shared/config";
import { memo, useEffect } from "react";

export const ThemeInitialiser = () => {

  useEffect(() => {
    switchTheme(PROJECT_DATA.theme);
  }, []);
  return <></>;
};
