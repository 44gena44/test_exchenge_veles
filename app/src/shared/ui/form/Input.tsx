import React from "react";
import clsx from "clsx";

type InputProps = {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  trackingLabel: string;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  className,
  onKeyDown,
  trackingLabel,
}) => {
  return (
    <input
      data-tracking-label={trackingLabel}
      type={type}
      className={clsx(
        "w-full bg-[var(--background-secondary)] outline-none text-16 text-[var(--text-main)]  px-16 py-8 ",
        className
      )}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
    />
  );
};
