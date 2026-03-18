"use client";
import { valueMask } from "@/shared/lib/string/valueMask";
import React, { memo, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import WavesAnimation from "./WavesAnimation";
import { AlertIcon, QuestionIcon } from "../icon";
import type { SectionHeading as SectionHeadingProps } from "@/shared/model/sectionHeading";

export type HeadingRate = {
  from: {
    value: number;
    name: string;
  };
  to: {
    value: number;
    name: string;
  };
};


export const SectionHeading: React.FC<SectionHeadingProps> = memo(
  ({ title, rate, minValue, error, note, conditionText = "минимально" }) => {
    const [isMessageOpen, setIsMessageOpen] = useState(false);

    const timeout = useRef<NodeJS.Timeout>(null);

    useEffect(() => {
      if (isMessageOpen) {
        if (timeout.current) clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
          setIsMessageOpen(false);
        }, 3000);
      }
    }, [isMessageOpen]);

    useEffect(() => {
      return () => {
        if (timeout.current) clearTimeout(timeout.current);
      };
    }, []);

    const handleMinValueClick: React.MouseEventHandler = () => {
      setIsMessageOpen(true);
    };

    return (
      <div className="flex items-end justify-between mb-13 pl-6  gap-10">
        <h2
          dangerouslySetInnerHTML={{ __html: title }}
          className="text-16 text-[var(--text-main)] font-medium leading-normal  shrink-0 min-w-100"
        ></h2>
        {rate && (
          <span
            className="text-13  leading-normal text-[var(--text-secondary)] text-right"
            dangerouslySetInnerHTML={{
              __html: `${valueMask(rate?.from.value)} ${
                rate?.from.name
              } = <span class="text-[var(--text-main)]">${valueMask(
                rate?.to.value
              )}</span> ${rate?.to.name}`,
            }}
          ></span>
        )}
        {minValue && (
          <button
          data-tracking-label="Информация о минимальной сумме"
            onClick={handleMinValueClick}
            className=" relative block pl-17 max-w-200"
          >
            <WavesAnimation
              color={error ? "var(--text-error-bright)" : "var(--main-color)"}
              className="center-y left-[-8px] z-20"
            >
              <QuestionIcon
                color={"var(--main-color)"}
                className={clsx("w-18 h-18 ", { "opacity-0": error })}
              ></QuestionIcon>
              <AlertIcon
                color="var(--text-error-bright)"
                className={clsx(
                  "w-18 h-18 center opacity-0 transition-opacity duration-500",
                  { "[&]:opacity-100": error }
                )}
              />
            </WavesAnimation>

            <span
              className={clsx(
                "block text-13 leading-normal text-[var(--text-secondary)]  [&_span]:transition-all [&_span]:duration-500",
                {
                  "[&]:text-[var(--text-error-light)] [&_span]:text-[var(--text-error-bright)]":
                    error,
                }
              )}
            >
              <span className=" mr-6 ">{conditionText}</span>
              <span
                className={clsx(
                  "text-[var(--text-main)] transition-all duration-500 whitespace-nowrap",
                  {
                    "text-[var(--text-error-bright)]": error,
                  }
                )}
              >
                {valueMask(minValue)}
              </span>
            </span>
          </button>
        )}
        {note && (
          <div
            className={clsx(
              "fixed z-50 top-[121px] right-1/2 translate-x-1/2 w-[280px] px-[21px] py-[14px]  leading-[120%] border border-[var(--border-placeholder)] bg-[var(--background-secondary)] rounded-[21px] transition-opacity duration-500",
              {
                "opacity-100 pointer-events-auto": isMessageOpen,
                "opacity-0 pointer-events-none": !isMessageOpen,
              }
            )}
          >
            {note}
          </div>
        )}
      </div>
    );
  }
);

SectionHeading.displayName = "SectionHeading";
