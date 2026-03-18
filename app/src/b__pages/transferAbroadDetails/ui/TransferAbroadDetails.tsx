"use client";

import {transferIdInputPathReferrencies} from "@/d__features/transferAbroad/config";
import ProcessLayout from "@/c__widgets/processLayout/ui";
import {typograf, valueMask} from "@/shared/lib";
import {
    abroadTransferDetailsSelector,
    useAppSelector,
} from "@/shared/model/store";
import {Details, DetailsDescription, SectionHeading} from "@/shared/ui";
import {useMemo} from "react";
import {FtaDetails} from "@/d__features/transferAbroad/ui";
import {CardsTransferDetails} from "@/d__features/transferAbroad/ui";
import {useTransferInputDataSubmit} from "@/d__features/transferAbroad/lib";

export const TransferAbroadDetails = () => {

    const {
        selectedTranserTypeOptionId,
        currency,
        amount,
        bank,
        cardNumber,
        countryName,
        taskDescription,
        platform,
    } = useAppSelector(abroadTransferDetailsSelector);

    const transferType = useMemo(
        () =>
            selectedTranserTypeOptionId
                ? transferIdInputPathReferrencies[selectedTranserTypeOptionId]
                : null,
        [selectedTranserTypeOptionId]
    );

    const [handleSubmit] = useTransferInputDataSubmit(transferType);

    return (
        <ProcessLayout
            onMainButtonClick={handleSubmit}
            buttonText="Оставить заявку"
        >
            <div>
                <SectionHeading title={'Детали операции'}></SectionHeading>
                <Details
                    currency={{
                        icon: currency?.icon || "",
                        name: currency?.name || "",
                        description: "перевод"
                    }}
                    currencyAmount={valueMask(amount)}
                >
                    {taskDescription && (
                        <DetailsDescription
                            title="Описание задачи"
                            description={typograf(taskDescription)}
                            descriptionClassName="leading-[148%] text-16"
                        />
                    )}
                    {transferType === "fta" && <FtaDetails/>}
                    {transferType === "cards" && (
                        <CardsTransferDetails cardNumber={cardNumber}/>
                    )}
                </Details>
            </div>

        </ProcessLayout>
    );
};
