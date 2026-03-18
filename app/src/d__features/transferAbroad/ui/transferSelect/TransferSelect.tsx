import {createRef, memo, ReactElement, ReactNode, useEffect, useMemo, useState} from "react";
import {TransferSelectItem} from "./TransferSelectItem";
import {useAppDispatch, useAppSelector} from "@/shared/model/store";
import {sortArrayByProperty, useServerAction} from "@/shared/lib";
import {
    setGetTransferOptionsLoading,
    setSelectedTranserTypeOptionId,
} from "../../model";
import {getTransferOptionsAction} from "../../api";
import {TransferOption} from "@/shared/model/api";
import {useTrackUserAction} from "@/d__features/userDataDisplay/lib";
import clsx from "clsx";
import PlanetCursorIcon from "@/shared/ui/icon/PlanetCursorIcon";
import BlankIcon from "@/shared/ui/icon/BlankIcon";
import {CardIcon} from "@/shared/ui";
import AddCommentIcon from "@/shared/ui/icon/AddCommentIcon";
import {SvgIcon} from "@/shared/model/icon";

const icons: {[key: string]: ReactElement<SvgIcon>} = {
    4: <PlanetCursorIcon className={'w-21 h-21'}></PlanetCursorIcon>,
    5: <BlankIcon className={'w-21 h-21'}></BlankIcon>,
    1: <CardIcon className={'w-17 h-17'}></CardIcon>,
    2: <AddCommentIcon className={'w-19 h-19 translate-y-2' }></AddCommentIcon>,
    3: <BlankIcon className={'w-21 h-21'}></BlankIcon>,
}

export const TransferSelect = memo(() => {
    const [getTransferOptions, getTransferOptionsResponse] = useServerAction({
        action: getTransferOptionsAction,
        loadingAction: setGetTransferOptionsLoading,
    });

    useEffect(() => {
        console.log(getTransferOptionsResponse)
    }, [getTransferOptionsResponse]);

    useEffect(() => {
        getTransferOptions(undefined);
    }, []);

    const parsedData = useMemo(() => {
        const copiedObject = {...getTransferOptionsResponse};

        const categories: ("individual" | "legal_entity")[] = [
            "individual",
            "legal_entity",
        ];
        categories.forEach((category) => {
            if (
                copiedObject &&
                copiedObject[category] &&
                Array.isArray(copiedObject[category])
            )
                copiedObject[category] = sortArrayByProperty({
                    array: copiedObject[category],
                    propertyName: "weight",
                });
        });

        return copiedObject;
    }, [getTransferOptionsResponse]);

    const selectedTranserTypeOptionId = useAppSelector(
        (state) => state.transferAbroad.selectedTranserTypeOptionId
    );

    const transferTypeCategory = useAppSelector(
        (state) => state.transferAbroad.transferTypeCategory
    );


    const sessionId = useAppSelector(state => state.user.sessionId)


    const dispatch = useAppDispatch();

    const {trackUserAction} = useTrackUserAction()

    const handleSelect = (type: TransferOption) => {
        dispatch(setSelectedTranserTypeOptionId(type.id));
    };

    useEffect(() => {
        if (
            parsedData &&
            transferTypeCategory &&
            parsedData[transferTypeCategory] &&
            parsedData[transferTypeCategory][0]
        ) {
            const id = parsedData[transferTypeCategory][0].id;
            dispatch(setSelectedTranserTypeOptionId(id));
        }
    }, [parsedData, transferTypeCategory]);


    useEffect(() => {
        if (sessionId && selectedTranserTypeOptionId && getTransferOptionsResponse) {
            const selectedTransferTypeOption = getTransferOptionsResponse[transferTypeCategory]?.find(option => option.id === selectedTranserTypeOptionId)
            if (selectedTransferTypeOption)
                trackUserAction(`Выбран тип перевода за рубеж '${selectedTransferTypeOption.name}'`)
        }

    }, [selectedTranserTypeOptionId, sessionId])

    const [height, setHeight] = useState<'auto' | number>('auto')

    const individualBlockRef = createRef<HTMLDivElement>()
    const legalBlockRef = createRef<HTMLDivElement>()
    useEffect(() => {

        if (transferTypeCategory === 'legal_entity') {
            const heightBlock = legalBlockRef.current?.clientHeight
            if (heightBlock)
                setHeight(heightBlock+100)
        } else {
            const heightBlock = individualBlockRef.current?.clientHeight
            if (heightBlock)
                setHeight(heightBlock+100)
        }
    }, [transferTypeCategory,getTransferOptionsResponse]);


    return (
        <div style={{height}} className={'mx-[-14px] relative overflow-x-hidden transition-[height] duration-500'}>
            <div
                className={clsx('absolute top-0 left-0 w-[200%] transition-transform duration-500 flex ', {'-translate-x-1/2': transferTypeCategory === 'individual'})}>
                <div ref={legalBlockRef} className={'container w-1/2'}>
                    <div
                        className="flex flex-col gap-8">
                        {getTransferOptionsResponse?.legal_entity?.map((type) => (
                            <TransferSelectItem
                                key={type.id}
                                iconElement={icons[type.id.toString()]}
                                {...type}
                                isSelected={type.id === selectedTranserTypeOptionId}
                                onClick={() => handleSelect(type)}
                            ></TransferSelectItem>
                        ))}
                    </div>
                </div>
                <div ref={individualBlockRef} className={'container w-1/2'}>
                    <div
                        className="flex flex-col gap-8">
                        {getTransferOptionsResponse?.individual?.map((type) => (
                            <TransferSelectItem
                                key={type.id}
                                {...type}
                                iconElement={icons[type.id.toString()]}
                                isSelected={type.id === selectedTranserTypeOptionId}
                                onClick={() => handleSelect(type)}
                            ></TransferSelectItem>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

TransferSelect.displayName = "TransferSelect";
