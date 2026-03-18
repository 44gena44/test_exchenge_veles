import z from "zod";
import { formValidationSchema } from "./formValidationSchema";

export const validateEmail = (email: string): { error: string } => {
    try {
      // Используем только часть схемы для email
      const emailSchema = formValidationSchema.shape.email;
      emailSchema.parse(email); // Проверяем email
      return { error: "" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return { error: error.errors[0].message };
      }
      return { error: "Неизвестная ошибка" };
    }
  };
  