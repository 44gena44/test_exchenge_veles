"use client"

import dynamic from "next/dynamic";
const TransferAbroadInputCardsPage = dynamic(
  () =>
    import("@/b__pages/transferAbroadInputCards/ui").then((mod) => mod.default),
  { ssr: false }
);
export default function TransferAbroadInputCards() {
  return <TransferAbroadInputCardsPage />;
}

