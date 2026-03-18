export const roundTo8 = (num: number | null | undefined): number | null => {
  if (num === null || num === undefined) return null;
  return Number(num.toFixed(8));
}; 