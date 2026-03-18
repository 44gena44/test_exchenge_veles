import React, { memo, useState } from "react";
import {BaseSelect} from "@/shared/ui";
import { Currency } from "@/shared/model/api/exchange/types";
import { CashIcon } from "@/shared/ui";
import clsx from "clsx";



export type CurrencySelectProps = {
  options: Currency[];
  onChange: (value: Currency) => void;
  value: Currency;
};

const ButtonDisplay = memo(({ icon, name }: Currency) => (
  <span className={clsx("button-display flex items-start gap-6 overflow-hidden text-ellipsis text-16 text-[var(--text-main)]")}>
    {icon ? <img src={icon} className="w-24 h-24 shrink-0" /> : <CashIcon className="w-24 h-24 shrink-0"/>}
    <span dangerouslySetInnerHTML={{__html:name}}></span>
  </span>
));

ButtonDisplay.displayName = "ButtonDisplay";

const CurrencySelect = memo(({ options, onChange, value: selected }: CurrencySelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <BaseSelect<Currency>
      options={options}
      value={selected}
      onChange={onChange}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      className="[&]:w-128"
      dropdownTop="top-[140%]"
      maxHeight={200}
      renderTrigger={({ isOpen }) => (
        <button
          type="button"
          className="w-full rounded-r-full flex [&_.button-display]:items-center items-center justify-between px-16 py-10 border-l border-[var(--divider-main)] bg-[var(--background-secondary)] text-16"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selected ? (
            <ButtonDisplay {...selected} />
          ) : (
            <span className="text-[var(--text-main)]">Выбрать</span>
          )}
          <svg
            className={`ml-2 w-15 h-15 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="var(--text-secondary)"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      )}
      renderOption={({ option, onClick }) => (
        <button
          className="shrink-0 px-16 py-4 text-left w-full"
            key={option.id}
          onClick={onClick}
        >
          <ButtonDisplay {...option} />
        </button>
      )}
    />
  );
});

CurrencySelect.displayName = "CurrencySelect";

export default CurrencySelect;
