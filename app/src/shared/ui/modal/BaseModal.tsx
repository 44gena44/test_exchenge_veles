"use client";
import clsx from "clsx";
import { Button } from "../button/Button";
import { createPortal } from "react-dom";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import { CrossIcon } from "../icon";

type BaseModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  handleButton?: () => void;
  buttonText?: string;
  isCloseButtonHidden?: boolean;
  className?: string;
  isSubmitButtonDisabled?: boolean;
  isSubmitButtonHidden?: boolean;
  renderTrigger?: number;
};

export const BaseModal = forwardRef(
  (
    {
      children,
      isOpen,
      handleClose,
      handleButton,
      buttonText = "Понятно!",
      isCloseButtonHidden = false,
      className,
      isSubmitButtonDisabled,
      isSubmitButtonHidden,
      renderTrigger,
    }: BaseModalProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const portalTarget = useRef<HTMLElement>(null);

    useEffect(() => {
      portalTarget.current = document.getElementById("portal-target");
    }, [renderTrigger]);

    const element = (
      <div
        ref={ref}
        onClick={handleClose}
        className={clsx(
          "fixed top-0 left-0 w-full h-full bg-[var(--background-modal)]/60 flex justify-center items-center transition-all duration-500 z-[200] p-[21px]",
          {
            "pointer-events-none opacity-0": !isOpen,
            "pointer-events-auto opacity-100": isOpen,
          },
          className
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={clsx(
            " relative w-full max-w-[400px] rounded-[16px] p-[28px] pt-[36px] flex flex-col gap-[30px] bg-[var(--background-secondary)]"
          )}
        >
          <div className={clsx(" text-[16px] text-[var(--text-main)]")}>
            {children}
          </div>
          {!isSubmitButtonHidden && (
            <Button
              trackingLabel={buttonText}
              disabled={isSubmitButtonDisabled}
              type="primary"
              onClick={handleButton || handleClose}
            >
              {buttonText}
            </Button>
          )}
          {!isCloseButtonHidden && (
            <button
              className="absolute top-[19px] right-[17px]"
              onClick={handleClose}
            >
              {" "}
              <CrossIcon className={clsx("w-13 h-13")} />
            </button>
          )}
        </div>
      </div>
    );
    return portalTarget.current
      ? createPortal(element, portalTarget.current)
      : null;
  }
);

BaseModal.displayName = "BaseModal";
