"use client"

import dynamic from "next/dynamic";
const TransferAbroadDetailsPage = dynamic(
  () =>
    import("@/b__pages/transferAbroadDetails/ui").then(
      (mod) => mod.TransferAbroadDetails
    ),
  { ssr: false }
);

export default function TransferAbroadDetails() {
  return <TransferAbroadDetailsPage />;
}

