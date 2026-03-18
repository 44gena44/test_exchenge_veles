import { usePathname } from "next/navigation";
import { ProgressBarSignIcon } from "./ProgressBarSignIcon";
import { ProgressLine } from "./ProgressLine";
import { ProgressStep } from "./ProgressStep";
import { useMemo } from "react";
import { PROGRESS_STEPS_PATHS_REFERRENCIES } from "../config";

type ProgressBarProps = {
  isBackward?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  isBackward = false,
}) => {
  const pathname = usePathname();

  const currentStep = useMemo(
    () =>
      PROGRESS_STEPS_PATHS_REFERRENCIES.findIndex((paths) =>
        paths.some((path) => pathname.startsWith(path))
      ),
    [pathname]
  );
  return (
    <div className="flex items-center gap-5 [&_*]:transition-all [&_*]:duration-500">
      <div className="w-20 h-20 rounded-full relative shrink-0 bg-[var(--progress-bar-active)]">
        <ProgressBarSignIcon
          color="var(--progress-bar-sign)"
          className=" top-6 center-x"
        />
      </div>
      <ProgressLine
        currentStep={currentStep}
        stepNumber={1}
        isBackward={isBackward}
      />
      <ProgressStep
        isActive={currentStep >= 2}
        isCompleted={currentStep >= 2}
        delay
      />
      <ProgressLine
        currentStep={currentStep}
        stepNumber={2}
        isBackward={isBackward}
      />
      <ProgressStep
        isActive={currentStep >= 3}
        isCompleted={currentStep >= 3}
        delay
      />
    </div>
  );
};
