// schemas/formSchema.ts
import { z } from "zod";

export const formValidationSchema = z.object({
  email: z.string().email("Введите корректный email"),
  name: z
    .string()
    .min(1, "Поле обязательно")
    .refine((val) => val.trim().split(/\s+/).length >= 2, {
      message: "Введите минимум два слова",
    }),
  phone: z
    .string()
    .transform((val: string) => val.replace(/\s+/g, "")) // удаляем пробелы
    .refine(
      (val) => /^[+\d-]+$/.test(val), // разрешаем +, цифры и -
      { message: "Допустимы только цифры, символы + и -" }
    )
    .refine(
      (val) => val.replace(/[^0-9]/g, "").length >= 11, // минимум 10 цифр
      { message: "Телефон должен содержать минимум 11 цифр" }
    ),
});


