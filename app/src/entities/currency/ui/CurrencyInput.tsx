import {
  formatWithSpaces,
  normalizeInput,
  valueMask,
} from "@/shared/lib/string/valueMask";
import React, { memo, useEffect, useState, useCallback } from "react";
import CurrencySelect from "./CurrencySelect";
import { InputWrapper } from "../../../shared/ui/form/InputWrapper";
import { Input } from "../../../shared/ui/form/Input";
import { Currency } from "@/shared/model/api/exchange/types";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";

export type CurrencyInputProps = {
  inputValue: number | null;
  onInputChange: (value: number | null) => void;
  onSelectChange: (option: Currency) => void;
  selectValue: Currency;
  options: Currency[];
  placeholder?: string;
  error?: boolean;
  position?: ExchangeCurrencyPosition
};

const CurrencyInput: React.FC<CurrencyInputProps> = memo(
  ({
    inputValue: outsideValue,
    onInputChange,
    onSelectChange,
    options,
    placeholder,
    selectValue,
    error,
    position
  }) => {
    const [inputValue, setInputValue] = useState<string>("");

    // Обработка внешнего значения
    useEffect(() => {
      if (outsideValue === null) {
        setInputValue("");
        return;
      }
      const newValue = valueMask(outsideValue);

      if (newValue !== inputValue) {
        setInputValue(newValue);
      }
    }, [outsideValue]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = normalizeInput(e.target.value);

        if (!raw) {
          setInputValue("");
          onInputChange(null);
          return;
        }

        const parts = raw.split(",");
        const intPart = parts[0];
        const decPart = parts[1]?.slice(0, 8);

        const combined =
          decPart !== undefined ? `${intPart},${decPart}` : intPart;
        const formatted = formatWithSpaces(combined);
        setInputValue(formatted);

        const numeric = parseFloat(
          combined.replace(/\s/g, "").replace(",", ".")
        );
        onInputChange(!isNaN(numeric) ? numeric : null);
      },
      [onInputChange]
    );

    const handleBlur = useCallback(() => {
      if (!inputValue) {
        onInputChange(null);
        return;
      }

      const cleaned = inputValue.replace(/[^\d,]/g, "").replace(/[,.]$/, "");
      const parts = cleaned.split(",");
      const intPart = parts[0] || "0";
      const decPart = parts[1]?.slice(0, 8);
      const normalized =
        decPart !== undefined ? `${intPart},${decPart}` : intPart;

      const formatted = formatWithSpaces(normalized);
      setInputValue(formatted);

      const numeric = parseFloat(
        normalized.replace(/\s/g, "").replace(",", ".")
      );
      onInputChange(!isNaN(numeric) ? numeric : null);
    }, [inputValue, onInputChange]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowed = [
          "Backspace",
          "Delete",
          "ArrowLeft",
          "ArrowRight",
          "Tab",
        ];
        const isNumber = /^[0-9]$/.test(e.key);
        const isSeparator = e.key === "," || e.key === ".";

        if (!isNumber && !allowed.includes(e.key) && !isSeparator) {
          e.preventDefault();
        }
      },
      []
    );

    return (
      <div className="relative">
        <InputWrapper
          error={error ? "error" : null}
          showErrorText={false}
          errorIcon={false}
          className="pb-0"
        >
          <div className="py-8 rounded-full border transition-all duration-500 border-[var(--border-placeholder)] bg-[var(--background-secondary)]">
            <div className="relative w-full flex items-center justify-between text-13 ">
              <Input
              trackingLabel={`Сумма${position ? (position === 'given' ? ' продажи' : ' покупки') : ''}`}
                value={inputValue || ""}
                onChange={handleChange}
                placeholder={placeholder}
              className={'rounded-full'}
              />
              <CurrencySelect
                value={selectValue}
                options={options}
                onChange={onSelectChange}
              />
            </div>
          </div>
        </InputWrapper>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;
