'use server';

import { validateAndGetUserId } from '@/shared/lib/telegram/validateTelegramWebApp';

/**
 * Аутентификация через Telegram WebApp
 * Эта функция должна вызываться в начале каждого API действия
 */
export async function authenticateUser(initData: string | undefined | null, userId: number | undefined | null) {

    if (process.env.NODE_ENV === 'development') return

    if (!initData) {
        throw new Error("Telegram WebApp initData required");
    }

    if (!userId) {
        throw new Error("Telegram User Id required");
    }
    // Валидируем initData и получаем userId
    const result = await validateAndGetUserId(initData);

    if (!result.isValid || !result.userId) {
        throw new Error(`Authentication failed: ${result.error}`);
    }

    if (result.userId !== userId) {
        throw new Error("User ID mismatch");
    }
}

/**
 * Обновленная версия createTrackingSessionAction с Telegram верификацией
 */
// legacy wrappers оставлены для совместимости, но не используются
