import { Bitcoin, RefreshCw, HelpCircle, Banknote, Zap, Globe, CreditCard, ShieldCheck, Coins, Landmark } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Currency = {
  id: string;
  name: string;
  icon: LucideIcon;
};

export const currencies: Currency[] = [
  { id: 'USDT', name: 'Tether', icon: RefreshCw },
  { id: 'RUB', name: 'Russian Ruble', icon: Banknote },
];

export const instantExchangeCurrencies: Currency[] = [
  { id: 'USDT', name: 'USDT', icon: RefreshCw },
  { id: 'RUB', name: 'RUB', icon: Banknote },
];

export const exchangeRates = [
  { pair: 'BTC/USDT', price: '68,543.21', change: '+1.25%', trend: [3, 4, 3.5, 5, 6, 5, 7] },
  { pair: 'ETH/USDT', price: '3,567.89', change: '-0.50%', trend: [6, 5, 5.5, 4, 3, 3.5, 2] },
  { pair: 'TON/USDT', price: '7.82', change: '+3.10%', trend: [2, 3, 4, 5, 6.5, 7, 7.8] },
];

export const exchangeRatesCarousel = [
  {
    title: "Курс USDT",
    description: 'Классический обмен',
    buy: '84.44',
    sell: '78.44',
  },
  {
    title: "Курс USDT",
    description: 'Наличный обмен',
    buy: '82.12',
    sell: '77.61',
  },
  {
    title: "Курс USDT",
    description: 'Мгновенная покупка USDT',
    buy: '84.51',
    sell: null,
  },
];

export type Transaction = {
  id: number;
  type: string;
  date: string;
  amount: string;
  status: 'Выполнено' | 'В обработке' | 'Отменено' | 'Ожидает оплаты';
};

export const transactionHistory: Transaction[] = [
  { id: 2, type: 'Покупка USDT', date: '2024-05-19 10:00', amount: '+1000 USDT', status: 'Выполнено' },
  { id: 3, type: 'Покупка USDT', date: '2024-05-18 22:15', amount: '+1000 USDT', status: 'Ожидает оплаты' },
  { id: 5, type: 'Покупка USDT', date: '2024-05-16 11:45', amount: '+1000 USDT', status: 'В обработке' },
  { id: 7, type: 'Покупка USDT', date: '2024-05-22 11:00', amount: '+1000 USDT', status: 'Выполнено' },
  { id: 8, type: 'Покупка USDT', date: '2024-05-23 16:20', amount: '+1000 USDT', status: 'Отменено' },
];

export const faqData = [
    {
        question: 'Как купить/продать USDT?',
        answer: 'Вы можете легко купить или продать USDT на странице "Обмен". Просто выберите USDT и валюту, которую хотите обменять, введите сумму и подтвердите операцию. Наша платформа найдет для вас лучшее предложение.'
    },
    {
        question: 'Все про международные платежи',
        answer: 'Международные платежи позволяют отправлять средства за границу с минимальными комиссиями. Выберите опцию "Международные платежи", укажите реквизиты получателя и сумму. Платеж будет обработан в кратчайшие сроки.'
    },
    {
        question: 'Как проходит обмен?',
        answer: 'Обмен происходит мгновенно. После подтверждения операции наша система автоматически исполняет ваш ордер по текущему рыночному курсу. Средства зачисляются на ваш баланс в течение нескольких секунд.'
    },
    {
        question: 'Комиссии',
        answer: 'Мы стремимся предлагать самые низкие комиссии на рынке. Комиссия за обмен составляет 0.1% от суммы сделки. Для международных платежей комиссия зависит от страны получателя и выбранного способа перевода.'
    },
    {
        question: 'Безопасность',
        answer: 'Безопасность ваших средств - наш главный приоритет. Мы используем передовые технологии шифрования, холодное хранение активов и двухфакторную аутентификацию для защиты вашего аккаунта.'
    }
];

export const quickActions = [
    { title: 'Классический обмен', icon: Landmark, href: '/exchange/type?direction=BANK_COIN', color: '#a3e635'},
    { title: 'Наличный обмен', icon: Coins, href: '/exchange/type?direction=COIN_CASH', color: '#f59e0b'},
    { title: 'Международные платежи', icon: Globe, href: '/transfer-abroad/type', color: '#60a5fa'},
    { title: 'Мгновенная покупка USDT', icon: Zap, href: '/exchange/instant', color: '#f87171'},
]

export const popularServices = [
    { id: 'instant-exchange', title: 'Безналичный обмен', description: 'Обмен без лимитов и ограничений', icon: Zap, href: '/exchange/card-exchange', color: '#facc15' },
    { id: 'international-payments', title: 'Наличный обмен', description: 'Обмен наличных в вашем городе', icon: Globe, href: '/exchange/type?direction=COIN_CASH', color: '#60a5fa' },
    { id: 'p2p-trading', title: 'Международные платежи', description: 'Переводы по всему миру', icon: RefreshCw, href: '/transfer-abroad/type', color: '#a3e635' },
]

export const newsItems = [
    {
        title: "Бонус за рефералов",
        description: "Получайте до 30% с обменов друзей",
        tag: "Выгодно"
    },
    {
        title: "Новые возможности",
        description: "Добавили возможность безопасного мгновенного обмена",
        tag: "Новость"
    },
    {
        title: "Обновление безопасности",
        description: "Ваши средства теперь еще под большей защитой",
        tag: "Важно"
    },
]

export const instantExchangeRate = 98.5;

export const paymentMethods = ['СБП', 'Сбербанк', 'Т-Банк', 'ВТБ'];

export type LimitsInfoItem = {
    icon: 'sbp' | 'card' | 'tbank';
    title: string;
    info_list: {
        title: string;
        description: string;
    }[];
};

export const limitsInfo: {
    title: string;
    description: string;
    info_list: LimitsInfoItem[];
} = {
    title: 'Лимиты',
    description: 'Тарифы и лимиты распространяются исключительно на мгновенные обмены',
    info_list: [
        {
            icon: 'sbp',
            title: 'СБП',
            info_list: [
                { title: 'за транзакцию', description: '400 000 ₽' },
                { title: 'в месяц', description: '950 000 ₽' },
            ],
        },
        {
            icon: 'card',
            title: 'На карту',
            info_list: [
                { title: 'за транзакцию', description: '400 000 ₽' },
                { title: 'в сутки', description: '800 000 ₽' },
                { title: 'в месяц', description: '800 000 ₽' },
            ],
        },
        {
            icon: 'tbank',
            title: 'Т-Банк',
            info_list: [
                { title: 'в сутки', description: '1 000 000 ₽' },
                { title: 'в месяц', description: '1 500 000 ₽' },
            ],
        },
    ],
};
