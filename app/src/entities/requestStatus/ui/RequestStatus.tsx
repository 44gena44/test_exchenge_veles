import { ClockIcon } from "@/shared/ui";
import clsx from "clsx";
import { memo } from "react";

const RequestStatus: React.FunctionComponent<{
  isInProcess: boolean;
  id: string | undefined;
}> = memo(({ isInProcess, id }) => {
  return (
    <div
      className={clsx("transition-all select-none w-full mt-[12px]", {
        "opacity-100": isInProcess,
      })}
    >
      <div className="px-22 pt-18 pb-20 rounded-[21px] flex items-center gap-12 w-full bg-[var(--main-color)]">
        <ClockIcon color={'var(--text-button-main)'} className="w-37 h-37"></ClockIcon>
        <div>
          <p className="text-[14px] mb-4 text-[var(--text-button-main)] font-black">Заявка #{id} в работе</p>
          <span className="text-13 text-[var(--text-button-main)] leading-[120%] block font-bold">
            Ожидайте ответа оператора
          </span>
        </div>
      </div>
    </div>
  );
});

RequestStatus.displayName = "RequestStatus"

export default RequestStatus