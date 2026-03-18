import React from "react";
import clsx from "clsx";
import { Input } from "./Input";
import { InputWrapper } from "./InputWrapper";

export const InputField: React.FC<{
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  trackingLabel: string;
}> = ({
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  disabled,
  className,
  trackingLabel,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleBlur = () => {
    if (onBlur) onBlur();
  };

  return (
    <InputWrapper error={error}>
      <Input
        trackingLabel={trackingLabel}
        onChange={handleChange}
        value={value}
        type="text"
        className={clsx(
          " border border-transparent rounded-full  placeholder:text-[var(--text-light)] text-16 leading-normal px-18 py-14 w-full",
          className
        )}
        placeholder={placeholder}
      />
    </InputWrapper>
  );
};
