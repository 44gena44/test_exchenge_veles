// intervalStorage.ts
const intervals = new Map<string, NodeJS.Timeout>();

export const setMyInterval = (
  callback: () => void,
  delay: number,
  key: string
) => {

  clearMyInterval(key); // очищаем старый, если был

  const id = setInterval(callback, delay);
  intervals.set(key, id);
};

export const clearMyInterval = (key: string) => {
  const existing = intervals.get(key);
  if (existing) {
    clearInterval(existing);
    intervals.delete(key);
  }
};

// Опционально: очистка при unload (чтобы не было утечек)
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    intervals.forEach((id) => clearInterval(id));
    intervals.clear();
  });
}