"use client";
import clsx from "clsx";
import { FC, ReactNode } from "react";
import { ArrowTopIcon } from "../icon";

const DropdownTrigger: FC<{
  onClick?: () => void;
  children: ReactNode;
  arrow?: boolean;
  arrowPosition?: "top" | "bottom";
  border?: boolean;
  className?: string;
  trackingLabel?: string;
}> = ({
  onClick,
  children,
  arrowPosition,
  arrow,
  border,
  className,
  trackingLabel,
}) => {
  return (
    <button
      data-tracking-label={trackingLabel}
      className={clsx(
        "flex items-center justify-center gap-5 w-full h-50 bg-[var(--background-secondary)] text-[var(--text-main)]",
        className,
        {
          "border-t border-[var(--divider-secondary)]": border,
        }
      )}
      onClick={onClick}
    >
      <span className="text-16 ">{children}</span>
      {arrow && (
        <ArrowTopIcon
          color="var(--text-main)"
          className={clsx(
            "w-11 h-11 transition-transform duration-500 translate-y-1 shrink-0",
            {
              "rotate-180 [&]:translate-y-2": arrowPosition !== "bottom",
            }
          )}
        />
      )}
    </button>
  );
};

export default DropdownTrigger;
