import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [notifications, setNotifications] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState(['tech', 'business']);

  const newsItems = [
    {
      id: 1,
      title: "Новые технологии в области ИИ",
      description: "Исследователи представили революционный подход к машинному обучению...",
      category: "tech",
      time: "2 часа назад",
      emoji: "🤖"
    },
    {
      id: 2,
      title: "Экономический прогноз на 2025 год",
      description: "Аналитики предсказывают значительный рост в IT-секторе...",
      category: "business",
      time: "4 часа назад",
      emoji: "📈"
    },
    {
      id: 3,
      title: "Космические новости недели",
      description: "SpaceX успешно запустила очередную миссию на Международную космическую станцию...",
      category: "space",
      time: "6 часов назад",
      emoji: "🚀"
    }
  ];

  const categories = [
    { id: 'tech', name: 'Технологии', emoji: '💻', color: 'bg-blue-100 text-blue-800' },
    { id: 'business', name: 'Бизнес', emoji: '💼', color: 'bg-green-100 text-green-800' },
    { id: 'space', name: 'Космос', emoji: '🌌', color: 'bg-purple-100 text-purple-800' },
    { id: 'sport', name: 'Спорт', emoji: '⚽', color: 'bg-orange-100 text-orange-800' }
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="Send" size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">NewsBot</h1>
                <p className="text-sm text-gray-500">Персональные новости</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Icon name="Wifi" size={14} className="mr-1" />
              Онлайн
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Tabs defaultValue="news" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <Icon name="Newspaper" size={16} />
              <span>Новости</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Icon name="Settings" size={16} />
              <span>Настройки</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center space-x-2">
              <Icon name="BarChart3" size={16} />
              <span>Статистика</span>
            </TabsTrigger>
          </TabsList>

          {/* Новости */}
          <TabsContent value="news" className="space-y-4">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Icon name="Bell" size={20} className="text-blue-500" />
                    <span>Добро пожаловать в NewsBot! 👋</span>
                  </CardTitle>
                  <Button size="sm">
                    /start
                  </Button>
                </div>
                <CardDescription>
                  Ваш персональный помощник для получения актуальных новостей и уведомлений
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center">
                  <img 
                    src="/img/4e589d8d-e4be-4867-8b34-caf8147af273.jpg" 
                    alt="NewsBot Interface Preview" 
                    className="rounded-lg shadow-md max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {newsItems.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow animate-fade-in">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{item.emoji}</div>
                        <div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                          <CardDescription className="mt-1">
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        className={categories.find(c => c.id === item.category)?.color}
                      >
                        {categories.find(c => c.id === item.category)?.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Icon name="Clock" size={14} className="mr-1" />
                        {item.time}
                      </span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Icon name="Share" size={14} className="mr-1" />
                          Поделиться
                        </Button>
                        <Button size="sm">
                          <Icon name="ExternalLink" size={14} className="mr-1" />
                          Читать
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="User" size={20} />
                  <span>Профиль пользователя</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-blue-500 text-white text-xl">
                      НБ
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">@newsbot_user</h3>
                    <p className="text-sm text-gray-500">Активен с января 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Bell" size={20} />
                  <span>Уведомления</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Мгновенные уведомления</h4>
                    <p className="text-sm text-gray-500">Получать новости сразу после публикации</p>
                  </div>
                  <Switch 
                    checked={notifications} 
                    onCheckedChange={setNotifications}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Дайджест утром</h4>
                    <p className="text-sm text-gray-500">Ежедневная сводка в 9:00</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Еженедельный отчет</h4>
                    <p className="text-sm text-gray-500">Сводка за неделю по воскресеньям</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="Tags" size={20} />
                  <span>Категории новостей</span>
                </CardTitle>
                <CardDescription>
                  Выберите интересующие вас темы
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`
                        p-3 rounded-lg border cursor-pointer transition-all
                        ${selectedCategories.includes(category.id) 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{category.emoji}</span>
                        <span className="font-medium">{category.name}</span>
                        {selectedCategories.includes(category.id) && (
                          <Icon name="Check" size={16} className="text-blue-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Статистика */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-blue-600">127</CardTitle>
                  <CardDescription>Прочитанных новостей</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-green-600">32</CardTitle>
                  <CardDescription>Дня активности</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl font-bold text-purple-600">4</CardTitle>
                  <CardDescription>Любимых категории</CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Активность по дням недели</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'].map((day, index) => (
                    <div key={day} className="flex items-center space-x-3">
                      <span className="w-20 text-sm text-gray-600">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 rounded-full h-2 transition-all"
                          style={{ width: `${Math.random() * 80 + 20}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 20 + 5)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3">
          <Button className="rounded-full w-14 h-14 shadow-lg">
            <Icon name="Plus" size={20} />
          </Button>
          <Button variant="secondary" className="rounded-full w-12 h-12 shadow-lg">
            <Icon name="MessageCircle" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;