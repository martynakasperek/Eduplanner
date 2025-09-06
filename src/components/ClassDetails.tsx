import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft,
  Edit,
  Copy,
  X,
  CheckCircle,
  Clock,
  MapPin,
  Users,
  Target,
  BookOpen,
  FileText,
  Link,
  Save,
  Calendar as CalendarIcon,
  Star,
  AlertCircle
} from 'lucide-react';
import { AppState } from '../App';
import { toast } from 'sonner@2.0.3';

interface ClassDetailsProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export function ClassDetails({ state, navigate, updateState }: ClassDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [attendanceNotes, setAttendanceNotes] = useState('');
  const [studentAttendance, setStudentAttendance] = useState<Record<string, boolean>>({});

  const { selectedClassId, classes, groups, students } = state;
  const classItem = classes.find(c => c.id === selectedClassId);
  const group = groups.find(g => g.id === classItem?.groupId);
  const groupStudents = students[classItem?.groupId || ''] || [];

  if (!classItem || !group) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Zajęcia nie zostały znalezione</h2>
        <Button onClick={() => navigate('calendar')} className="mt-4">
          Powrót do kalendarza
        </Button>
      </div>
    );
  }

  // Mock data for class details
  const classDetails = {
    description: 'Wprowadzenie do rozwiązywania równań liniowych. Uczniowie poznają podstawowe metody algebraiczne oraz będą ćwiczyć rozwiązywanie równań pierwszego stopnia z jedną niewiadomą.',
    goals: [
      'Zrozumienie pojęcia równania liniowego',
      'Nauka metod rozwiązywania równań pierwszego stopnia',
      'Ćwiczenie praktyczne na przykładach',
      'Zastosowanie równań w zadaniach tekstowych'
    ],
    materials: ['Zeszyt', 'Kalkulator', 'Kartki z zadaniami', 'Tablica'],
    difficulty: 3,
    teacherNotes: 'Pamiętać o przygotowaniu dodatkowych zadań dla szybszych uczniów. Mieć gotowe przykłady z życia codziennego.',
    links: ['https://example.com/material1', 'https://example.com/exercises']
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Przygotowane':
        return 'bg-green-100 text-green-800';
      case 'W trakcie':
        return 'bg-blue-100 text-blue-800';
      case 'Do przygotowania':
        return 'bg-red-100 text-red-800';
      case 'Zakończone':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Przygotowane':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'W trakcie':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'Do przygotowania':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'Zakończone':
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleStudentAttendance = (studentId: string, present: boolean) => {
    setStudentAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const markAllPresent = () => {
    const allPresent = groupStudents.reduce((acc, student) => ({
      ...acc,
      [student.id]: true
    }), {});
    setStudentAttendance(allPresent);
    toast.success('Oznaczono wszystkich uczniów jako obecnych');
  };

  const markAllAbsent = () => {
    const allAbsent = groupStudents.reduce((acc, student) => ({
      ...acc,
      [student.id]: false
    }), {});
    setStudentAttendance(allAbsent);
    toast.success('Oznaczono wszystkich uczniów jako nieobecnych');
  };

  const saveAttendance = () => {
    toast.success('Frekwencja została zapisana');
  };

  const duplicateClass = () => {
    toast.success('Zajęcia zostały zduplikowane');
  };

  const cancelClass = () => {
    toast.success('Zajęcia zostały anulowane');
  };

  const presentCount = Object.values(studentAttendance).filter(Boolean).length;
  const attendanceRate = groupStudents.length > 0 ? Math.round((presentCount / groupStudents.length) * 100) : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('calendar')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div 
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: classItem.color }}
              />
              <h1 className="text-3xl font-bold text-gray-900">{classItem.title}</h1>
              <div className="flex items-center space-x-2">
                {getStatusIcon(classItem.status)}
                <Badge variant="secondary" className={getStatusColor(classItem.status)}>
                  {classItem.status}
                </Badge>
              </div>
            </div>
            <p className="text-gray-600">{classItem.groupName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('create-class', { selectedGroupId: classItem.groupId })}>
            <Edit className="h-4 w-4 mr-2" />
            Edytuj
          </Button>
          <Button variant="outline" size="sm" onClick={duplicateClass}>
            <Copy className="h-4 w-4 mr-2" />
            Duplikuj
          </Button>
          <Button variant="destructive" size="sm" onClick={cancelClass}>
            <X className="h-4 w-4 mr-2" />
            Anuluj
          </Button>
        </div>
      </div>

      {/* Class Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Data</p>
                <p className="font-semibold">{new Date(classItem.date).toLocaleDateString('pl-PL')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Godzina</p>
                <p className="font-semibold">{classItem.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Sala</p>
                <p className="font-semibold">{classItem.room}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Uczniowie</p>
                <p className="font-semibold">{group.studentsCount} osób</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Przegląd</TabsTrigger>
          <TabsTrigger value="attendance">Obecność</TabsTrigger>
          <TabsTrigger value="materials">Materiały</TabsTrigger>
          <TabsTrigger value="notes">Notatki</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Opis zajęć
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    {classDetails.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Cele zajęć
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {classDetails.goals.map((goal, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{goal}</span>
                      </li>
                    ))}
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
                  <div className="flex flex-wrap gap-2">
                    {classDetails.materials.map((material, index) => (
                      <Badge key={index} variant="secondary">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Poziom trudności</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= classDetails.difficulty 
                            ? 'text-yellow-500 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      ({classDetails.difficulty}/5)
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Status zajęć</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Aktualny status:</span>
                      <Badge variant="secondary" className={getStatusColor(classItem.status)}>
                        {classItem.status}
                      </Badge>
                    </div>
                    
                    {classItem.status === 'Do przygotowania' && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                          <span className="text-sm text-red-800">Zajęcia wymagają przygotowania</span>
                        </div>
                      </div>
                    )}

                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => toast.info('Funkcja zmiany statusu będzie dostępna wkrótce')}
                    >
                      Zmień status
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informacje o grupie</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nazwa grupy:</span>
                      <span className="font-medium">{group.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liczba uczniów:</span>
                      <span className="font-medium">{group.studentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Średnia frekwencja:</span>
                      <span className="font-medium">92%</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => navigate('group-details', { selectedGroupId: classItem.groupId })}
                    >
                      Zobacz grupę
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="attendance" className="mt-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Sprawdź obecność</h3>
                <p className="text-gray-600">Oznacz obecnych uczniów na dzisiejszych zajęciach</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={markAllPresent}>
                  Wszyscy obecni
                </Button>
                <Button variant="outline" size="sm" onClick={markAllAbsent}>
                  Wszyscy nieobecni
                </Button>
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{presentCount}</p>
                    <p className="text-sm text-gray-600">Obecni</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{groupStudents.length - presentCount}</p>
                    <p className="text-sm text-gray-600">Nieobecni</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{attendanceRate}%</p>
                    <p className="text-sm text-gray-600">Frekwencja</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Student List */}
            <Card>
              <CardHeader>
                <CardTitle>Lista uczniów</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {groupStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-500">Klasa {student.class} • Frekwencja: {student.attendance}%</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`present-${student.id}`}
                            checked={studentAttendance[student.id] === true}
                            onCheckedChange={(checked) => handleStudentAttendance(student.id, checked as boolean)}
                          />
                          <label htmlFor={`present-${student.id}`} className="text-sm">
                            Obecny
                          </label>
                        </div>
                        
                        <Badge variant={student.status === 'Aktywna' ? 'default' : 'destructive'}>
                          {student.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notatki o nieobecnościach</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Dodaj notatki dotyczące nieobecności uczniów..."
                  value={attendanceNotes}
                  onChange={(e) => setAttendanceNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={saveAttendance}>
                <Save className="h-4 w-4 mr-2" />
                Zapisz obecność
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="materials" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Linki do materiałów</CardTitle>
              </CardHeader>
              <CardContent>
                {classDetails.links.length > 0 ? (
                  <div className="space-y-2">
                    {classDetails.links.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <Link className="h-4 w-4 text-blue-600" />
                        <a href={link} className="text-blue-600 hover:underline text-sm">
                          {link}
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Brak dodatkowych materiałów</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Załączone pliki</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Brak załączonych plików</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Dodaj pliki
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notatki nauczyciela</CardTitle>
              <CardDescription>Prywatne notatki i przypomnienia dotyczące zajęć</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={classDetails.teacherNotes}
                onChange={() => {}}
                rows={6}
                className="mb-4"
              />
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Zapisz notatki
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}