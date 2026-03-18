import clsx from "clsx";
import React, { memo, ReactNode } from "react";

type ButtonProps = {
  className?: string;
  type: "primary" | "secondary" | "main-screen-left" | "main-screen-right";
  children: ReactNode;
  onClick?: () => void;
  submit?: boolean;
  disabled?: boolean;
  trackingLabel?: string;
};

export const Button: React.FC<ButtonProps> = memo(
  ({ className, type, children, onClick, submit, disabled, trackingLabel }) => {
    return (
      <button
        data-tracking-label={trackingLabel}
        onClick={onClick}
        type={submit ? "submit" : "button"}
        className={clsx(
          className,
          "flex items-center justify-center w-full text-16 rounded-full transition-all shrink-0",
          {
            "bg-[var(--main-color-light)] text-[var(--text-button-main)] h-47":
              type === "primary",
            "bg-[var(--background-button-secondary)] text-[var(--text-button-secondary)] border border-[var(--border-button-secondary)] h-47":
              type === "secondary",
            "bg-[var(--background-button-first-screen-left)] text-[var(--text-button-first-screen-left)] h-38":
              type === "main-screen-left",
            "bg-[var(--background-button-first-screen-right)] text-[var(--text-button-first-screen-right)] h-38":
              type === "main-screen-right",
            "[&]:bg-[var(--background-button-disabled)] [&]:text-[var(--text-button-disabled)] [&]:pointer-events-none":
              disabled,
          }
        )}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
