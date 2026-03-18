
"use client"

import dynamic from "next/dynamic";
const TransferAbroadInputInvoicePage = dynamic(
  () =>
    import("@/b__pages/transferAbroadInputInvoice/ui").then(
      (mod) => mod.default
    ),
  { ssr: false }
);

export default function TransferAbroadInputInvoice() {
  return <TransferAbroadInputInvoicePage />;
}

