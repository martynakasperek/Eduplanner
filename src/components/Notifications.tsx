import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Bell,
  Search,
  Filter,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  UserPlus,
  Calendar as CalendarIcon,
  AlertTriangle,
  Info,
  TrendingDown,
  BookOpen,
  Users,
  Clock
} from 'lucide-react';
import { AppState } from '../App';
import { toast } from 'sonner@2.0.3';

interface NotificationsProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export function Notifications({ state, navigate, updateState }: NotificationsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const { notifications } = state;

  // Extended notifications with more examples
  const extendedNotifications = [
    ...notifications,
    {
      id: '4',
      title: 'Materiały zaktualizowane',
      message: 'Zaktualizowano materiały do zajęć Kółko Matematyczne',
      time: '3 godziny temu',
      read: false,
      type: 'info' as const,
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      id: '5',
      title: 'Nowe zajęcia',
      message: 'Dodano nowe zajęcia dla grupy Robotyka na 20.01.2025',
      time: '5 godzin temu',
      read: true,
      type: 'success' as const,
      icon: CalendarIcon,
      color: 'text-green-600'
    },
    {
      id: '6',
      title: 'Brak sali',
      message: 'Sala 201 niedostępna w piątek - znajdź zastępczą salę',
      time: '8 godzin temu',
      read: false,
      type: 'warning' as const,
      icon: AlertTriangle,
      color: 'text-orange-600'
    },
    {
      id: '7',
      title: 'Oceny uczniów',
      message: 'Przypomnienie o wprowadzeniu ocen za ostatnie zajęcia',
      time: '1 dzień temu',
      read: true,
      type: 'info' as const,
      icon: Info,
      color: 'text-blue-600'
    },
    {
      id: '8',
      title: 'Nowy wiadomość',
      message: 'Wiadomość od rodzica ucznia Jana Kowalczyka',
      time: '1 dzień temu',
      read: false,
      type: 'info' as const,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      id: '9',
      title: 'Przypomnienie o zajęciach',
      message: 'Teatr Szkolny rozpoczyna się za godzinę',
      time: '2 dni temu',
      read: true,
      type: 'reminder' as const,
      icon: Clock,
      color: 'text-indigo-600'
    }
  ];

  const filteredNotifications = extendedNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'read' && notification.read) ||
                         (filterStatus === 'unread' && !notification.read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = extendedNotifications.filter(n => !n.read).length;

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = state.notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    );
    updateState({ notifications: updatedNotifications });
    toast.success('Oznaczono jako przeczytane');
  };

  const markAllAsRead = () => {
    const updatedNotifications = state.notifications.map(n => ({ ...n, read: true }));
    updateState({ notifications: updatedNotifications });
    toast.success('Wszystkie powiadomienia oznaczono jako przeczytane');
  };

  const deleteNotification = (notificationId: string) => {
    const updatedNotifications = state.notifications.filter(n => n.id !== notificationId);
    updateState({ notifications: updatedNotifications });
    toast.success('Powiadomienie zostało usunięte');
  };

  const getNotificationIcon = (notification: any) => {
    if (notification.icon) {
      const Icon = notification.icon;
      return <Icon className={`h-5 w-5 ${notification.color}`} />;
    }
    
    switch (notification.type || 'info') {
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'success':
        return <Check className="h-5 w-5 text-green-600" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-indigo-600" />;
      default:
        return <Bell className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'warning':
        return <Badge variant="destructive">Uwaga</Badge>;
      case 'success':
        return <Badge className="bg-green-600">Sukces</Badge>;
      case 'reminder':
        return <Badge className="bg-indigo-600">Przypomnienie</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Powiadomienia</h1>
          <p className="text-gray-600 mt-1">
            Zarządzaj powiadomieniami i pozostań na bieżąco z wydarzeniami
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Ustawienia
          </Button>
          {unreadCount > 0 && (
            <Button size="sm" onClick={markAllAsRead}>
              <CheckCheck className="h-4 w-4 mr-2" />
              Oznacz wszystkie jako przeczytane
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wszystkie</p>
                <p className="text-2xl font-bold text-gray-900">{extendedNotifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Nieprzeczytane</p>
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ostrzeżenia</p>
                <p className="text-2xl font-bold text-orange-600">
                  {extendedNotifications.filter(n => n.type === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Dzisiaj</p>
                <p className="text-2xl font-bold text-green-600">
                  {extendedNotifications.filter(n => 
                    n.time.includes('godz') || n.time.includes('minut')
                  ).length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Szukaj powiadomień..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Typ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie typy</SelectItem>
            <SelectItem value="info">Informacje</SelectItem>
            <SelectItem value="warning">Ostrzeżenia</SelectItem>
            <SelectItem value="success">Sukcesy</SelectItem>
            <SelectItem value="reminder">Przypomnienia</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full lg:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="unread">Nieprzeczytane</SelectItem>
            <SelectItem value="read">Przeczytane</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.map((notification) => (
          <Card 
            key={notification.id} 
            className={`transition-all hover:shadow-md ${
              !notification.read ? 'border-l-4 border-l-blue-600 bg-blue-50/50' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                      {notification.type && getNotificationBadge(notification.type)}
                    </div>
                    
                    <p className={`text-sm ${!notification.read ? 'text-gray-700' : 'text-gray-500'} mb-2`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-gray-400">{notification.time}</span>
                      
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Oznacz jako przeczytane
                          </Button>
                        )}
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-xs text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'Brak wyników' : 'Brak powiadomień'}
            </h3>
            <p className="text-gray-600">
              {searchQuery 
                ? 'Spróbuj zmienić kryteria wyszukiwania' 
                : 'Wszystkie powiadomienia zostały przeczytane'}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie akcje</CardTitle>
          <CardDescription>Często wykonywane operacje związane z powiadomieniami</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col" onClick={markAllAsRead}>
              <CheckCheck className="h-6 w-6 mb-2" />
              <span className="text-sm">Oznacz wszystkie jako przeczytane</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Settings className="h-6 w-6 mb-2" />
              <span className="text-sm">Ustawienia powiadomień</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Filter className="h-6 w-6 mb-2" />
              <span className="text-sm">Zaawansowane filtrowanie</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Rodzaje powiadomień</CardTitle>
          <CardDescription>Konfiguruj, które powiadomienia chcesz otrzymywać</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Nowi uczniowie</p>
                  <p className="text-sm text-gray-500">Powiadomienia o nowych zapisach do grup</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-blue-600 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingDown className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Niska frekwencja</p>
                  <p className="text-sm text-gray-500">Ostrzeżenia o niskiej frekwencji w grupach</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-orange-600 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <CalendarIcon className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Przypomnienia o zajęciach</p>
                  <p className="text-sm text-gray-500">Powiadomienia przed rozpoczęciem zajęć</p>
                </div>
              </div>
              <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}