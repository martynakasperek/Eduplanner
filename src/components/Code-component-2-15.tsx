import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { BookOpen, Bell, Settings, LogOut, Home, Users, Calendar, GraduationCap, BarChart3 } from 'lucide-react';

type PageType = 'dashboard' | 'groups' | 'calendar' | 'students' | 'reports' | 'notifications';

interface HeaderProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  currentPage: string;
  navigateTo: (page: PageType) => void;
  onLogout: () => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'groups', label: 'Moje Grupy', icon: Users },
  { id: 'calendar', label: 'Kalendarz', icon: Calendar },
  { id: 'students', label: 'Uczniowie', icon: GraduationCap },
  { id: 'reports', label: 'Raporty', icon: BarChart3 },
];

export function Header({ user, currentPage, navigateTo, onLogout }: HeaderProps) {
  const [notificationsCount] = useState(3);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo i nazwa */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl text-gray-900 hidden sm:block">EduPlanner</span>
            </div>
          </div>

          {/* Główne menu nawigacyjne */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => navigateTo(item.id as PageType)}
                  className={`flex items-center space-x-2 ${
                    isActive 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </nav>

          {/* Profil użytkownika i powiadomienia */}
          <div className="flex items-center space-x-4">
            {/* Powiadomienia */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigateTo('notifications')}
            >
              <Bell className="w-5 h-5" />
              {notificationsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {notificationsCount}
                </Badge>
              )}
            </Button>

            {/* Menu użytkownika */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">
                      {user.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Ustawienia
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Wyloguj się
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobilne menu nawigacyjne */}
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="flex justify-around py-2">
          {navigationItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => navigateTo(item.id as PageType)}
                className={`flex flex-col items-center space-y-1 p-2 ${
                  isActive ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </header>
  );
}