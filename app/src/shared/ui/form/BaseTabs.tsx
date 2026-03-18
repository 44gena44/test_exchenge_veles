"use client"
import clsx from "clsx";
import { useEffect } from "react";

type TabOption = {
  name: string;
  id: number;
};

type Props = {
  options: TabOption[];
  value: TabOption | null;
  onChange: (value: TabOption) => void;
};

export const BaseTabs: React.FC<Props> = ({ onChange, options, value }) => {

  return (
    <div className="flex gap-x-8 gap-y-11 flex-wrap">
      {options.map((option, index) => (
        <button
          onClick={() => onChange(option)}
          key={index}
          className={clsx(
            "border  border-[var(--border-placeholder)] rounded-full bg-[var(--background-secondary)] text-[var(--text-main)] text-13 leading-normal duration-500 px-21 py-9",
            {
              "[&]:border-[var(--main-color)] [&]:bg-[var(--main-color)] [&]:text-[var(--text-button-main)] pointer-events-none":
                value?.id === option?.id,
            }
          )}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};
