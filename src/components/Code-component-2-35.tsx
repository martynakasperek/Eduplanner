import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin,
  List,
  Grid3X3
} from 'lucide-react';

type PageType = 'create-class' | 'class-details';

interface CalendarProps {
  navigateTo: (page: PageType, options?: { classId?: string }) => void;
}

const classTypes = {
  'math': { name: 'Kółko Mat.', color: 'bg-blue-500', textColor: 'text-blue-600' },
  'theater': { name: 'Teatr', color: 'bg-green-500', textColor: 'text-green-600' },
  'robotics': { name: 'Robotyka', color: 'bg-orange-500', textColor: 'text-orange-600' },
  'english': { name: 'Angielski', color: 'bg-purple-500', textColor: 'text-purple-600' },
  'choir': { name: 'Chór', color: 'bg-pink-500', textColor: 'text-pink-600' },
  'photo': { name: 'Fotografia', color: 'bg-yellow-500', textColor: 'text-yellow-600' }
};

const calendarEvents = [
  {
    id: '1',
    title: 'Kółko Mat. A',
    type: 'math',
    time: '15:00-16:00',
    room: 'Sala 201',
    date: 14,
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'Teatr',
    type: 'theater',
    time: '14:00-15:30',
    room: 'Aula',
    date: 14,
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'Robotyka',
    type: 'robotics',
    time: '16:00-17:00',
    room: 'Lab. 5',
    date: 15,
    status: 'scheduled'
  },
  {
    id: '4',
    title: 'Angielski',
    type: 'english',
    time: '15:00-16:00',
    room: 'Sala 103',
    date: 16,
    status: 'completed'
  },
  {
    id: '5',
    title: 'Chór',
    type: 'choir',
    time: '16:00-17:00',
    room: 'Sala muzyczna',
    date: 17,
    status: 'scheduled'
  },
  {
    id: '6',
    title: 'Kółko Mat. A',
    type: 'math',
    time: '15:00-16:00',
    room: 'Sala 201',
    date: 17,
    status: 'scheduled'
  },
  {
    id: '7',
    title: 'Fotografia',
    type: 'photo',
    time: '15:30-16:30',
    room: 'Sala 205',
    date: 18,
    status: 'scheduled'
  }
];

const monthNames = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

const dayNames = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'];

export function Calendar({ navigateTo }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(13);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Convert Sunday (0) to 6, others shift by 1
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getEventsForDate = (date: number) => {
    return calendarEvents.filter(event => event.date === date);
  };

  const getEventsForSelectedDate = () => {
    return calendarEvents.filter(event => event.date === selectedDate);
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const totalCells = Math.ceil((daysInMonth + firstDay) / 7) * 7;

    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - firstDay + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday = dayNumber === 13 && currentMonth === 0; // Mock today as 13th January
      const isSelected = dayNumber === selectedDate;
      const events = isCurrentMonth ? getEventsForDate(dayNumber) : [];

      cells.push(
        <div
          key={i}
          className={`min-h-[100px] p-2 border border-gray-200 cursor-pointer transition-colors ${
            !isCurrentMonth 
              ? 'bg-gray-50 text-gray-400' 
              : isSelected 
              ? 'bg-blue-50 border-blue-300' 
              : 'hover:bg-gray-50'
          }`}
          onClick={() => isCurrentMonth && setSelectedDate(dayNumber)}
        >
          {isCurrentMonth && (
            <>
              <div className={`text-sm mb-2 ${
                isToday 
                  ? 'w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center' 
                  : isSelected 
                  ? 'text-blue-600' 
                  : 'text-gray-700'
              }`}>
                {dayNumber}
              </div>
              <div className="space-y-1">
                {events.slice(0, 3).map((event, index) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded text-white truncate cursor-pointer ${
                      classTypes[event.type as keyof typeof classTypes].color
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateTo('class-details', { classId: event.id });
                    }}
                  >
                    {event.time} {event.title}
                  </div>
                ))}
                {events.length > 3 && (
                  <div className="text-xs text-gray-500">
                    +{events.length - 3} więcej
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-gray-900">Kalendarz zajęć</h1>
          <p className="text-gray-600 mt-1">Zarządzaj harmonogramem swoich zajęć</p>
        </div>
        <Button 
          onClick={() => navigateTo('create-class')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nowe zajęcia
        </Button>
      </div>

      {/* Navigation and view controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl text-gray-900 min-w-[200px] text-center">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button 
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                <Grid3X3 className="w-4 h-4 mr-1" />
                Miesiąc
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1" />
                Lista
              </Button>
              <Button variant="outline" size="sm">
                Dziś
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main calendar */}
        <div className="lg:col-span-3">
          {viewMode === 'month' ? (
            <Card>
              <CardContent className="p-0">
                {/* Calendar header */}
                <div className="grid grid-cols-7 border-b">
                  {dayNames.map((day) => (
                    <div key={day} className="p-4 text-center text-sm text-gray-600 border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar grid */}
                <div className="grid grid-cols-7">
                  {renderCalendarGrid()}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Lista zajęć</CardTitle>
                <CardDescription>
                  Wszystkie zaplanowane zajęcia w {monthNames[currentMonth]} {currentYear}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {calendarEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => navigateTo('class-details', { classId: event.id })}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full ${classTypes[event.type as keyof typeof classTypes].color}`} />
                      <div>
                        <h4 className="text-gray-900">{event.title}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{event.date}.01.2025</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{event.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Badge variant={event.status === 'completed' ? 'default' : 'outline'}>
                      {event.status === 'completed' ? 'Zakończone' : 'Zaplanowane'}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected date events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CalendarIcon className="w-5 h-5" />
                <span>{selectedDate} {monthNames[currentMonth]}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => navigateTo('class-details', { classId: event.id })}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`w-3 h-3 rounded-full ${classTypes[event.type as keyof typeof classTypes].color}`} />
                      <span className="text-sm text-gray-900">{event.title}</span>
                    </div>
                    <div className="text-xs text-gray-600 ml-5">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{event.room}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Brak zajęć w tym dniu
                </p>
              )}
            </CardContent>
          </Card>

          {/* Legend */}
          <Card>
            <CardHeader>
              <CardTitle>Legenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(classTypes).map(([key, type]) => (
                <div key={key} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <span className="text-sm text-gray-700">{type.name}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Szybkie akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigateTo('create-class')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj zajęcia
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Eksportuj kalendarz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}