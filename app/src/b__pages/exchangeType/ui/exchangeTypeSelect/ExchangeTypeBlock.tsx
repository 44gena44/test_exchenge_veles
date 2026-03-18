import React, { memo } from "react";
import ExchangeTypeItem from "./ExchangeTypeItem";
import { ExchangeCurrencyPosition } from "@/shared/model/exchange";
import { ExchangeTypeButton } from "@/d__features/exchange/model";

export type ExchangeTypeBlockProps = {
  title: string;
  buttons: ExchangeTypeButton[];
  position: ExchangeCurrencyPosition;
};

const ExchangeTypeBlock: React.FC<ExchangeTypeBlockProps> = memo(
  ({ title, buttons, position }) => {

    return (
      <div className="relative flex flex-col items-center text-[var(--text-main)] pt-10 pb-20">
        <h2 className=" w-full font-medium text-16 leading-normal mb-26 pl-7">
          {title}
        </h2>
          <div className={'flex flex-col gap-7 w-full'}>
              { buttons?.map((button) => (
                  <ExchangeTypeItem
                      {...button}
                      key={button.type}
                      position={position}
                  ></ExchangeTypeItem>
              ))}
          </div>

      </div>
    );
  }
);

ExchangeTypeBlock.displayName = "ExchangeTypeBlock";

export default ExchangeTypeBlock;
