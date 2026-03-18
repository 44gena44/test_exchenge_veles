type Props<T> = {
  array: Array<T>;
  propertyName: keyof T;
  direction?: "DESC" | "ASC";
};
export const sortArrayByProperty = <T>({
  array,
  propertyName,
  direction = "ASC",
}: Props<T>) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  return [...array].sort((a, b) => {
    const aValue = a[propertyName] ?? 0;
    const bValue = b[propertyName] ?? 0;

    if (aValue === bValue) return 0;

    const comparison = aValue > bValue ? 1 : -1;

    return direction === "ASC" ? comparison : -comparison;
  });
};
