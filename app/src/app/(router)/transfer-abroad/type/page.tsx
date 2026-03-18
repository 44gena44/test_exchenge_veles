"use client"

import dynamic from "next/dynamic";
const TransferAbroadTypePage = dynamic(
  () => import("@/b__pages/transferAbroadType/ui").then((mod) => mod.default),
  { ssr: false }
);

export default function TransferAbroadType() {
  return <TransferAbroadTypePage />;
}

