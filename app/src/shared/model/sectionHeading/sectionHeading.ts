import { HeadingRate } from "@/shared/ui";

export type SectionHeading = {
    title: string;
    rate?: HeadingRate | undefined | null;
    minValue?: number | undefined | null;
    error?: boolean;
    note?: React.ReactNode;
    conditionText?: string;
}