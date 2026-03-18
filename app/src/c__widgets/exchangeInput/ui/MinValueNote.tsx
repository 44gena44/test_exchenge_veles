import { useCallSupport } from "@/d__features/support/lib";
import {useAppSelector} from "@/shared/model/store";

export const MinValueNote = () => {
    const userId = useAppSelector((state) => state.user.id);
    const isAppReady = useAppSelector((state) => state.ui.isAppReady);
  const { callSupport } = useCallSupport();

  const handleMinValueDescriptionClick: React.MouseEventHandler = () => {
    callSupport();
  };
  return (
    <>
      {" "}
      <p className="text-[var(--text-main)] mb-[5px] text-[14px]">
        Минимальная сумма обмена может быть ниже
      </p>
      <button
        onClick={handleMinValueDescriptionClick}
        className="text-[var(--text-secondary)] text-[13px]"
      >
        Уточните подробности у оператора
      </button>
    </>
  );
};
