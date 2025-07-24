# 🤖 NewsBot - Telegram Бот для Новостей

Полнофункциональный Telegram бот для получения персонализированных новостей с современным интерфейсом и гибкими настройками.

## 🚀 Возможности

- **📰 Новости по категориям** - Технологии, Бизнес, Космос, Спорт, Наука, Развлечения
- **🔔 Умные уведомления** - Персональные настройки рассылки
- **📊 Статистика** - Отслеживание активности пользователя
- **🎯 Фильтрация** - Подписка только на интересные темы
- **💬 Интерактивность** - Кнопки и быстрые команды
- **📤 Поделиться** - Легкая отправка новостей друзьям

## 📋 Команды бота

| Команда | Описание |
|---------|----------|
| `/start` | Начать работу с ботом |
| `/news` | Получить свежие новости |
| `/categories` | Настроить категории подписок |
| `/settings` | Управление уведомлениями |
| `/stats` | Посмотреть статистику |
| `/help` | Справка по командам |

## 🛠 Установка и запуск

### 1. Создание бота в Telegram

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Получите токен бота (например: `1234567890:AAEhBOwweZSEE-V6Fon8Vqi8VX9GwrCxisY`)

### 2. Настройка проекта

```bash
# Установка зависимостей
bun install

# Создание файла с переменными окружения
cp .env.example .env
```

### 3. Конфигурация

Откройте файл `.env` и добавьте ваш токен:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
WEBHOOK_URL=https://yourdomain.com/webhook  # для production
PORT=3000
```

Или измените файл `src/bot/bot-config.ts`:

```typescript
export const BOT_CONFIG = {
  TOKEN: 'your_bot_token_here',
  // ... остальные настройки
};
```

### 4. Запуск бота

```bash
# Разработка
bun run src/bot/bot-launcher.ts

# Или с помощью npm скрипта
bun run bot:start
```

## 📁 Структура проекта

```
src/bot/
├── telegram-bot.ts      # Основная логика бота
├── news-service.ts      # Сервис для работы с новостями
├── bot-config.ts        # Конфигурация и настройки
└── bot-launcher.ts      # Запуск и управление ботом
```

## 🎛 Настройки бота

### Конфигурация в `bot-config.ts`:

```typescript
export const BOT_CONFIG = {
  TOKEN: 'your_token',                    // Токен бота
  BROADCAST_INTERVAL: 60 * 60 * 1000,    // Интервал рассылки (1 час)
  MAX_MESSAGE_LENGTH: 4096,              // Максимальная длина сообщения
  MAX_CATEGORIES_PER_USER: 10,           // Лимит категорий на пользователя
  NEWS_PER_REQUEST: 5,                   // Количество новостей за запрос
};
```

### Категории новостей:

- 💻 **Технологии** - IT, гаджеты, инновации
- 💼 **Бизнес** - Экономика, финансы, стартапы
- 🚀 **Космос** - Космические исследования, астрономия
- ⚽ **Спорт** - Футбол, олимпиада, чемпионаты
- 🔬 **Наука** - Исследования, открытия, медицина
- 🎬 **Развлечения** - Кино, музыка, игры

## 🔧 Кастомизация

### Добавление новых команд:

```typescript
// В telegram-bot.ts
this.bot.onText(/\/mycmd/, (msg) => {
  const chatId = msg.chat.id;
  this.bot.sendMessage(chatId, 'Привет из новой команды!');
});
```

### Добавление категорий:

```typescript
// В telegram-bot.ts
private newsCategories = [
  // ... существующие категории
  { id: 'crypto', name: 'Криптовалюты', emoji: '₿' }
];
```

### Интеграция с внешним API:

```typescript
// В news-service.ts
async fetchFromExternalAPI(): Promise<NewsItem[]> {
  const response = await fetch('https://api.news.com/latest');
  const data = await response.json();
  
  return data.articles.map(article => ({
    id: article.id,
    title: article.title,
    description: article.description,
    category: article.category,
    url: article.url,
    publishedAt: new Date(article.publishedAt),
    emoji: this.getCategoryEmoji(article.category)
  }));
}
```

## 📊 Мониторинг и логи

Бот автоматически выводит логи в консоль:

```
🤖 Запуск NewsBot...
✅ Бот успешно запущен!
🔗 Токен: 1234567890...
📰 Запуск системы автоматических новостей...
📢 Бот готов к работе!
📤 Рассылка новости: Технологический прорыв
📊 Отправлено 15 пользователям
```

## 🚀 Production развертывание

### Webhook режим:

```typescript
// Вместо polling используйте webhook
const bot = new TelegramBot(token, { webHook: true });

// Настройка webhook
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`);

// Express сервер для обработки webhook
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});
```

### Docker развертывание:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 3000
CMD ["bun", "run", "src/bot/bot-launcher.ts"]
```

## 🧪 Тестирование

```bash
# Запуск с тестовой новостью
bun run src/bot/bot-launcher.ts

# Бот автоматически отправит тестовую новость через 10 секунд
```

## 🤝 Поддержка

При возникновении проблем:

1. Проверьте правильность токена бота
2. Убедитесь, что бот не заблокирован пользователем
3. Проверьте логи в консоли
4. Убедитесь в доступности интернета

## 📈 Планы развития

- [ ] Интеграция с реальными API новостей
- [ ] База данных для хранения пользователей
- [ ] Админ-панель для управления контентом
- [ ] Аналитика и метрики
- [ ] Многоязычная поддержка
- [ ] Push-уведомления через веб

---

**Разработано с ❤️ для получения актуальных новостей в Telegram**