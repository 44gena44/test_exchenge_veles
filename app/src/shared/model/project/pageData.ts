import { SvgIcon } from "@/shared/model/icon";
import { JSX } from "react";

type FirstScreenBackgroundImage = () => JSX.Element;

export type PageData = {
  home: {
    title?: {
      text?: string;
      image?: {
        src: string;
        className: string;
      };
    };
    subtitle?: string;
    descriptionList?: {
      icon: ({ className, color }: SvgIcon) => JSX.Element;
      iconClassName?: string;
      text: string;
      modeTypeWhenVisible: 'exchange' | 'transfer'
    }[];
    firstScreenBackgroundImage: undefined | FirstScreenBackgroundImage;
    policyUrl?: string;
    termsUrl?: string;
  };
  result: {
    video: {
      src: string;
      active: boolean;
    };
  };
};
