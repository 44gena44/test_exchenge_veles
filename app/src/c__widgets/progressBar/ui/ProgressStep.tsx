import clsx from "clsx";
import { ProgressBarSignIcon } from "./ProgressBarSignIcon";

type ProgressStepProps = {
  isActive: boolean;
  isCompleted: boolean;
  delay?: boolean;
};

export const ProgressStep: React.FC<ProgressStepProps> = ({ isActive, isCompleted, delay }) => (
  <div
    className={clsx(
      "w-20 h-20 border-2 border-[var(--progress-bar-active)] rounded-full flex items-center justify-center relative shrink-0",
      {
        "bg-[var(--progress-bar-active)]": isCompleted,
        "delay-500": delay,
      }
    )}
  >
    <ProgressBarSignIcon
    color="var(--progress-bar-sign)"
      className={clsx(" opacity-0 top-5 center-x", {
        "[&]:opacity-100": isCompleted,
        "delay-500": delay,
      })}
    />
  </div>
);
