import React, { memo, useEffect, useState } from "react";
import { BaseSelect, InputWrapper } from "@/shared/ui";
import clsx from "clsx";
import { City } from "@/shared/model/api";

export type PlaceOption = {
  name: string;
  id: number;
  country?: string
};

export type PlaceSelectProps = {
  options: PlaceOption[];
  onChange: (value: string | null) => void;
  value: string;
  placeholder: string;
  placeholderFocused?: string;
  error?: string | null;
  disabled?: boolean
};

export const PlaceSelect: React.FC<PlaceSelectProps> = memo(
  ({ options, onChange, value, placeholder, placeholderFocused, error, disabled }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState(value);

    const handleSelect = (option: PlaceOption) => {
      setSearchValue(option.name);
      onChange(option.name);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      setIsOpen(true);

      // Check if the input value exactly matches any city name
      const exactMatch = options.find(
        (option) => option.name.toLowerCase() === val.toLowerCase()
      );
      onChange(exactMatch ? exactMatch.name : null);
    };

    const handleFocus = () => {
      setFocused(true);
      setIsOpen(true);
    };

    const showCustomPlaceholder = !searchValue;

    const [showFullOptionsArray, setShowFullOptionsArray] = useState(false);

    useEffect(() => {
      setShowFullOptionsArray(false);
    }, [searchValue]);

    useEffect(() => {
      if (!isOpen) {
        setShowFullOptionsArray(true);
      }
    }, [isOpen]);

    const filterOptions = (options: PlaceOption[], searchValue: string) => {
      return showFullOptionsArray
        ? options
        : options.filter((option) =>
            option.name.toLowerCase().includes(searchValue.toLowerCase())
          );
    };

    useEffect(() => {
      if (value !== searchValue) {
        setSearchValue(value);
      }
    }, [value]);

    return (
      <BaseSelect<City>
        disabled={disabled}
        options={options}
        value={options.find((opt) => opt.name === value) || null}
        onChange={handleSelect}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        searchValue={searchValue}
        filterOptions={filterOptions}
        className="[&_button]:text-16 "
        renderTrigger={({ isOpen }) => (
          <InputWrapper error={error} errorIcon={false}>
            <div
              className={clsx(
                "relative w-full flex items-center justify-between px-16 py-10 rounded-full border border-[var(--border-placeholder)] bg-[var(--background-secondary)] text-13 transition-all duration-500",
                { "[&]:border-[var(--border-error)]": !!error }
              )}
            >
              {showCustomPlaceholder && (
                <div
                  className={clsx(
                    "absolute left-16 pointer-events-none text-16 transition-colors",
                    focused
                      ? "text-[var(--text-light)]"
                      : "text-[var(--text-main)]"
                  )}
                >
                  {focused ? placeholderFocused : placeholder}
                </div>
              )}

              <input
                type="text"
                className="w-full outline-none bg-transparent text-16 text-[var(--text-main)] placeholder:opacity-0"
                value={searchValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
              />
              <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                tabIndex={-1}
              >
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
            </div>
          </InputWrapper>
        )}
        renderOption={({ option, onClick }) => (
          <button
            className="shrink-0 px-18 py-9 text-left w-full not-last:border-b not-last:border-[var(--divider-secondary)] text-[var(--text-main)]"
            key={option.id}
            onClick={onClick}
          >
            {option.name}
          </button>
        )}
      />
    );
  }
);

PlaceSelect.displayName = "PlaceSelect";
