'use server';

// Типы для пользователя Telegram
export interface TelegramUser {
    id: number;
    is_bot?: boolean;
    first_name?: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
}

// Типы для данных Telegram WebApp
export interface TelegramWebAppData {
    query_id?: string;
    user?: TelegramUser;
    receiver?: TelegramUser;
    chat?: any;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
}

// Результат валидации
export interface TelegramWebAppValidationResult {
    isValid: boolean;
    user?: TelegramUser;
    error?: string;
    queryId?: string;
}