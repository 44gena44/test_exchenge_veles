import { HeadingRate } from "@/shared/ui";

type CalculateRateProps = {
  course: number;
  currencyGive: string;
  currencyGet: string;
}

export const calculateRate = ({
  course,
  currencyGive,
  currencyGet,
}: CalculateRateProps): HeadingRate | null => {

  const baseRate = course;
  if (!Number.isFinite(baseRate) || baseRate <= 0) {
    return null;
  }

  if (baseRate < 1) {
    return {
      from: {
        value: 1,
        name: currencyGet,
      },
      to: {
        value: Number((1 / baseRate).toFixed(2)),
        name: currencyGive,
      },
    };
  }

  return {
    from: {
      value: 1,
      name: currencyGive,
    },
    to: {
      value: baseRate,
      name: currencyGet,
    },
  };
}; 
