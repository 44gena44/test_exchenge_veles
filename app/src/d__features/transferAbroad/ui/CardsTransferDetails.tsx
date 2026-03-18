import { DetailsDescription } from "@/shared/ui";

type Props = {
  cardNumber: string | null;
};

export const CardsTransferDetails = ({ cardNumber }: Props) => {
  return (
    cardNumber && (
      <DetailsDescription
        title="Карта получения"
        description={cardNumber}
        descriptionClassName="tracking-[4px]"
      />
    )
  );
};
