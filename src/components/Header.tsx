import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  GraduationCap, 
  Bell, 
  Settings, 
  LogOut, 
  LayoutDashboard,
  Users,
  Calendar,
  UserCheck,
  BarChart3
} from 'lucide-react';
import { User } from '../App';

interface HeaderProps {
  user: User;
  currentScreen: string;
  notifications: Array<{ id: string; title: string; message: string; time: string; read: boolean; }>;
  navigate: (screen: string) => void;
  onLogout: () => void;
}

export function Header({ user, currentScreen, notifications, navigate, onLogout }: HeaderProps) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const menuItems = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'groups', label: 'Moje Grupy', icon: Users },
    { key: 'calendar', label: 'Kalendarz', icon: Calendar },
    { key: 'students', label: 'Uczniowie', icon: UserCheck },
    { key: 'reports', label: 'Raporty', icon: BarChart3 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">EduPlanner</h1>
            <p className="text-xs text-gray-500">System zarządzania zajęciami</p>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.key;
            
            return (
              <Button
                key={item.key}
                variant={isActive ? "default" : "ghost"}
                className={`flex items-center space-x-2 ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => navigate(item.key)}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Button>
            );
          })}
        </nav>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {unreadCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h3 className="font-semibold">Powiadomienia</h3>
                <p className="text-sm text-gray-500">{unreadCount} nowych</p>
              </div>
              {notifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="p-3 cursor-pointer"
                  onClick={() => {
                    navigate('notifications');
                    setNotificationOpen(false);
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="p-3 text-center text-blue-600 cursor-pointer"
                onClick={() => {
                  navigate('notifications');
                  setNotificationOpen(false);
                }}
              >
                Zobacz wszystkie powiadomienia
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {user.avatar || user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">Nauczyciel</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-3 border-b">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <DropdownMenuItem className="flex items-center space-x-2 cursor-pointer">
                <Settings className="h-4 w-4" />
                <span>Ustawienia</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="flex items-center space-x-2 cursor-pointer text-red-600"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                <span>Wyloguj się</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}