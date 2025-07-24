// Конфигурация бота
export const BOT_CONFIG = {
  // Получить токен можно у @BotFather в Telegram
  TOKEN: process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
  
  // Настройки рассылки
  BROADCAST_INTERVAL: 60 * 60 * 1000, // 1 час в миллисекундах
  MAX_MESSAGE_LENGTH: 4096,
  
  // Лимиты
  MAX_CATEGORIES_PER_USER: 10,
  NEWS_PER_REQUEST: 5,
  
  // Webhook настройки (для production)
  WEBHOOK_URL: process.env.WEBHOOK_URL || '',
  PORT: process.env.PORT || 3000,
};

// Шаблоны сообщений
export const MESSAGES = {
  WELCOME: `
🤖 Добро пожаловать в NewsBot!

Я помогу тебе быть в курсе последних новостей по интересующим темам.

🔹 /news - получить свежие новости
🔹 /categories - управлять категориями
🔹 /settings - настройки уведомлений
🔹 /stats - твоя статистика
🔹 /help - помощь

Давай настроим твои предпочтения! 👇
  `,
  
  HELP: `
📋 Доступные команды:

🔹 /start - начать работу с ботом
🔹 /news - получить последние новости
🔹 /categories - настроить категории новостей
🔹 /settings - управление уведомлениями
🔹 /stats - посмотреть статистику
🔹 /help - показать эту справку

💡 Также ты можешь использовать кнопки в меню для быстрого доступа к функциям!
  `,
  
  NO_NEWS: 'Новостей по вашим категориям пока нет. Настройте категории в /categories',
  
  CHOOSE_CATEGORIES: '🏷️ *Выберите интересующие категории:*\n\n✅ - подписан\n❌ - не подписан',
  
  SETTINGS_MESSAGE: `
⚙️ *Настройки уведомлений*

Управляйте тем, как и когда получать уведомления о новостях.
  `,
  
  START_BOT_FIRST: 'Сначала запустите бота командой /start'
};

// Эмодзи для категорий и статусов
export const EMOJIS = {
  TECH: '💻',
  BUSINESS: '💼',
  SPACE: '🚀',
  SPORT: '⚽',
  SCIENCE: '🔬',
  ENTERTAINMENT: '🎬',
  HEALTH: '🏥',
  POLITICS: '🏛️',
  
  // Статусы
  SUBSCRIBED: '✅',
  UNSUBSCRIBED: '❌',
  NOTIFICATIONS_ON: '🔔',
  NOTIFICATIONS_OFF: '🔕',
  
  // Действия
  NEWS: '📰',
  SETTINGS: '⚙️',
  STATS: '📊',
  HELP: '❓',
  SHARE: '📤',
  READ_MORE: '📖'
};