
import {BaseThemeColorVariable} from '@/shared/model/theme'
export type BaseTheme = {
  [key in BaseThemeColorVariable]: string;
};
