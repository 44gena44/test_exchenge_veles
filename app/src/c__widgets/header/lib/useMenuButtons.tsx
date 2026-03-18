import { useCallSupport } from "@/d__features/support/lib";
import { ProjectData, ProjectName } from "@/shared/model/project";
import {ReactElement, useCallback, useEffect, useMemo, useRef} from "react";
import { CryptoIcon, ReloadIcon, SupportIcon } from "@/shared/ui";
import {  useAppSelector } from "@/shared/model/store";


type MenuButton = {
  icon: ReactElement;
  text: string;
  onClick: () => void;
  className?: string;
};

type Props = {
  closeMenu: () => void;

};

export const useMenuButtons = ({ closeMenu }: Props) => {
  const projectName = useAppSelector((state) => state.ui.projectName);
    const userId = useAppSelector((state) => state.user.id);
    const isAppReady = useAppSelector((state) => state.ui.isAppReady);


  const reloadButtonHandler = () => {
    try {
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const { callSupport } = useCallSupport();

  const menuButtons = useMemo<MenuButton[]>(
    () => [
      {
        icon: <SupportIcon color="var(--text-main)" />,
        text: "Задать вопрос",
        onClick: callSupport,
      },
      {
        icon: <ReloadIcon color="var(--text-main)" />,
        text: "Обновить страницу",
        onClick: reloadButtonHandler,
        className: "[&]:gap-6",
      },

    ],
    [projectName, userId,isAppReady]
  );

  return { menuButtons };
};
