'use client'
import {clsx} from "clsx";
import {createRef, useEffect, useRef} from "react";

type Props = {
    isFirstSelected: boolean;
    setIsFirstSelected: (isFirstSelected: boolean) => void;
    firstButtonText: string;
    secondButtonText: string;
};

export const Toggle = ({
                           isFirstSelected,
                           setIsFirstSelected,
                           firstButtonText,
                           secondButtonText,
                       }: Props) => {

    const buttons = useRef([
        {
            text: firstButtonText,
            onClick: () => setIsFirstSelected(true),
            selected: (isFirstSelected: boolean) => isFirstSelected,
        },
        {
            text: secondButtonText,
            onClick: () => setIsFirstSelected(false),
            selected: (isFirstSelected: boolean) => !isFirstSelected,
        },
    ]);


    return (
        <div
            className="bg-[var(--background-secondary)] relative border border-[var(--border-placeholder)] rounded-full text-16 text-[var(--text-main)] flex">
            {buttons.current.map((button, index) => (
                <button
                    key={index}
                    className={clsx(
                        "h-47 w-1/2 transition-colors bg-transparent z-20 relative duration-500",
                        {
                            "pointer-events-none":
                                button.selected(isFirstSelected),
                        }
                    )}
                    onClick={button.onClick}
                >

                    <span className={clsx('tracking-wide')}>{button.text}</span>


                </button>
            ))}
            <div className={'flex w-full h-full center items-center pointer-events-none z-30 relative'}>
                {buttons.current.map((button, index) => (<span key={index}
                    className={clsx(' font-extrabold text-[var(--text-button-main)] tracking-tight transition-opacity duration-500 w-1/2 flex items-center justify-center', {"opacity-0": !button.selected(isFirstSelected)})}>{button.text}</span>))}

            </div>
            <div
                className={clsx(
                    "absolute top-3 left-3 h-41 w-[calc(50%-3px)] bg-[var(--main-color-light)] transition-transform rounded-full duration-500 z-[25] overflow-hidden",
                    {"translate-x-[100%] ": !isFirstSelected}
                )}
            >
            </div>
        </div>
    );
};
