import React, {memo} from "react";
import StoryCryptoData, {StoryCryptoDataProps} from "./StoryCryptoData";
import {useRouter} from "next/navigation";
import {valueMask} from "@/shared/lib/string/valueMask";
import {formatDate} from "@/shared/lib/string/formatDate";
import {setRequestDetails} from "@/shared/model/store/reducers/requestDetailsReducer";
import {useAppDispatch} from "@/shared/model/store/hooks";
import {roundTo8} from "@/shared/lib/number/roundTo8";
import {ArrowRightIcon, SignIcon} from "@/shared/ui";
import {ExchangeRequest} from "@/shared/model/api";

export type RequestStoryItemProps = {
    data: ExchangeRequest;
};

const RequestStoryItem: React.FC<RequestStoryItemProps> = memo(({data}) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const goToRequestDetails = () => {

        dispatch(setRequestDetails(data));

        router.push("/profile/request");
    };
    return (
        <button data-tracking-label={`Превью операции: Заявка #${data.id}`} onClick={goToRequestDetails}
                className="mb-12 w-full text-[var(--text-main)]">

            <div
                className="bg-[var(--background-secondary)] border border-[var(--border-placeholder)] rounded-[21px] px-17 py-23 flex flex-col gap-14">
                <div className={'flex justify-between items-center'}>
                    <span className={'text-13 text-[var(--text-light)]'}>{formatDate(data.date)}</span>
                    {data.status === 'Выполнено' && <div className={'flex items-center gap-[5px]'}>
                        <span className={'text-13 text-primary'}>Выполнено</span>
                        <SignIcon color="var(--main-color)" className={'w-16 h-16 translate-y-1'}></SignIcon>
                    </div>}
                </div>
                <StoryCryptoData
                    position={'given'}
                    name={data.currency_give?.name || ''}
                    value={valueMask(roundTo8(data.currency_give?.amount || 0))}
                    icon={data.currency_give?.icon || ''}
                ></StoryCryptoData>
                <StoryCryptoData
                    position={'received'}
                    name={data.currency_get?.name || ''}
                    value={valueMask(roundTo8(data.currency_get?.amount || 0))}
                    icon={data.currency_get?.icon || ''}
                ></StoryCryptoData>
            </div>

        </button>
    );
});

RequestStoryItem.displayName = "RequestStoryItem";

export default RequestStoryItem;
