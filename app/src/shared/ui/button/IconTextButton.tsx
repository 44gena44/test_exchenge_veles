import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  text: string;
  onClick:() => void
};

export const IconTextButton = ({ icon, text, onClick }: Props) => (
  <button onClick={onClick} className="absolute top-12 right-12 px-9 py-7 rounded-[21px] border border-[var(--main-color)] gap-5 flex items-center">
    {icon}
    <span className="text-12 leading-[100%] block text-[var(--main-color)]">{text}</span>
  </button>
);
