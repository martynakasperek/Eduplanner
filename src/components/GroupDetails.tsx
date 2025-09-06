import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { 
  ArrowLeft,
  Edit,
  UserPlus,
  Plus,
  Archive,
  Users,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  Target,
  BookOpen,
  Settings,
  TrendingUp,
  FileText
} from 'lucide-react';
import { AppState } from '../App';

interface GroupDetailsProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export function GroupDetails({ state, navigate, updateState }: GroupDetailsProps) {
  const [activeTab, setActiveTab] = useState('info');
  
  const { selectedGroupId, groups, students, classes } = state;
  const group = groups.find(g => g.id === selectedGroupId);
  const groupStudents = students[selectedGroupId || ''] || [];
  const groupClasses = classes.filter(c => c.groupId === selectedGroupId);

  if (!group) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Grupa nie została znaleziona</h2>
        <Button onClick={() => navigate('groups')} className="mt-4">
          Powrót do listy grup
        </Button>
      </div>
    );
  }

  const averageAttendance = groupStudents.length > 0 
    ? Math.round(groupStudents.reduce((sum, student) => sum + student.attendance, 0) / groupStudents.length)
    : 0;

  const totalClasses = groupStudents.length > 0 ? groupStudents[0].totalClasses : 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('groups')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <div className="flex items-center space-x-3">
            <div 
              className="w-6 h-6 rounded-full"
              style={{ backgroundColor: group.color }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <Badge variant={group.status === 'Aktywna' ? 'default' : 'secondary'}>
                  {group.status}
                </Badge>
                <span className="text-gray-500">ID: {group.id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edytuj grupę
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('students', { selectedGroupId: group.id })}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Dodaj ucznia
          </Button>
          <Button 
            size="sm"
            onClick={() => navigate('create-class', { selectedGroupId: group.id })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nowe zajęcia
          </Button>
          <Button variant="destructive" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archiwizuj
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="info">Informacje</TabsTrigger>
              <TabsTrigger value="students">Uczniowie</TabsTrigger>
              <TabsTrigger value="schedule">Harmonogram</TabsTrigger>
              <TabsTrigger value="materials">Materiały</TabsTrigger>
              <TabsTrigger value="attendance">Frekwencja</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Opis grupy
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {group.description}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Cele edukacyjne
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Rozwijanie umiejętności matematycznych uczniów
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Przygotowanie do konkursów matematycznych
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Budowanie pewności siebie w rozwiązywaniu problemów
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        Rozwijanie logicznego myślenia i kreatywności
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Wymagane materiały
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Podstawowe:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Zeszyt w kratkę</li>
                          <li>• Długopis, ołówek</li>
                          <li>• Linijka, cyrkiel</li>
                          <li>• Kalkulator</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Dodatkowe:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Zbiór zadań matematycznych</li>
                          <li>• Kartki do rysowania</li>
                          <li>• Kolorowe długopisy</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Informacje o sali i sprzęcie
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Sala {group.room}</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Pojemność: 25 miejsc</li>
                          <li>• Tablica interaktywna</li>
                          <li>• Projektor multimedialny</li>
                          <li>• Klimatyzacja</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Dostępny sprzęt:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Kalkulatory naukowe (20 szt.)</li>
                          <li>• Przybory geometryczne</li>
                          <li>• Laptop z oprogramowaniem</li>
                          <li>• Materiały do eksperymentów</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Historia grupy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Data utworzenia:</span>
                        <span className="font-medium">15 września 2024</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Liczba przeprowadzonych zajęć:</span>
                        <span className="font-medium">{totalClasses} zajęć</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Ostatnia aktualizacja:</span>
                        <span className="font-medium">13 stycznia 2025</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Lista uczniów</CardTitle>
                  <CardDescription>
                    Zarządzaj uczniami zapisanymi do tej grupy
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {groupStudents.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">Klasa {student.class}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">
                            Frekwencja: {student.attendance}%
                          </span>
                          <Badge variant={student.status === 'Aktywna' ? 'default' : 'destructive'}>
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate('students', { selectedGroupId: group.id })}
                    >
                      Zobacz wszystkich uczniów ({groupStudents.length})
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Harmonogram zajęć</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Stały harmonogram</h4>
                      <p className="text-gray-600">{group.schedule}</p>
                      <p className="text-gray-600">Sala: {group.room}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Nadchodzące zajęcia</h4>
                      <div className="space-y-2">
                        {groupClasses.map((classItem) => (
                          <div key={classItem.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <p className="font-medium">{classItem.title}</p>
                              <p className="text-sm text-gray-500">
                                {classItem.date} • {classItem.time} • {classItem.room}
                              </p>
                            </div>
                            <Badge className={
                              classItem.status === 'Przygotowane' ? 'bg-green-100 text-green-800' :
                              classItem.status === 'W trakcie' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {classItem.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="materials" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Materiały do zajęć</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak materiałów</h3>
                    <p className="text-gray-600 mb-4">Dodaj materiały, prezentacje i zadania dla tej grupy</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Dodaj materiały
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analiza frekwencji</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900">Średnia frekwencja</h4>
                        <p className="text-2xl font-bold text-blue-600">{averageAttendance}%</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-900">Najlepsza frekwencja</h4>
                        <p className="text-2xl font-bold text-green-600">100%</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-medium text-red-900">Najgorsza frekwencja</h4>
                        <p className="text-2xl font-bold text-red-600">70%</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Frekwencja w czasie</h4>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-center text-gray-500">
                          Wykres frekwencji będzie dostępny po dodaniu większej ilości danych
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Szybkie informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Liczba uczniów:</span>
                <span className="font-semibold">{group.studentsCount}/{group.maxStudents}</span>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Zapełnienie:</span>
                  <span className="text-sm font-medium">
                    {Math.round((group.studentsCount / group.maxStudents) * 100)}%
                  </span>
                </div>
                <Progress 
                  value={(group.studentsCount / group.maxStudents) * 100} 
                  className="h-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Następne zajęcia:</span>
                <span className="font-semibold">Wtorek 15:00</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sala:</span>
                <span className="font-semibold">{group.room}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Średnia frekwencja:</span>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{averageAttendance}%</span>
                  {averageAttendance >= 90 && <TrendingUp className="h-4 w-4 text-green-600" />}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Ostatnia aktualizacja:</span>
                <span className="font-semibold">13.01.2025</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Szybkie akcje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('create-class', { selectedGroupId: group.id })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Dodaj zajęcia
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => navigate('students', { selectedGroupId: group.id })}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Dodaj ucznia
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Zobacz kalendarz
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Generuj raport
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}