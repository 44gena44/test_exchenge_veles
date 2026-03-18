interface TelegramWebApp {
    ready: () => void;
    expand: () => void;
    close: () => void;
      onEvent: (arg1,arg2) => void;
    offEvent: (arg1,arg2) => void;
    initData: string;
    initDataUnsafe: Record<string, any>;
    version: string;
    platform: string;
       
  }
  
  interface Telegram {
    WebApp: TelegramWebApp;
  }
  
  declare global {
    interface Window {
      Telegram?: Telegram;
    }
  }
  
  export {};
