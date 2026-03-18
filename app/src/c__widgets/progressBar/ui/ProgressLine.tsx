import clsx from "clsx";

type ProgressLineProps = {
  currentStep: number;
  stepNumber: number;
  isBackward?: boolean;
};

export const ProgressLine: React.FC<ProgressLineProps> = ({
  currentStep,
  stepNumber,
  isBackward,
}) => {
  const getWidth = () => {
    if (currentStep < stepNumber) return "w-0";
    if (currentStep === stepNumber) return "w-26";
    return "w-52";
  };

  return (
    <div className="w-52 h-2 bg-[var(--progress-bar-default)] rounded-full relative">
      <div
        className={clsx(
          "h-2 bg-[var(--progress-bar-active)] rounded-full absolute top-0 left-0",
          {
            [getWidth()]: true,
            "delay-1000":
              (isBackward && stepNumber === 1) ||
              (!isBackward && stepNumber === 2 && currentStep !== 3),
          }
        )}
      />
    </div>
  );
};