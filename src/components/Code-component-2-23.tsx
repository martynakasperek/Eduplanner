import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Users, MapPin, Calendar, Search, Plus, Eye, Edit, UserCheck } from 'lucide-react';

type PageType = 'group-details' | 'student-list' | 'calendar';

interface GroupsListProps {
  navigateTo: (page: PageType, options?: { groupId?: string }) => void;
}

const groups = [
  {
    id: '1',
    name: 'Kółko Matematyczne - Grupa A',
    description: 'Zajęcia dla uczniów klas 4-6 rozwijające umiejętności matematyczne',
    students: { current: 15, max: 20 },
    room: 'Sala 201',
    schedule: 'Wt, Pt 15:00-16:00',
    status: 'active',
    lastClass: '10.01.2025',
    attendance: 92
  },
  {
    id: '2',
    name: 'Teatr Szkolny',
    description: 'Zajęcia teatralne przygotowujące spektakl na koniec roku',
    students: { current: 22, max: 25 },
    room: 'Aula',
    schedule: 'Śr 14:00-15:30',
    status: 'active',
    lastClass: '11.01.2025',
    attendance: 88
  },
  {
    id: '3',
    name: 'Robotyka - Początkujący',
    description: 'Wprowadzenie do programowania i robotyki dla klas 1-3',
    students: { current: 12, max: 15 },
    room: 'Lab. 5',
    schedule: 'Śr 16:00-17:00',
    status: 'active',
    lastClass: '08.01.2025',
    attendance: 95
  },
  {
    id: '4',
    name: 'Kółko Angielskie',
    description: 'Konwersacje i gry językowe',
    students: { current: 18, max: 20 },
    room: 'Sala 103',
    schedule: 'Pt 15:00-16:00',
    status: 'active',
    lastClass: '10.01.2025',
    attendance: 85
  },
  {
    id: '5',
    name: 'Chór Szkolny',
    description: 'Zajęcia wokalne i przygotowanie do konkursów',
    students: { current: 25, max: 30 },
    room: 'Sala muzyczna',
    schedule: 'Pn 16:00-17:00',
    status: 'active',
    lastClass: '13.01.2025',
    attendance: 78
  },
  {
    id: '6',
    name: 'Koło Fotograficzne',
    description: 'Nauka fotografii i obróbki zdjęć',
    students: { current: 8, max: 12 },
    room: 'Sala 205',
    schedule: 'Czw 15:30-16:30',
    status: 'active',
    lastClass: '09.01.2025',
    attendance: 90
  }
];

export function GroupsList({ navigateTo }: GroupsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && group.status === 'active') ||
                      (activeTab === 'archived' && group.status === 'archived');
    return matchesSearch && matchesTab;
  });

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl text-gray-900">Moje Grupy Zajęciowe</h1>
          <p className="text-gray-600 mt-1">Zarządzaj swoimi grupami i zajęciami</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Dodaj nową grupę
        </Button>
      </div>

      {/* Wyszukiwanie i filtry */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Szukaj grup..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="all">Wszystkie</TabsTrigger>
            <TabsTrigger value="active">Aktywne</TabsTrigger>
            <TabsTrigger value="archived">Archiwalne</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Lista grup */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{group.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {group.description}
                  </CardDescription>
                </div>
                <Badge 
                  variant={group.status === 'active' ? 'default' : 'secondary'}
                  className={group.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                >
                  {group.status === 'active' ? 'Aktywna' : 'Archiwalna'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Informacje podstawowe */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>
                    {group.students.current}/{group.students.max} uczniów
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{group.room}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>{group.schedule}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">Frekwencja:</span>
                  <span className={`${getAttendanceColor(group.attendance)}`}>
                    {group.attendance}%
                  </span>
                </div>
              </div>

              {/* Ostatnie zajęcia */}
              <div className="text-sm text-gray-600">
                <span>Ostatnie zajęcia: {group.lastClass}</span>
              </div>

              {/* Pasek postępu uczniów */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Zapełnienie</span>
                  <span className="text-gray-900">
                    {Math.round((group.students.current / group.students.max) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{
                      width: `${(group.students.current / group.students.max) * 100}%`
                    }}
                  />
                </div>
              </div>

              {/* Przyciski akcji */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('group-details', { groupId: group.id })}
                  className="flex items-center space-x-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Szczegóły</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1"
                >
                  <Edit className="w-3 h-3" />
                  <span>Edytuj</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('student-list', { groupId: group.id })}
                  className="flex items-center space-x-1"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Lista uczniów</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateTo('calendar')}
                  className="flex items-center space-x-1"
                >
                  <Calendar className="w-3 h-3" />
                  <span>Kalendarz</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg text-gray-900 mb-2">Brak grup</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Nie znaleziono grup pasujących do wyszukiwania.' : 'Nie masz jeszcze żadnych grup.'}
          </p>
          {!searchQuery && (
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Dodaj pierwszą grupę
            </Button>
          )}
        </div>
      )}
    </div>
  );
}