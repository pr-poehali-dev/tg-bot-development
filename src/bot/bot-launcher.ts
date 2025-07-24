import { NewsBot } from './telegram-bot';
import { newsService } from './news-service';
import { BOT_CONFIG } from './bot-config';

// Главный класс для запуска бота
class BotLauncher {
  private bot: NewsBot | null = null;
  private newsUpdateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.checkEnvironment();
  }

  // Проверка окружения
  private checkEnvironment() {
    if (!BOT_CONFIG.TOKEN || BOT_CONFIG.TOKEN === 'YOUR_BOT_TOKEN_HERE') {
      console.error('❌ ОШИБКА: Токен бота не установлен!');
      console.log('📝 Получите токен у @BotFather в Telegram');
      console.log('🔧 Установите переменную TELEGRAM_BOT_TOKEN или измените bot-config.ts');
      process.exit(1);
    }
  }

  // Запуск бота
  public async start() {
    try {
      console.log('🤖 Запуск NewsBot...');
      
      this.bot = new NewsBot(BOT_CONFIG.TOKEN);
      
      console.log('✅ Бот успешно запущен!');
      console.log(`🔗 Токен: ${BOT_CONFIG.TOKEN.substring(0, 10)}...`);
      
      // Запуск автоматической рассылки новостей
      this.startNewsUpdates();
      
      // Обработка graceful shutdown
      this.setupGracefulShutdown();
      
      console.log('📢 Бот готов к работе!');
      
    } catch (error) {
      console.error('❌ Ошибка при запуске бота:', error);
      process.exit(1);
    }
  }

  // Запуск автоматических обновлений новостей
  private startNewsUpdates() {
    console.log('📰 Запуск системы автоматических новостей...');
    
    // Рассылка новостей каждый час
    this.newsUpdateInterval = setInterval(() => {
      this.sendRandomNews();
    }, BOT_CONFIG.BROADCAST_INTERVAL);

    // Первая рассылка через 5 минут после запуска
    setTimeout(() => {
      this.sendRandomNews();
    }, 5 * 60 * 1000);
  }

  // Отправка случайной новости
  private async sendRandomNews() {
    if (!this.bot) return;

    try {
      const randomNews = newsService.generateRandomNews();
      console.log(`📤 Рассылка новости: ${randomNews.title}`);
      
      this.bot.broadcastNews(randomNews);
      
      const stats = this.bot.getBotStats();
      console.log(`📊 Отправлено ${stats.activeUsers} пользователям`);
      
    } catch (error) {
      console.error('❌ Ошибка при рассылке:', error);
    }
  }

  // Остановка бота
  public async stop() {
    console.log('🛑 Остановка бота...');
    
    if (this.newsUpdateInterval) {
      clearInterval(this.newsUpdateInterval);
      this.newsUpdateInterval = null;
    }
    
    console.log('✅ Бот остановлен');
  }

  // Настройка graceful shutdown
  private setupGracefulShutdown() {
    const shutdown = async (signal: string) => {
      console.log(`\n📡 Получен сигнал ${signal}`);
      await this.stop();
      process.exit(0);
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGQUIT', () => shutdown('SIGQUIT'));
  }

  // Получение статистики бота
  public getStats() {
    if (!this.bot) {
      return { error: 'Бот не запущен' };
    }
    
    return this.bot.getBotStats();
  }

  // Отправка тестовой новости
  public async sendTestNews() {
    if (!this.bot) {
      console.log('❌ Бот не запущен');
      return;
    }

    const testNews = {
      id: 'test-' + Date.now(),
      title: '🧪 Тестовая новость',
      description: 'Это тестовое сообщение для проверки работы бота',
      category: 'tech',
      publishedAt: new Date(),
      emoji: '🧪'
    };

    console.log('📤 Отправка тестовой новости...');
    this.bot.broadcastNews(testNews);
    
    const stats = this.getStats();
    console.log('📊 Статистика:', stats);
  }
}

// Экспорт для использования
export { BotLauncher };

// Автозапуск если файл запущен напрямую
if (require.main === module) {
  const launcher = new BotLauncher();
  
  // Запуск бота
  launcher.start();
  
  // Отправка тестовой новости через 10 секунд
  setTimeout(() => {
    launcher.sendTestNews();
  }, 10000);
}