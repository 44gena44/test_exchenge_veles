import { roundTo8 } from "../../../../shared/lib/number/roundTo8";
import { Rate } from "../../../../shared/model/api/exchange/types";

export const calculateInputAmountBasedOnAnotherOne = (
  amount: number | null,
  rate: Rate | null | undefined,
  position: "given" | "received"
): number | null => {
  if (!amount || !rate) return null;

  const { course } = rate;
  const actualRate = course;

  const res = position === "given" ? amount * actualRate : amount / actualRate;
  return roundTo8(res);
};