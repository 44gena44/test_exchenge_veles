import {VideoModal} from "@/c__widgets/videoModal/ui";
import {ClockIcon, CopyIcon, SignIcon, Button} from "@/shared/ui";
import {useRouter} from "next/navigation";
import {ReactNode, useState} from "react";
import {Notification} from "@/shared/ui/form/Notification";

type Props = {
    id: string | number | null | undefined;
    video?: string | undefined;
    children?: ReactNode;
};

export const RequestResult = ({id, video, children}: Props) => {
    const router = useRouter();

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard?.writeText(id?.toString() || "");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGoHome = () => {
        router.push("/obmennik");
    };

    const handleGoChat = () => {
        window.Telegram?.WebApp.close();
    };

    return (
        <div className="container h-full  pt-10">
            <div className="w-full mx-auto flex flex-col h-full justify-between">
                <div className="flex flex-col gap-13">

                    <div
                        className="flex items-center gap-21 rounded-[21px] bg-[var(--background-secondary)] border border-[var(--border-placeholder)] py-20 px-23">
                        <img className={'w-69 h-69 animate-spin [animation-duration:10s]'} src="/images/icons/process.svg" alt=""/>
                        <div className={'flex flex-col gap-5 justify-between'}>
                            <span className={'leading-[111%] text-16 text-[var(--text-main)]'}>Уже работаем над <br/>вашей заявкой</span>
                            <span className={'text-13 text-[var(--text-light)] leading-[125%]'}>свяжемся с&nbsp;вами <br/>в&nbsp;течение 15 минут</span>
                        </div>
                    </div>
                    <div
                        className="flex items-center justify-between py-13 px-21 rounded-[21px] bg-[var(--background-secondary)] border border-[var(--border-placeholder)]">
                        <div className="text-16 text-[var(--text-light)]">Номер заявки #{id}</div>

                        <button
                            data-tracking-label="Скопировать номер заявки"
                            onClick={handleCopy}
                            className="p-1 flex items-center gap-7"
                        >
                            <CopyIcon className="w-15 h-15 translate-y-1 shrink-0"/>
                        </button>
                    </div>
                </div>
                <div className="flex flex-col flex-grow gap-32 justify-between">
                    <Notification
                        isVisible={copied}
                        message="номер заявки скопирован"
                        icon={<SignIcon className="w-15 h-15 translate-y-2"/>}
                        className={'[&]:bg-transparent'}
                    />
                    <div className="flex flex-col gap-12">
                        <Button
                            trackingLabel="В чат с оператором"
                            onClick={handleGoChat}
                            type="primary"
                            className="w-full text-15 py-15"
                        >
                            В чат с оператором
                        </Button>
                        <Button
                            trackingLabel="В главное меню"
                            onClick={handleGoHome}
                            type="secondary"
                            className="w-full text-15 py-15"
                        >
                            В главное меню
                        </Button>
                    </div>
                </div>
            </div>
            {video && <VideoModal src={video}></VideoModal>}
        </div>
    );
};
