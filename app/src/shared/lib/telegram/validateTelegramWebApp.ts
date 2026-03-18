'use server';

import crypto from 'crypto'

import type { TelegramUser, TelegramWebAppData, TelegramWebAppValidationResult } from './types';


export async function validateTelegramWebAppData(
    initDataString: string,
    botToken: string
): Promise<TelegramWebAppValidationResult> {
    try {
        // === 1. Парсим initData, НО НЕ ПАРСИМ user в объект ===
        const params = new URLSearchParams(initDataString);
        const data: Record<string, string> = {};

        for (const [key, value] of params) {
            // Все значения декодируем, но оставляем как строки
            data[key] = decodeURIComponent(value);
        }

        // === 2. Проверяем обязательные поля ===
        if (!data.auth_date || !data.hash) {
            return { isValid: false, error: 'Missing required fields (auth_date or hash)' };
        }

        // === 3. Проверяем свежесть данных (не старше 24 часов) ===
        const currentTime = Math.floor(Date.now() / 1000);
        const authAge = currentTime - Number(data.auth_date);
        const maxAge = 24 * 60 * 60;
        if (authAge > maxAge || authAge < 0) {
            return { isValid: false, error: 'Auth data too old or from future' };
        }

        // === 4. Вычисляем secret_key по правилам Telegram ===
        const secretKey = crypto
            .createHmac('sha256', 'WebAppData')
            .update(botToken)
            .digest('hex');

        // === 5. Формируем data_check_string ===
        const sortedKeys = Object.keys(data)
            .filter(key => key !== 'hash')
            .sort();

        const dataCheckString = sortedKeys
            .map(key => `${key}=${data[key]}`)
            .join('\n');

        // === 6. Вычисляем expected hash ===
        const expectedHash = crypto
            .createHmac('sha256', Buffer.from(secretKey, 'hex'))
            .update(dataCheckString)
            .digest('hex');

        // === 7. Сравниваем хеши ===
        if (expectedHash !== data.hash.toLowerCase()) { // Telegram отправляет hash в lowercase
            return { isValid: false, error: 'Invalid hash signature' };
        }

        // === 8. Только ПОСЛЕ успешной проверки парсим user в объект ===
        let parsedUser: TelegramUser | null = null;
        if (data.user) {
            try {
                parsedUser = JSON.parse(data.user) as TelegramUser;
            } catch (e) {
                return { isValid: false, error: 'Failed to parse user data' };
            }
        }

        if (!parsedUser) {
            return { isValid: false, error: 'No user data in initData' };
        }

        // === 9. Всё прошло успешно ===
        return {
            isValid: true,
            user: parsedUser,
            queryId: data.query_id ?? undefined // query_id может отсутствовать
        };

    } catch (error) {
        console.error('Telegram validation error:', error);
        return { isValid: false, error: `Validation error: ${error instanceof Error ? error.message : String(error)}` };
    }
}

export async function verifyTelegramWebApp(
    initData: string,
    botToken?: string
): Promise<TelegramWebAppValidationResult> {
    // Получаем токен из переменных окружения или параметра
    const token = botToken || process.env.TELEGRAM_BOT_TOKEN;

    if (!token) {
        return { isValid: false, error: 'Bot token not configured. Set TELEGRAM_BOT_TOKEN env variable.' };
    }

    return validateTelegramWebAppData(initData, token);
}

/**
 * Валидация с автоматическим получением userId
 */
export async function validateAndGetUserId(
    initData: string,
    botToken?: string
): Promise<{ isValid: boolean; userId?: number; error?: string }> {
    const result = await verifyTelegramWebApp(initData, botToken);

    if (!result.isValid || !result.user) {
        return { isValid: false, error: result.error };
    }

    return {
        isValid: true,
        userId: result.user.id
    };
}

/**
 * Middleware-функция для использования в API actions
 * Защищает от прямых вызовов без Telegram WebApp
 */
