import clsx from "clsx";
import { QuestionIcon } from "../icon";
import { ReactNode } from "react";

type QuestionIconAnimationProps = {
  error?: boolean;
  className: string;
  children: ReactNode;
  color: string
};
export default function QuestionIconAnimation({
  className,
  children,
  color
}: QuestionIconAnimationProps) {
  return (
    <div className={clsx(className)}>
      <div
        className={clsx("relative transition-opacity duration-500", {
        })}
      >
        {children}
        <span
          style={{ borderColor: color }}
          className="absolute inset-[2px] transition-colors duration-500 rounded-full animation-wave-2 border wave1"
        ></span>
        <span
          style={{ borderColor: color }}
          className="absolute inset-[2px] transition-colors duration-500 rounded-full animation-wave-2 border wave2"
        ></span>
        <span
          style={{ borderColor: color }}
          className="absolute inset-[2px] transition-colors duration-500 rounded-full animation-wave-2 border wave3"
        ></span>
      </div>
    </div>
  );
}
