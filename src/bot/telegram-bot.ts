import TelegramBot from 'node-telegram-bot-api';

// Интерфейсы
interface User {
  id: number;
  username?: string;
  firstName: string;
  lastName?: string;
  categories: string[];
  notifications: boolean;
  lastActive: Date;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  publishedAt: Date;
  emoji: string;
}

class NewsBot {
  private bot: TelegramBot;
  private users: Map<number, User> = new Map();
  private newsCategories = [
    { id: 'tech', name: 'Технологии', emoji: '💻' },
    { id: 'business', name: 'Бизнес', emoji: '💼' },
    { id: 'space', name: 'Космос', emoji: '🚀' },
    { id: 'sport', name: 'Спорт', emoji: '⚽' },
    { id: 'science', name: 'Наука', emoji: '🔬' },
    { id: 'entertainment', name: 'Развлечения', emoji: '🎬' }
  ];

  private sampleNews: NewsItem[] = [
    {
      id: '1',
      title: 'Прорыв в области квантовых вычислений',
      description: 'Ученые создали новый квантовый компьютер с рекордным количеством кубитов',
      category: 'tech',
      publishedAt: new Date(),
      emoji: '🔬'
    },
    {
      id: '2',
      title: 'SpaceX запустила новую миссию на Марс',
      description: 'Успешный запуск ракеты Falcon Heavy с исследовательским аппаратом',
      category: 'space',
      publishedAt: new Date(),
      emoji: '🚀'
    },
    {
      id: '3',
      title: 'Новый рекорд на бирже технологий',
      description: 'Акции IT-компаний показали максимальный рост за последние 5 лет',
      category: 'business',
      publishedAt: new Date(),
      emoji: '📈'
    }
  ];

  constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
    this.setupCommands();
    this.setupCallbacks();
  }

  private setupCommands() {
    // Команда /start
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      const user: User = {
        id: chatId,
        username: msg.from?.username,
        firstName: msg.from?.first_name || 'Пользователь',
        lastName: msg.from?.last_name,
        categories: ['tech', 'business'],
        notifications: true,
        lastActive: new Date()
      };
      
      this.users.set(chatId, user);
      
      const welcomeMessage = `
🤖 Добро пожаловать в NewsBot!

Привет, ${user.firstName}! Я помогу тебе быть в курсе последних новостей.

🔹 /news - получить свежие новости
🔹 /categories - управлять категориями
🔹 /settings - настройки уведомлений
🔹 /stats - твоя статистика
🔹 /help - помощь

Давай настроим твои предпочтения! 👇
      `;
      
      const options = {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📰 Последние новости', callback_data: 'get_news' }],
            [{ text: '⚙️ Настроить категории', callback_data: 'setup_categories' }],
            [{ text: '📊 Моя статистика', callback_data: 'show_stats' }]
          ]
        }
      };
      
      this.bot.sendMessage(chatId, welcomeMessage, options);
    });

    // Команда /news
    this.bot.onText(/\/news/, (msg) => {
      this.sendNews(msg.chat.id);
    });

    // Команда /categories
    this.bot.onText(/\/categories/, (msg) => {
      this.showCategories(msg.chat.id);
    });

    // Команда /settings
    this.bot.onText(/\/settings/, (msg) => {
      this.showSettings(msg.chat.id);
    });

    // Команда /stats
    this.bot.onText(/\/stats/, (msg) => {
      this.showStats(msg.chat.id);
    });

    // Команда /help
    this.bot.onText(/\/help/, (msg) => {
      const helpMessage = `
📋 Доступные команды:

🔹 /start - начать работу с ботом
🔹 /news - получить последние новости
🔹 /categories - настроить категории новостей
🔹 /settings - управление уведомлениями
🔹 /stats - посмотреть статистику
🔹 /help - показать эту справку

💡 Также ты можешь использовать кнопки в меню для быстрого доступа к функциям!
      `;
      
      this.bot.sendMessage(msg.chat.id, helpMessage);
    });
  }

  private setupCallbacks() {
    this.bot.on('callback_query', (query) => {
      const chatId = query.message?.chat.id;
      const data = query.data;
      
      if (!chatId) return;
      
      // Подтверждаем получение callback
      this.bot.answerCallbackQuery(query.id);
      
      switch (data) {
        case 'get_news':
          this.sendNews(chatId);
          break;
        case 'setup_categories':
          this.showCategories(chatId);
          break;
        case 'show_stats':
          this.showStats(chatId);
          break;
        case 'toggle_notifications':
          this.toggleNotifications(chatId);
          break;
        default:
          if (data?.startsWith('category_')) {
            this.toggleCategory(chatId, data.replace('category_', ''));
          } else if (data?.startsWith('news_')) {
            this.showNewsDetails(chatId, data.replace('news_', ''));
          }
          break;
      }
    });
  }

  private sendNews(chatId: number) {
    const user = this.users.get(chatId);
    if (!user) {
      this.bot.sendMessage(chatId, 'Сначала запустите бота командой /start');
      return;
    }

    const filteredNews = this.sampleNews.filter(news => 
      user.categories.includes(news.category)
    );

    if (filteredNews.length === 0) {
      this.bot.sendMessage(chatId, 'Новостей по вашим категориям пока нет. Настройте категории в /categories');
      return;
    }

    this.bot.sendMessage(chatId, '📰 *Свежие новости для вас:*', { parse_mode: 'Markdown' });

    filteredNews.forEach((news, index) => {
      const category = this.newsCategories.find(c => c.id === news.category);
      const message = `
${news.emoji} *${news.title}*

${news.description}

📅 ${news.publishedAt.toLocaleString('ru-RU')}
🏷️ ${category?.name || news.category}
      `;

      const options = {
        parse_mode: 'Markdown' as const,
        reply_markup: {
          inline_keyboard: [
            [{ text: '📖 Подробнее', callback_data: `news_${news.id}` }],
            [{ text: '📤 Поделиться', switch_inline_query: news.title }]
          ]
        }
      };

      setTimeout(() => {
        this.bot.sendMessage(chatId, message, options);
      }, index * 500);
    });
  }

  private showCategories(chatId: number) {
    const user = this.users.get(chatId);
    if (!user) return;

    const message = '🏷️ *Выберите интересующие категории:*\n\n✅ - подписан\n❌ - не подписан';
    
    const keyboard = this.newsCategories.map(category => [{
      text: `${user.categories.includes(category.id) ? '✅' : '❌'} ${category.emoji} ${category.name}`,
      callback_data: `category_${category.id}`
    }]);

    const options = {
      parse_mode: 'Markdown' as const,
      reply_markup: {
        inline_keyboard: keyboard
      }
    };

    this.bot.sendMessage(chatId, message, options);
  }

  private toggleCategory(chatId: number, categoryId: string) {
    const user = this.users.get(chatId);
    if (!user) return;

    const category = this.newsCategories.find(c => c.id === categoryId);
    if (!category) return;

    if (user.categories.includes(categoryId)) {
      user.categories = user.categories.filter(c => c !== categoryId);
      this.bot.sendMessage(chatId, `❌ Вы отписались от категории "${category.name}"`);
    } else {
      user.categories.push(categoryId);
      this.bot.sendMessage(chatId, `✅ Вы подписались на категорию "${category.name}"`);
    }

    this.users.set(chatId, user);
    
    // Обновляем сообщение с категориями
    setTimeout(() => this.showCategories(chatId), 1000);
  }

  private showSettings(chatId: number) {
    const user = this.users.get(chatId);
    if (!user) return;

    const message = `
⚙️ *Настройки уведомлений*

Текущий статус: ${user.notifications ? '🔔 Включены' : '🔕 Выключены'}

Управляйте тем, как и когда получать уведомления о новостях.
    `;

    const options = {
      parse_mode: 'Markdown' as const,
      reply_markup: {
        inline_keyboard: [
          [{
            text: user.notifications ? '🔕 Выключить уведомления' : '🔔 Включить уведомления',
            callback_data: 'toggle_notifications'
          }],
          [{ text: '🏷️ Настроить категории', callback_data: 'setup_categories' }],
          [{ text: '📊 Статистика', callback_data: 'show_stats' }]
        ]
      }
    };

    this.bot.sendMessage(chatId, message, options);
  }

  private toggleNotifications(chatId: number) {
    const user = this.users.get(chatId);
    if (!user) return;

    user.notifications = !user.notifications;
    this.users.set(chatId, user);

    const status = user.notifications ? '🔔 включены' : '🔕 выключены';
    this.bot.sendMessage(chatId, `Уведомления ${status}`);
    
    setTimeout(() => this.showSettings(chatId), 1000);
  }

  private showStats(chatId: number) {
    const user = this.users.get(chatId);
    if (!user) return;

    const daysSinceRegistration = Math.floor(
      (new Date().getTime() - user.lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    const message = `
📊 *Ваша статистика*

👤 Имя: ${user.firstName}
📅 Активен: ${daysSinceRegistration === 0 ? 'сегодня' : `${daysSinceRegistration} дн. назад`}
🏷️ Подписок: ${user.categories.length}
🔔 Уведомления: ${user.notifications ? 'включены' : 'выключены'}

📰 Доступно новостей: ${this.sampleNews.filter(n => user.categories.includes(n.category)).length}
    `;

    this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }

  private showNewsDetails(chatId: number, newsId: string) {
    const news = this.sampleNews.find(n => n.id === newsId);
    if (!news) return;

    const category = this.newsCategories.find(c => c.id === news.category);
    const message = `
📰 *Подробности новости*

${news.emoji} *${news.title}*

${news.description}

🏷️ Категория: ${category?.name || news.category}
📅 Опубликовано: ${news.publishedAt.toLocaleString('ru-RU')}

${news.url ? `🔗 Читать полностью: ${news.url}` : ''}
    `;

    this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
  }

  // Метод для отправки новостей всем подписчикам
  public broadcastNews(news: NewsItem) {
    this.users.forEach((user, chatId) => {
      if (user.notifications && user.categories.includes(news.category)) {
        const category = this.newsCategories.find(c => c.id === news.category);
        const message = `
🔔 *Новая новость!*

${news.emoji} *${news.title}*

${news.description}

🏷️ ${category?.name || news.category}
        `;

        this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      }
    });
  }

  // Метод для получения статистики бота
  public getBotStats() {
    return {
      totalUsers: this.users.size,
      activeUsers: Array.from(this.users.values()).filter(u => u.notifications).length,
      totalNews: this.sampleNews.length,
      categories: this.newsCategories.length
    };
  }
}

// Экспорт для использования
export { NewsBot, type User, type NewsItem };

// Пример использования (раскомментировать для запуска)
/*
const BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
const newsBot = new NewsBot(BOT_TOKEN);

console.log('🤖 NewsBot запущен!');

// Пример рассылки новости через 10 секунд
setTimeout(() => {
  const testNews: NewsItem = {
    id: '999',
    title: 'Тестовая новость',
    description: 'Это тестовая новость для проверки рассылки',
    category: 'tech',
    publishedAt: new Date(),
    emoji: '🧪'
  };
  
  newsBot.broadcastNews(testNews);
}, 10000);
*/