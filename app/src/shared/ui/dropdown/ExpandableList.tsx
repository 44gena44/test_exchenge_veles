"use client";
import { ReactNode } from "react";
import Button from "./DropdownTrigger";
import ExpandableElement from "./ExpandableElement";
import { useTrackUserAction } from "@/d__features/userDataDisplay/lib";

type ExpandableListProps = {
  items: Array<{
    children: ReactNode;
    onClick: () => void;
    trackingLabel?: string;
  }>;
  title: string;
  handleVisibilityChange?: (isOpen: boolean) => void;
};

export default function ExpandableList({
  items,
  title,
  handleVisibilityChange,
}: ExpandableListProps) {
  return (
    <>
      <ExpandableElement
        triggerRender={({ onClick, isOpen }) => (
          <Button
            onClick={() => {
              onClick();
              if (handleVisibilityChange) handleVisibilityChange(!isOpen);
            }}
            arrowPosition={isOpen ? "bottom" : "top"}
            arrow
          >
            {title}
          </Button>
        )}
      >
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index}>
              <Button
                trackingLabel={item.trackingLabel}
                border
                onClick={item.onClick}
              >
                {item.children}
              </Button>
            </li>
          ))}
        </ul>
      </ExpandableElement>
    </>
  );
}
