import clsx from "clsx";

type BaseTextarea = {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  className?: string;
  trackingLabel?: string;
};
export const BaseTextarea = ({
  value,
  setValue,
  placeholder,
  className,
  trackingLabel,
}: BaseTextarea) => (
  <textarea
    className={clsx(
      "min-h-158 w-full resize-none px-16 py-12 rounded-[21px] bg-[var(--background-secondary)] border border-[var(--border-placeholder)] text-[var(--text-main)] placeholder:text-[var(--text-light)] -mb-6",
      className
    )}
    placeholder={placeholder}
    value={value}
    data-tracking-label={trackingLabel}
    onChange={(e) => setValue(e.target.value)}
  ></textarea>
);
