import { NewsItem } from './telegram-bot';

// Сервис для работы с новостями
export class NewsService {
  private mockNews: NewsItem[] = [
    {
      id: '1',
      title: 'Революция в квантовых вычислениях',
      description: 'Ученые IBM создали квантовый компьютер с 1000+ кубитов, способный решать сложные задачи за секунды',
      category: 'tech',
      url: 'https://example.com/quantum-breakthrough',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
      emoji: '🔬'
    },
    {
      id: '2',
      title: 'SpaceX готовится к полёту на Марс',
      description: 'Илон Маск объявил о готовности первой пилотируемой миссии на Красную планету в 2026 году',
      category: 'space',
      url: 'https://example.com/spacex-mars',
      publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 часа назад
      emoji: '🚀'
    },
    {
      id: '3',
      title: 'Биткоин достиг нового максимума',
      description: 'Криптовалюта превысила отметку $80,000 благодаря росту институционального интереса',
      category: 'business',
      url: 'https://example.com/bitcoin-record',
      publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 час назад
      emoji: '₿'
    },
    {
      id: '4',
      title: 'Прорыв в лечении рака',
      description: 'Новая иммунотерапия показала 95% эффективность в клинических испытаниях',
      category: 'science',
      url: 'https://example.com/cancer-breakthrough',
      publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 часов назад
      emoji: '🧬'
    },
    {
      id: '5',
      title: 'ЧМ по футболу: сенсационный финал',
      description: 'Неожиданная победа сборной в драматичном финале с счётом 3:2 в дополнительное время',
      category: 'sport',
      url: 'https://example.com/world-cup-final',
      publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 часа назад
      emoji: '⚽'
    },
    {
      id: '6',
      title: 'Новый блокбастер побил рекорды',
      description: 'Фильм "Космическая одиссея 2025" собрал $500 млн за первые выходные проката',
      category: 'entertainment',
      url: 'https://example.com/movie-record',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 часов назад
      emoji: '🎬'
    }
  ];

  // Получить новости по категории
  getNewsByCategory(category: string, limit = 5): NewsItem[] {
    return this.mockNews
      .filter(news => news.category === category)
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  // Получить новости по нескольким категориям
  getNewsByCategories(categories: string[], limit = 10): NewsItem[] {
    return this.mockNews
      .filter(news => categories.includes(news.category))
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  // Получить последние новости
  getLatestNews(limit = 5): NewsItem[] {
    return this.mockNews
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      .slice(0, limit);
  }

  // Получить новость по ID
  getNewsById(id: string): NewsItem | undefined {
    return this.mockNews.find(news => news.id === id);
  }

  // Добавить новую новость (для админов)
  addNews(news: Omit<NewsItem, 'id'>): NewsItem {
    const newNews: NewsItem = {
      ...news,
      id: Date.now().toString(),
      publishedAt: new Date()
    };
    
    this.mockNews.unshift(newNews);
    return newNews;
  }

  // Получить тренды (самые популярные категории)
  getTrendingCategories(): Array<{category: string, count: number}> {
    const categoryCount = this.mockNews.reduce((acc, news) => {
      acc[news.category] = (acc[news.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);
  }

  // Поиск новостей
  searchNews(query: string, categories?: string[]): NewsItem[] {
    const searchTerm = query.toLowerCase();
    
    return this.mockNews
      .filter(news => {
        const matchesQuery = 
          news.title.toLowerCase().includes(searchTerm) ||
          news.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categories || categories.includes(news.category);
        
        return matchesQuery && matchesCategory;
      })
      .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
  }

  // Получить статистику новостей
  getNewsStats() {
    const total = this.mockNews.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayNews = this.mockNews.filter(news => 
      news.publishedAt >= today
    ).length;
    
    const categoryStats = this.getTrendingCategories();
    
    return {
      total,
      todayNews,
      categories: categoryStats
    };
  }

  // Симуляция получения новостей из внешнего API
  async fetchFromExternalAPI(): Promise<NewsItem[]> {
    // Здесь можно подключить реальный API новостей
    // Например: News API, RSS фиды, или другие источники
    
    // Пока возвращаем mock данные
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockNews);
      }, 1000);
    });
  }

  // Генерация случайной новости для тестирования
  generateRandomNews(): NewsItem {
    const categories = ['tech', 'business', 'space', 'sport', 'science', 'entertainment'];
    const emojis = ['🔥', '⚡', '🎯', '💡', '🚀', '📈', '🔬', '⚽'];
    
    const titles = [
      'Технологический прорыв изменит мир',
      'Экономические новости недели',
      'Космические исследования продолжаются',  
      'Спортивные достижения года',
      'Научное открытие века',
      'Развлекательная индустрия растёт'
    ];
    
    const descriptions = [
      'Подробное описание важного события, которое повлияет на будущее',
      'Аналитики прогнозируют значительные изменения в отрасли',
      'Исследователи представили революционные результаты',
      'Эксперты комментируют последние события',
      'Новые данные подтверждают теорию учёных'
    ];
    
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
    
    return {
      id: Date.now().toString(),
      title: `${randomEmoji} ${randomTitle}`,
      description: randomDescription,
      category: randomCategory,
      publishedAt: new Date(),
      emoji: randomEmoji
    };
  }
}

export const newsService = new NewsService();