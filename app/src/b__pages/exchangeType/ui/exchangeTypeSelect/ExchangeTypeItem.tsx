import React, {memo, ReactNode} from "react";
import {useAppDispatch, useAppSelector} from "@/shared/model/store/hooks";
import clsx from "clsx";
import {SignIcon} from "@/shared/ui";
import {
    ExchangeTypeButton,
    setSelectedCurrencyBuyType,
    setSelectedCurrencySellType
} from "@/d__features/exchange/model";

const ExchangeTypeItem: React.FC<ExchangeTypeButton> = memo(
    ({icon, name, type, position}) => {
        const dispatch = useAppDispatch();

        const isSelected = useAppSelector((state) => {
            if (position === "received")
                return state.exchange.selectedCurrencyBuyType === type;
            else return state.exchange.selectedCurrencySellType === type;
        });
        const onClick = () => {
            if (position === "received") dispatch(setSelectedCurrencyBuyType(type));
            else dispatch(setSelectedCurrencySellType(type));
        };
        return (
            <button
                style={{background: 'var(--background-button-gradient)'}}
                className={clsx(
                    "h-46 justify-between relative w-full duration-500 transition-colors px-21 rounded-[21px] border overflow-hidden border-[var(--border-placeholder)]",
                    {
                        " pointer-events-none ": isSelected,
                    }
                )}
                onClick={onClick}
            >
                <div
                    className={clsx('absolute top-0 left-0 w-full h-full bg-[var(--main-color-light)] transition-opacity duration-500 pointer-events-none z-10', {'opacity-0': !isSelected})}></div>
                <div className="flex items-center gap-11 relative z-20">
                    {React.cloneElement(icon, {
                        color: isSelected ? "var(--text-button-main)" : 'var(--main-color)',
                        className: clsx(icon.props.className)
                    })}
                    <span
                        className={clsx("text-16 leading-normal text-[var(--text-main)] transition-colors duration-500", {"[&]:text-[var(--text-button-main)]": isSelected})}>{name}</span>
                </div>
            </button>
        );
    }
);

ExchangeTypeItem.displayName = "ExchangeTypeItem";

export default ExchangeTypeItem;
