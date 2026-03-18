import { SvgIcon } from "@/shared/model/icon";

export const ProgressBarSignIcon = ({
  className,
  color = "var(--main-color)",
}: SvgIcon) => (
  <svg
    className={className}
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.56819 1.34808L3.67935 6.23692L1.45715 4.01472"
      stroke={color}
      strokeWidth="1.99998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
