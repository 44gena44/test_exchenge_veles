import React from "react";
import clsx from "clsx";
import { AlertIcon } from "../icon";

type InputWrapperProps = {
  children: React.ReactElement<{ className?: string }>;
  error?: string | null;
  className?: string;
  errorClassName?: string;
  errorIconClassName?: string;
  errorTextClassName?: string;
  errorIcon?: boolean;
  showErrorText?: boolean;
};

export const InputWrapper: React.FC<InputWrapperProps> = ({
  children,
  error,
  className,
  errorClassName = "text-[var(--text-error-light)] text-13",
  errorIconClassName = "w-21 h-21 absolute right-12 top-12",
  errorTextClassName = "absolute left-0 -bottom-1",
  errorIcon = true,
  showErrorText = true,
}) => {
  return (
    <div className={clsx("w-full pb-16 relative", className)}>
      {React.cloneElement(children, {
        className: clsx(children.props.className, {
          "[&]:border-[var(--border-error)]": error,
        }),
      })}
      {showErrorText && (
        <p
          className={clsx(
            errorTextClassName,
            errorClassName,
            "transition-all duration-500 pl-6",
            { "opacity-0": !error }
          )}
        >
          {error}
        </p>
      )}
      {errorIcon && (
        <div
          className={clsx(
            "absolute right-0 top-0 h-full flex items-center pr-12 transition-all duration-500",
            { "opacity-0": !error }
          )}
        >
          <AlertIcon color="var(--border-error)" className={errorIconClassName} />
        </div>
      )}
      {error && <></>}
    </div>
  );
};
