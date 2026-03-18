import { typograf } from "@/shared/lib";
import { CrossIcon } from "@/shared/ui";
import clsx from "clsx";
import { useState } from "react";

const noteText = `Если у вас есть перечень документов, загрузите их в этом разделе — это поможет нам обработать вашу заявку быстрее.`;

export const LicenseAndInvoiceExampleNote = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(true);
  return (
    <div
      className={clsx(
        "z-20 absolute top-40 left-0 w-full rounded-[21px] border border-[var(--border-placeholder)] bg-[var(--background-secondary)] transition-opacity duration-500 pr-[16px]",
        {
          "opacity-0 pointer-events-none": !isNoteOpen,
        }
      )}
    >
      <div className="px-21 pr-40 py-12 text-15 leading-[134%] text-[var(--text-main)]">
        {typograf(noteText)}
      </div>
      <button
        onClick={() => setIsNoteOpen(false)}
        className="absolute top-7 right-10 p-10"
      >
        <CrossIcon className="w-13 h-13" color="var(--text-light)"></CrossIcon>
      </button>
    </div>
  );
};
