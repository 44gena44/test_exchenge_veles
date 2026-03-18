import { CurrentProjectTheme } from "@/shared/model/theme";
import { LIGHT_THEME } from "./lightTheme";

export const PROJECT_THEME: CurrentProjectTheme = {
    ...LIGHT_THEME,


    "--main-color": "#640075",
    "--main-color-light": "#F0DFF4",

    "--text-button-main": "#2B0030",
    "--text-button-secondary": "#FFFFFF",
    "--text-button-first-screen-left": "#FFFFFF",
    "--text-button-first-screen-right": "#FFFFFF",
    "--text-main-screen-description": "#7A6E86",
    "--text-main-screen-subtitle": "#2B0030",

    "--background-first-screen-description": "#F6ECF8",
    "--background-request-status": "#fff",
    "--background-button-first-screen-left": "#640075",
    "--background-button-first-screen-right": "#ED800D",
    "--background-button-secondary": "#262626",
    "--background-first-screen":
        "linear-gradient(149.32deg, #F4E9F8 5.59%, #FDE9D5 105.56%)",
    "--background-button-profile": "#640075",

    "--border-button-secondary": "#262626",
    "--border-placeholder": "#E6DCEB",
    "--profile-button-wave": "#640075",

    "--divider-main": "#C0C0C0",
    "--divider-secondary": "#C3C3C3",
    "--divider-thirdary": "#E8E8E8",
    "--progress-bar-active": "#ED800D",
    "--result-screen-clock": "#ED800D",
    "--background-button-gradient": "",
    "--background-secondary": "#F4EDF7"


};
