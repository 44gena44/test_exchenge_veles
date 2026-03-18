import { CurrentProjectTheme } from "@/shared/model/theme";

export const switchTheme = (theme: CurrentProjectTheme) => {
  Object.entries(theme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};
