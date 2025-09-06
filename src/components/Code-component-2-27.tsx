import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  UserPlus, 
  Plus, 
  Archive, 
  Users, 
  MapPin, 
  Calendar, 
  Target,
  BookOpen,
  History,
  TrendingUp
} from 'lucide-react';

type PageType = 'groups' | 'student-list' | 'create-class';

interface GroupDetailsProps {
  groupId?: string;
  navigateTo: (page: PageType, options?: { groupId?: string }) => void;
}

const groupData = {
  '1': {
    id: '1',
    name: 'Kółko Matematyczne - Grupa A',
    description: 'Zajęcia dla uczniów klas 4-6 rozwijające umiejętności matematyczne poprzez zabawę i praktyczne zastosowania.',
    students: { current: 15, max: 20 },
    room: 'Sala 201',
    schedule: 'Wtorek, Piątek 15:00-16:00',
    status: 'active',
    lastClass: '10.01.2025',
    attendance: 92,
    createdDate: '15.09.2024',
    totalClasses: 45,
    goals: [
      'Rozwijanie logicznego myślenia',
      'Przygotowanie do konkursów matematycznych',
      'Praca z zadaniami problemowymi',
      'Nauka matematyki przez eksperymenty'
    ],
    materials: [
      'Kalkulatory naukowe',
      'Kostki i inne manipulatiwy',
      'Karty z zadaniami',
      'Laptopy (opcjonalnie)'
    ],
    equipment: [
      'Projektor multimedialny',
      'Tablica interaktywna',
      'Zestaw manipulatywów matematycznych'
    ]
  }
};

export function GroupDetails({ groupId = '1', navigateTo }: GroupDetailsProps) {
  const [activeTab, setActiveTab] = useState('info');
  const group = groupData[groupId as keyof typeof groupData] || groupData['1'];

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateTo('groups')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl text-gray-900">{group.name}</h1>
            <Badge 
              variant="outline"
              className="bg-green-100 text-green-800 border-green-300"
            >
              Aktywna
            </Badge>
          </div>
          <p className="text-gray-600 mt-1">{group.description}</p>
        </div>
      </div>

      {/* Przyciski akcji */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Edit className="w-4 h-4 mr-2" />
          Edytuj grupę
        </Button>
        <Button variant="outline">
          <UserPlus className="w-4 h-4 mr-2" />
          Dodaj ucznia
        </Button>
        <Button 
          variant="outline"
          onClick={() => navigateTo('create-class')}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nowe zajęcia
        </Button>
        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
          <Archive className="w-4 h-4 mr-2" />
          Archiwizuj
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Główna zawartość */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="info">Informacje</TabsTrigger>
              <TabsTrigger value="students">Lista uczniów</TabsTrigger>
              <TabsTrigger value="schedule">Harmonogram</TabsTrigger>
              <TabsTrigger value="materials">Materiały</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Cele edukacyjne</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {group.goals.map((goal, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Wymagane materiały</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3">Materiały uczniów:</h4>
                      <ul className="space-y-1">
                        {group.materials.map((material, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900 mb-3">Sprzęt w sali:</h4>
                      <ul className="space-y-1">
                        {group.equipment.map((item, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5" />
                    <span>Historia grupy</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Data utworzenia:</span>
                      <p className="text-gray-900 mt-1">{group.createdDate}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Przeprowadzone zajęcia:</span>
                      <p className="text-gray-900 mt-1">{group.totalClasses}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Ostatnia aktualizacja:</span>
                      <p className="text-gray-900 mt-1">13.01.2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lista uczniów</CardTitle>
                  <CardDescription>
                    Zarządzaj uczniami w grupie
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-900 mb-2">Lista uczniów</h3>
                    <p className="text-gray-600 mb-4">
                      Kliknij przycisk poniżej, aby przejść do pełnej listy uczniów
                    </p>
                    <Button 
                      onClick={() => navigateTo('student-list', { groupId: group.id })}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Zobacz listę uczniów
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Harmonogram zajęć</CardTitle>
                  <CardDescription>
                    Zaplanowane zajęcia dla tej grupy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-900 mb-2">Harmonogram</h3>
                    <p className="text-gray-600 mb-4">
                      Zajęcia odbywają się: {group.schedule}
                    </p>
                    <Button 
                      onClick={() => navigateTo('create-class')}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Zaplanuj nowe zajęcia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Materiały dydaktyczne</CardTitle>
                  <CardDescription>
                    Pliki i zasoby dla tej grupy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg text-gray-900 mb-2">Materiały</h3>
                    <p className="text-gray-600 mb-4">
                      Tutaj znajdziesz wszystkie materiały dla grupy
                    </p>
                    <Button variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Dodaj materiał
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Panel boczny - informacje szybkie */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Szybkie informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Liczba uczniów:</span>
                  <span className="text-gray-900">{group.students.current}/{group.students.max}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${(group.students.current / group.students.max) * 100}%`
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-600">Następne zajęcia:</span>
                    <p className="text-gray-900">Wtorek 15:00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-600">Sala:</span>
                    <p className="text-gray-900">{group.room}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-600">Średnia frekwencja:</span>
                    <p className={`${getAttendanceColor(group.attendance)}`}>
                      {group.attendance}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <History className="w-4 h-4 text-gray-500" />
                  <div>
                    <span className="text-gray-600">Ostatnia aktualizacja:</span>
                    <p className="text-gray-900">13.01.2025</p>
                  </div>
                </div>
              </div>

              <Separator />

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => navigateTo('student-list', { groupId: group.id })}
              >
                <Users className="w-4 h-4 mr-2" />
                Zobacz uczniów
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}