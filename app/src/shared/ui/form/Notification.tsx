import clsx from "clsx";
import { ReactNode } from "react";

type NotificationProps = {
  isVisible: boolean;
  message: string;
  icon: ReactNode;
  className?: string;
}

export const Notification: React.FC<NotificationProps> = ({
  isVisible,
  message,
  className,
  icon,
}) => {
  return (
    <div>
      <div
        className={clsx(
          "flex items-center justify-center gap-8 text-16 h-56 opacity-0 transition-opacity duration-500 bg-[var(--background-secondary)] rounded-6 border-1 border-transparent pointer-events-none text-[var(--text-main)]",
          { "opacity-100 pointer-events-auto": isVisible },
          className
        )}
      >
        {icon}
        {message}
      </div>
    </div>
  );
}; 