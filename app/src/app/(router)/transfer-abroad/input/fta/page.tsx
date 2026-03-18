"use client"

import dynamic from "next/dynamic";
const TransferAbroadInputFtaCurrencyAndTaskPage = dynamic(
  () =>
    import("@/b__pages/transferAbroadInputFtaCurrencyAndTask/ui").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function TransferAbroadInputFtaCurrencyAndTask() {
  return (
    <TransferAbroadInputFtaCurrencyAndTaskPage/>
  );
}

