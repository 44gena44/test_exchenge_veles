import { SvgIcon } from "@/shared/model/icon";

export const ArrowDownIcon = ({
  className,
  color = "var(--main-color)",
}: SvgIcon) => (
<svg
className={className}
  width="24"
  height="24"
  fill="none"
  stroke={color}
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M19 9l-7 7-7-7"
  />
</svg>
)
