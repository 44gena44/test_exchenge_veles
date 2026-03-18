"use client"

import dynamic from "next/dynamic";
const TransferAbroadResultPage = dynamic(
  () =>
    import("@/b__pages/transferAbroadResult/ui").then(
      (mod) => mod.TransferAbroadResult
    ),
  { ssr: false }
);

export default function TransferAbroadResult() {
  return <TransferAbroadResultPage></TransferAbroadResultPage>;
}

