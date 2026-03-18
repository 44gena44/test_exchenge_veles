
import {useAppSelector} from "@/shared/model/store";
import {useRouter} from "next/navigation";
import {ReactNode, useMemo} from "react";

type Props = {
    policyUrl: string | undefined;
    termsUrl: string | undefined;
};

export type AdditionalButton = {
    children: ReactNode;
    onClick: () => void;
    trackingLabel: string;
    icon: string;
};

export const useAdditionalSectionList = ({policyUrl, termsUrl}: Props) => {
    const router = useRouter();

    const toProfilePage = () => {
        router.push("/profile");
    };

    const toFaqPage = () => {
        router.push("/faq");
    };

    const openUrl = (url?: string) => window.open(url, "_blank");

    const sessionId = useAppSelector((state) => state.user.sessionId);

    const additionalSectionListItems = useMemo<AdditionalButton[]>(
        () => [

            {
                children: "Частые вопросы",
                onClick: () => {
                    toFaqPage();
                },
                trackingLabel: "Частые вопросы",
                icon: '/images/icons/questions.svg'
            },
            ...(termsUrl
                ? [
                    {
                        children: "Соглашение",
                        onClick: () => {
                            openUrl(termsUrl);
                        },
                        trackingLabel: "Соглашение",
                        icon: '/images/icons/checkbox.svg'

                    },
                ]
                : []),
            ...(policyUrl
                ? [
                    {
                        children: "Политика AML",
                        onClick: () => {
                            openUrl(policyUrl);
                        },
                        trackingLabel: "Политика AML",
                        icon: '/images/icons/shield_sign.svg'

                    },
                ]
                : []),
            {
                children: "Профиль",
                onClick: () => {
                    toProfilePage();
                },
                trackingLabel: "Профиль",
                icon: '/images/icons/person.svg'
            },

        ],
        [policyUrl, termsUrl, sessionId]
    );

    return {
        additionalSectionListItems,
    };
};
