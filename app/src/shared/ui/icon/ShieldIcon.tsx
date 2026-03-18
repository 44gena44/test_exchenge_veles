import { SvgIcon } from "@/shared/model/icon";

export const ShieldIcon = ({
  className,
  color = "var(--main-color)",
}: SvgIcon) => (
  <svg
    className={className}
    width="16"
    height="19"
    viewBox="0 0 16 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.83909 0.622284L0.339844 3.34951V9.4114C0.339844 16.2607 7.61724 18.1243 7.69036 18.143L7.83909 18.1787L7.98783 18.143C8.06095 18.1243 15.3383 16.2607 15.3383 9.4114V3.34951L7.83909 0.622284ZM6.58922 12.7948L3.64764 9.85324L4.5313 8.96957L6.58922 11.0275L11.1469 6.46982L12.0305 7.35349L6.58922 12.7948Z"
      fill={color}
    />
  </svg>
);
