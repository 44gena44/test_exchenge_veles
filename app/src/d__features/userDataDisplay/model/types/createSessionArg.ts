export type CreateSessionArg = {
  user_id: number;
  // Не отправляется на backend, используется только для валидации Telegram
  initData?: string;
};
