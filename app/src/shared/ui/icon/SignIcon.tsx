import { SvgIcon } from "@/shared/model/icon";

export const SignIcon = ({
  className,
  color = "var(--main-color)",
}: SvgIcon) => (
  <svg
    className={className}
    width="14"
    height="11"
    viewBox="0 0 14 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.3922 1.7635L5.05956 9.0961L1.72656 5.7631"
      stroke={color}
      strokeWidth="1.9998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
