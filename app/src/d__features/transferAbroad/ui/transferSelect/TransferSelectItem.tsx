import {typograf} from "@/shared/lib";
import {SignIcon} from "@/shared/ui";
import {SvgFromUrl} from "@/shared/ui/icon/SvgFromUrl";
import clsx from "clsx";
import React, {createRef, memo, ReactElement, ReactNode, useEffect, useState} from "react";
import {SvgIcon} from "@/shared/model/icon";

export type TransferType = {
    id: number;
    icon: string;
    name: string;
    description: string;
};

type Props = TransferType & {
    iconClassName?: string;
    className?: string;
    isSelected: boolean;
    onClick: () => void;
    iconElement: ReactElement<SvgIcon>
};

export const TransferSelectItem = memo(
    ({className, iconClassName, name, description, isSelected, onClick, icon, iconElement}: Props) => {
        const [wrapperElementHeight, setWrapperElementHeight] =
            useState<string>("0");
        const descriptionElement = createRef<HTMLDivElement>();

        useEffect(() => {
            if (descriptionElement.current) {
                if (isSelected) {
                    const wrapperHeight = descriptionElement.current?.clientHeight + "px";
                    setWrapperElementHeight(wrapperHeight);
                } else {
                    setWrapperElementHeight("0");
                }
            }
        }, [isSelected]);

        return (
            <div
                onClick={onClick}
                className={clsx("px-[17px] pt-[11px] pb-3 rounded-[24px] w-full border transition-colors duration-500", {
                    "bg-[var(--background-secondary)] border-[var(--border-placeholder)]": !isSelected,
                    "bg-[var(--main-color-light)] border-[var(--main-color)]": isSelected,

                })}
            >
                <div className="pb-[10px] flex items-center justify-between">
                    <div className={clsx("flex items-center gap-11", className)}>

                        {React.cloneElement(iconElement, {
                            className: clsx(iconElement.props.className, '[&_path]:transition-[fill]  [&_path]:duration-500'),
                            color: isSelected ? 'var(--text-button-main)' : 'var(--main-color)'
                        })}
                        <span className={clsx("text-16 leading-[107%] transition-colors duration-500", {
                            'text-[var(--text-button-main)]': isSelected,
                            'text-[var(--text-main)]': !isSelected
                        })}>
              {name}
            </span>
                    </div>

                </div>
                <div
                    className="relative duration-500 transition-all overflow-hidden"
                    style={{height: wrapperElementHeight}}
                >
                    <div
                        className={clsx("pb-[14px] pt-[2px] absolute button-0 left-0 text-13 leading-[107%] transition-colors duration-500", {
                            'text-[var(--text-button-main)]': isSelected,
                            'text-[var(--text-main)]': !isSelected
                        })}
                        ref={descriptionElement}
                        dangerouslySetInnerHTML={{__html: typograf(description)}}
                    ></div>
                </div>
            </div>
        );
    }
);

TransferSelectItem.displayName = "TransferSelectItem";
