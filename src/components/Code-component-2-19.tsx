import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, Users, TrendingUp, Activity, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

type PageType = 'groups' | 'calendar' | 'class-details' | 'group-details';

interface DashboardProps {
  navigateTo: (page: PageType, options?: { groupId?: string; classId?: string }) => void;
}

const upcomingClasses = [
  {
    id: '1',
    name: 'Kółko Matematyczne - Grupa A',
    time: 'Dziś 15:00-16:00',
    room: 'Sala 201',
    status: 'prepared',
    groupId: '1'
  },
  {
    id: '2',
    name: 'Teatr Szkolny',
    time: 'Jutro 14:00-15:30',
    room: 'Aula',
    status: 'in-progress',
    groupId: '2'
  },
  {
    id: '3',
    name: 'Robotyka - Początkujący',
    time: '15.01 16:00-17:00',
    room: 'Lab. 5',
    status: 'not-prepared',
    groupId: '3'
  },
  {
    id: '4',
    name: 'Kółko Angielskie',
    time: '16.01 15:00-16:00',
    room: 'Sala 103',
    status: 'prepared',
    groupId: '4'
  },
  {
    id: '5',
    name: 'Chór Szkolny',
    time: '17.01 16:00-17:00',
    room: 'Sala muzyczna',
    status: 'prepared',
    groupId: '5'
  },
];

const recentActivity = [
  'Dodano 3 uczniów do grupy Robotyka',
  'Zaktualizowano materiały - Teatr Szkolny',
  'Sprawdzono frekwencję - Kółko Matematyczne',
  'Utworzono nowe zajęcia - Kółko Angielskie',
];

const stats = [
  { label: 'Aktywne grupy', value: '6', icon: Users, color: 'text-blue-600' },
  { label: 'Uczniów łącznie', value: '87', icon: TrendingUp, color: 'text-green-600' },
  { label: 'Zajęć w tym tygodniu', value: '12', icon: Calendar, color: 'text-orange-600' },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'prepared':
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="w-3 h-3 mr-1" />
          Przygotowane
        </Badge>
      );
    case 'in-progress':
      return (
        <Badge variant="outline" className="text-blue-600 border-blue-600">
          <AlertCircle className="w-3 h-3 mr-1" />
          W trakcie
        </Badge>
      );
    case 'not-prepared':
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="w-3 h-3 mr-1" />
          Do przygotowania
        </Badge>
      );
    default:
      return null;
  }
}

export function Dashboard({ navigateTo }: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Powitanie */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900">Witaj, Anna!</h1>
          <p className="text-gray-600 mt-1">Dziś masz 4 zajęcia</p>
        </div>
        <Button 
          onClick={() => navigateTo('calendar')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Zobacz kalendarz
        </Button>
      </div>

      {/* Szybkie statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Nadchodzące zajęcia */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Nadchodzące zajęcia</span>
              </CardTitle>
              <CardDescription>
                Twoje najbliższe zaplanowane zajęcia
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                  onClick={() => navigateTo('class-details', { classId: classItem.id })}
                >
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-1">{classItem.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(classItem.status)}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('group-details', { groupId: classItem.groupId });
                      }}
                    >
                      Szczegóły
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Panel boczny */}
        <div className="space-y-6">
          {/* Mini kalendarz */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Styczeń 2025</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'].map((day) => (
                  <div key={day} className="p-2 text-gray-600">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasClasses = [13, 14, 15, 16, 17].includes(day);
                  const isToday = day === 13;
                  return (
                    <div
                      key={day}
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        isToday
                          ? 'bg-blue-600 text-white'
                          : hasClasses
                          ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigateTo('calendar')}
              >
                Zobacz pełny kalendarz
              </Button>
            </CardContent>
          </Card>

          {/* Ostatnia aktywność */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                <span>Ostatnia aktywność</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-600">{activity}</p>
                </div>
              ))}
              <Button 
                variant="link" 
                className="w-full p-0 h-auto text-blue-600"
                onClick={() => navigateTo('groups')}
              >
                Zobacz wszystkie aktywności
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}