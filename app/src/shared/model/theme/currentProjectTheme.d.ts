
import {CurrentProjectThemeVariable} from './currentProjectThemeVariable'
import {BaseThemeColorVariable} from './baseThemeColorVariable'

export type CurrentProjectTheme = {
  [key in CurrentProjectThemeVariable]: string;
} & {
  [key in BaseThemeColorVariable]?: string;
};
