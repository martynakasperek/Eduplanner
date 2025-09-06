import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Bell, 
  UserPlus, 
  AlertTriangle, 
  Calendar, 
  TrendingDown,
  CheckCircle,
  Clock,
  Users,
  BookOpen,
  X,
  MarkAsUnreadIcon,
  Trash2
} from 'lucide-react';

type PageType = 'dashboard';

interface NotificationsProps {
  navigateTo: (page: PageType) => void;
}

const notifications = [
  {
    id: '1',
    type: 'student-added',
    title: 'Nowy uczeń w grupie',
    message: 'Dodano 3 uczniów do grupy Robotyka - Początkujący',
    time: '2 godz. temu',
    read: false,
    icon: UserPlus,
    color: 'text-blue-600'
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Przypomnienie o zajęciach',
    message: 'Zajęcia Teatr Szkolny jutro o 14:00 - sprawdź materiały',
    time: '1 dzień temu',
    read: false,
    icon: Calendar,
    color: 'text-green-600'
  },
  {
    id: '3',
    type: 'low-attendance',
    title: 'Niska frekwencja',
    message: 'Niska frekwencja w grupie Kółko Angielskie - 65%',
    time: '2 dni temu',
    read: false,
    icon: TrendingDown,
    color: 'text-red-600'
  },
  {
    id: '4',
    type: 'materials-updated',
    title: 'Zaktualizowano materiały',
    message: 'Dodano nowe materiały do grupy Kółko Matematyczne - Grupa A',
    time: '3 dni temu',
    read: true,
    icon: BookOpen,
    color: 'text-purple-600'
  },
  {
    id: '5',
    type: 'attendance-checked',
    title: 'Sprawdzono frekwencję',
    message: 'Frekwencja dla zajęć z 10.01.2025 została zapisana',
    time: '3 dni temu',
    read: true,
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: '6',
    type: 'class-cancelled',
    title: 'Zajęcia odwołane',
    message: 'Zajęcia Chór Szkolny z 08.01.2025 zostały odwołane',
    time: '5 dni temu',
    read: true,
    icon: X,
    color: 'text-red-600'
  },
  {
    id: '7',
    type: 'reminder',
    title: 'Nadchodzące zajęcia',
    message: 'Za 30 minut rozpoczynają się zajęcia Robotyki w Lab. 5',
    time: '1 tydzień temu',
    read: true,
    icon: Clock,
    color: 'text-orange-600'
  },
  {
    id: '8',
    type: 'group-full',
    title: 'Grupa zapełniona',
    message: 'Grupa Teatr Szkolny osiągnęła maksymalną liczbę uczniów (25/25)',
    time: '1 tydzień temu',
    read: true,
    icon: Users,
    color: 'text-blue-600'
  }
];

export function Notifications({ navigateTo }: NotificationsProps) {
  const [notificationList, setNotificationList] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const unreadCount = notificationList.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotificationList(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotificationList([]);
  };

  const filteredNotifications = notificationList.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    return true;
  });

  const getNotificationTypeInfo = (type: string) => {
    switch (type) {
      case 'student-added':
        return { label: 'Uczniowie', color: 'bg-blue-100 text-blue-800' };
      case 'reminder':
        return { label: 'Przypomnienie', color: 'bg-yellow-100 text-yellow-800' };
      case 'low-attendance':
        return { label: 'Frekwencja', color: 'bg-red-100 text-red-800' };
      case 'materials-updated':
        return { label: 'Materiały', color: 'bg-purple-100 text-purple-800' };
      case 'attendance-checked':
        return { label: 'Obecność', color: 'bg-green-100 text-green-800' };
      case 'class-cancelled':
        return { label: 'Zajęcia', color: 'bg-red-100 text-red-800' };
      case 'group-full':
        return { label: 'Grupa', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: 'Ogólne', color: 'bg-gray-100 text-gray-800' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 flex items-center space-x-3">
          <Bell className="w-8 h-8" />
          <span>Powiadomienia</span>
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">
              {unreadCount}
            </Badge>
          )}
        </h1>
        <p className="text-gray-600 mt-1">Wszystkie powiadomienia i aktualizacje</p>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                Wszystkie ({notificationList.length})
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Nieprzeczytane ({unreadCount})
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('read')}
              >
                Przeczytane ({notificationList.length - unreadCount})
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Oznacz wszystkie jako przeczytane
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-2" />
                Wyczyść wszystkie
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications list */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification, index) => {
            const Icon = notification.icon;
            const typeInfo = getNotificationTypeInfo(notification.type);
            
            return (
              <Card 
                key={notification.id}
                className={`transition-all hover:shadow-md ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full bg-gray-100 ${notification.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-sm ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h3>
                          <Badge variant="outline" className={typeInfo.color}>
                            {typeInfo.label}
                          </Badge>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                          )}
                        </div>
                        <span className="text-xs text-gray-500 flex-shrink-0">
                          {notification.time}
                        </span>
                      </div>
                      
                      <p className={`text-sm mb-3 ${
                        !notification.read ? 'text-gray-800' : 'text-gray-600'
                      }`}>
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Oznacz jako przeczytane
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsUnread(notification.id)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <MarkAsUnreadIcon className="w-4 h-4 mr-1" />
                            Oznacz jako nieprzeczytane
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">
                {filter === 'unread' ? 'Brak nieprzeczytanych powiadomień' : 
                 filter === 'read' ? 'Brak przeczytanych powiadomień' : 
                 'Brak powiadomień'}
              </h3>
              <p className="text-gray-600 mb-4">
                {filter === 'all' 
                  ? 'Wszystkie powiadomienia zostaną wyświetlone tutaj.'
                  : `Brak powiadomień w kategorii "${filter === 'unread' ? 'nieprzeczytane' : 'przeczytane'}".`}
              </p>
              <Button 
                onClick={() => navigateTo('dashboard')}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Wróć do Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Quick stats */}
      {notificationList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statystyki powiadomień</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl text-blue-600">{notificationList.length}</p>
                <p className="text-sm text-gray-600">Łącznie</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-red-600">{unreadCount}</p>
                <p className="text-sm text-gray-600">Nieprzeczytane</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-green-600">
                  {notificationList.filter(n => n.type === 'reminder').length}
                </p>
                <p className="text-sm text-gray-600">Przypomnienia</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-purple-600">
                  {notificationList.filter(n => n.type === 'student-added').length}
                </p>
                <p className="text-sm text-gray-600">Nowi uczniowie</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}