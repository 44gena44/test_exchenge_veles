"use client";
import clsx from "clsx";
import React, { ReactNode, useEffect, useRef, useState } from "react";

type Props = {
  triggerRender: (props: { onClick: () => void; isOpen: boolean }) => ReactNode;
  children: ReactNode;
};

export default function ExpandableElement({ triggerRender, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = useState(0);

  const openList = () => {
    if (ref.current) {
      setListHeight(ref.current.clientHeight);
    }
  };

  const closeList = () => {
    setListHeight(0);
  };

  useEffect(() => {
    if (isOpen) {
      openList();
    } else {
      closeList();
    }
  }, [isOpen]);
  return (
    <div className="overflow-hidden rounded-8">
      {triggerRender({ isOpen, onClick: () => setIsOpen((prev) => !prev) })}
      <div
        style={
          {
            height: listHeight,
          } as React.CSSProperties
        }
        className={clsx(
          "transition-all duration-500  relative overflow-hidden",
          { "border-t border-[var(--divider-secondary)]": isOpen }
        )}
      >
        <div onClick={() => setIsOpen(false)} className="absolute w-full bottom-0 left-0" ref={ref}>
          {children}
        </div>
      </div>
    </div>
  );
}
