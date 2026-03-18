"use client";

import clsx from "clsx";
import React, { useState, useEffect } from "react";

interface SvgFromUrlProps {
  src: string; // URL иконки
  alt?: string; // для доступности
  className?: string; // стили для <svg>
  fallback?: React.ReactNode;
  color?: string; // что показать при ошибке загрузки
}

export const SvgFromUrl: React.FC<SvgFromUrlProps> = ({
  src,
  alt = "icon",
  className = "",
  color = "var(--main-color)",
  fallback = <span></span>,
}) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(src);
        if (!response.ok) throw new Error("Failed to fetch SVG");

        const text = await response.text();

        // Убираем возможные <script>, <style> и т.д. для безопасности
        const cleanSvg = text
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
          .replace(/on\w+\s*=\s*".*?"/gi, "") // убираем обработчики событий
          .replace(/<link\b[^>]*>/gi, "") // убираем внешние ссылки
          .replace("<svg", '<svg class="w-full h-full" ')
          .trim();

        // Проверяем, что это действительно SVG
        if (!cleanSvg.startsWith("<svg")) {
          throw new Error("Invalid SVG content");
        }

        setSvgContent(cleanSvg);
      } catch (err) {
        console.error("Error loading SVG:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (src) {
      fetchSvg();
    }
  }, [src]);

  if (loading) {
    return <span className={clsx("inline-block", className)} />;
  }

  if (error || !svgContent) {
    return <>{fallback}</>;
  }

  return (
    <span
      dangerouslySetInnerHTML={{ __html: svgContent }}
      style={{ "--icon-color": color } as React.CSSProperties}
      className={`inline-block align-middle [&_*]:fill-[var(--icon-color)]  ${className}`}
      role="img"
      aria-label={alt}
    />
  );
};
