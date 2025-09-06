import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Filter,
  List,
  Grid
} from 'lucide-react';
import { AppState } from '../App';

interface CalendarProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
}

export function Calendar({ state, navigate }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 0, 1)); // January 2025
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [filterGroup, setFilterGroup] = useState('all');

  const { classes, groups } = state;

  // Get current month info
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
  ];

  const dayNames = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb'];

  // Filter classes by selected group
  const filteredClasses = classes.filter(classItem => 
    filterGroup === 'all' || classItem.groupId === filterGroup
  );

  // Get classes for a specific date
  const getClassesForDate = (date: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return filteredClasses.filter(classItem => classItem.date === dateStr);
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 0, 14)); // Today is January 14, 2025
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Przygotowane':
        return 'bg-green-600';
      case 'W trakcie':
        return 'bg-blue-600';
      case 'Do przygotowania':
        return 'bg-red-600';
      case 'Zakończone':
        return 'bg-gray-600';
      default:
        return 'bg-gray-400';
    }
  };

  const renderMonthView = () => {
    const days = [];
    
    // Add empty cells for days before first day of month
    const startDay = firstDayWeekday === 0 ? 7 : firstDayWeekday; // Convert Sunday (0) to 7
    for (let i = 1; i < startDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="min-h-32 border border-gray-200 bg-gray-50"></div>
      );
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === 14; // Today is January 14
      const dayClasses = getClassesForDate(day);
      
      days.push(
        <div key={day} className="min-h-32 border border-gray-200 bg-white p-2">
          <div className={`text-sm font-medium mb-2 ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
            {day}
            {isToday && (
              <span className="ml-1 text-xs bg-blue-600 text-white px-1 rounded">
                Dziś
              </span>
            )}
          </div>
          
          <div className="space-y-1">
            {dayClasses.map((classItem) => (
              <div
                key={classItem.id}
                className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                style={{ backgroundColor: classItem.color + '20', borderLeft: `3px solid ${classItem.color}` }}
                onClick={() => navigate('class-details', { selectedClassId: classItem.id })}
              >
                <div className="font-medium text-gray-900 truncate">
                  {classItem.time.split('-')[0]}
                </div>
                <div className="text-gray-600 truncate">
                  {classItem.groupName}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {/* Day headers */}
        {dayNames.map((dayName, index) => (
          <div key={dayName} className={`p-3 text-center font-medium bg-gray-50 border-b border-gray-200 ${index === 0 || index === 6 ? 'text-red-600' : 'text-gray-900'}`}>
            {dayName}
          </div>
        ))}
        {/* Calendar days */}
        {days}
      </div>
    );
  };

  const renderListView = () => {
    const sortedClasses = [...filteredClasses].sort((a, b) => 
      new Date(a.date + ' ' + a.time.split('-')[0]).getTime() - 
      new Date(b.date + ' ' + b.time.split('-')[0]).getTime()
    );

    return (
      <div className="space-y-4">
        {sortedClasses.map((classItem) => (
          <Card 
            key={classItem.id} 
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate('class-details', { selectedClassId: classItem.id })}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-1 h-16 rounded-full"
                    style={{ backgroundColor: classItem.color }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{classItem.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{classItem.groupName}</p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(classItem.date).toLocaleDateString('pl-PL', { 
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long'
                        })}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {classItem.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {classItem.room}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(classItem.status) + ' text-white'}
                  >
                    {classItem.status}
                  </Badge>
                  {classItem.date === '2025-01-14' && (
                    <Badge variant="outline" className="text-blue-600 border-blue-600">
                      Dziś
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {sortedClasses.length === 0 && (
          <div className="text-center py-12">
            <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak zajęć</h3>
            <p className="text-gray-600 mb-4">
              {filterGroup !== 'all' 
                ? 'Brak zajęć dla wybranej grupy w tym okresie' 
                : 'Nie ma zaplanowanych zajęć w tym okresie'}
            </p>
            <Button onClick={() => navigate('create-class')}>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj zajęcia
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kalendarz zajęć</h1>
          <p className="text-gray-600 mt-1">Przeglądaj i zarządzaj harmonogramem zajęć</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            onClick={() => navigate('create-class')}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nowe zajęcia
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {/* Month Navigation */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold min-w-48 text-center">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <Button variant="outline" size="sm" onClick={goToToday}>
            Dziś
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {/* Group Filter */}
          <Select value={filterGroup} onValueChange={setFilterGroup}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie grupy</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group.id} value={group.id}>
                  {group.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="flex items-center border rounded-lg">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4 mr-1" />
              Miesiąc
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4 mr-1" />
              Lista
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar/List View */}
        <div className="lg:col-span-3">
          {viewMode === 'month' ? renderMonthView() : renderListView()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Dzisiejsze zajęcia</CardTitle>
              <CardDescription>14 stycznia 2025</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredClasses.filter(c => c.date === '2025-01-14').length === 0 ? (
                <p className="text-gray-500 text-center py-4">Brak zajęć na dziś</p>
              ) : (
                <div className="space-y-3">
                  {filteredClasses
                    .filter(c => c.date === '2025-01-14')
                    .map((classItem) => (
                      <div
                        key={classItem.id}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate('class-details', { selectedClassId: classItem.id })}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{classItem.time}</span>
                          <Badge 
                            variant="secondary"
                            className={getStatusColor(classItem.status) + ' text-white text-xs'}
                          >
                            {classItem.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{classItem.groupName}</p>
                        <p className="text-xs text-gray-500">{classItem.room}</p>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {groups.slice(0, 6).map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <span className="text-sm text-gray-700">{group.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statystyki</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Zajęć w tym miesiącu:</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Aktywne grupy:</span>
                <span className="font-semibold">{groups.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Godzin łącznie:</span>
                <span className="font-semibold">36h</span>
              </div>
              <div className="pt-2 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => navigate('reports')}
                >
                  Zobacz raporty
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}