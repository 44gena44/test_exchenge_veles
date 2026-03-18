import React, { ReactNode } from "react";
import { SignIcon } from "../icon";
import clsx from "clsx";
type Props = {
  checked: boolean;
  children: ReactNode;
  onClick: () => void;
};

export default function Checkbox({ checked, children, onClick }: Props) {
  return (
    <div className="flex gap-[10px] cursor-pointer" onClick={onClick}>
      <div className="bg-[var(--background-secondary)] rounded-[4px] border border-[#E4E4E4] relative w-[17px] h-[17px] shrink-0">
        <SignIcon
          className={clsx("w-[13px] h-[13px] center transition-opacity", {
            "opacity-100": checked,
            "opacity-0": !checked,
          })}
        />
      </div>
      <div className="text-14 max-w-[250px]">{children}</div>
    </div>
  );
}
