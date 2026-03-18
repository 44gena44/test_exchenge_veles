"use client";

import { useRouter } from "next/navigation";

export function BackHeader() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mb-16 flex items-center gap-7 -ml-2"
      aria-label="Назад"
    >
      <img
        className="w-13 h-12"
        src="/images/icons/arrow.svg"
        alt=""
      />
      Вернуться
    </button>
  );
}
