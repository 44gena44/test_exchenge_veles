import clsx from "clsx";
import React from "react";

export type SvgIconProps = {
  className?: string;
  fill?: string;
};

type Props = SvgIconProps & {
  isCrossShape: boolean;
};

const stickClass =
  "w-[20px] h-[2px] rounded-[5px] bg-[var(--burger-color)] absolute left-0 top-0 transition-all duration-500 ";

export default function BurgerIcon({
  className,
  fill = "white",
  isCrossShape,
}: Props) {
  return (
    <div className={clsx("w-[20px] h-[16px] relative", className)}>
      {[undefined, undefined, undefined, undefined].map((item, index) => (
        <div
          key={index}
          style={
            {
              "--burger-color": fill,
            } as React.CSSProperties
          }
          className={clsx(stickClass, {
            "": !isCrossShape && index === 0,
            "rotate-45 origin-top-left [&]:w-[21px]": isCrossShape && index === 0,
            "translate-y-[7px]": !isCrossShape && index === 1,
            "translate-y-[0px] rotate-45 origin-top-left [&]:w-[21px]": isCrossShape && index === 1,
            "translate-y-[14px]": !isCrossShape && (index === 2 || index === 3),
            "translate-y-[14px] -rotate-45 origin-bottom-left [&]:w-[21px]": isCrossShape && (index === 2 || index === 3),
     
          })}
        ></div>
      ))}
    </div>
  );
}
