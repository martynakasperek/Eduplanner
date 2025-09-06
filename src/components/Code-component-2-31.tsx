import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  ArrowLeft, 
  Search, 
  UserPlus, 
  Eye, 
  Edit, 
  X, 
  CheckCircle, 
  XCircle,
  MessageSquare,
  Users
} from 'lucide-react';

type PageType = 'group-details';

interface StudentsListProps {
  groupId?: string;
  navigateTo: (page: PageType, options?: { groupId?: string }) => void;
}

const students = [
  {
    id: '1',
    firstName: 'Anna',
    lastName: 'Kowalska',
    class: '4A',
    attendance: 95,
    attendanceCount: '19/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '2',
    firstName: 'Piotr',
    lastName: 'Nowak',
    class: '4B',
    attendance: 85,
    attendanceCount: '17/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '3',
    firstName: 'Maria',
    lastName: 'Wiśniewska',
    class: '5A',
    attendance: 100,
    attendanceCount: '20/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '4',
    firstName: 'Jan',
    lastName: 'Kowalczyk',
    class: '4A',
    attendance: 70,
    attendanceCount: '14/20',
    status: 'absent',
    lastPresence: '03.01.2025',
    present: false
  },
  {
    id: '5',
    firstName: 'Karolina',
    lastName: 'Zielińska',
    class: '5B',
    attendance: 90,
    attendanceCount: '18/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '6',
    firstName: 'Tomasz',
    lastName: 'Lewandowski',
    class: '4C',
    attendance: 80,
    attendanceCount: '16/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '7',
    firstName: 'Magdalena',
    lastName: 'Wójcik',
    class: '5A',
    attendance: 95,
    attendanceCount: '19/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '8',
    firstName: 'Michał',
    lastName: 'Kowalski',
    class: '4B',
    attendance: 75,
    attendanceCount: '15/20',
    status: 'active',
    lastPresence: '08.01.2025',
    present: true
  },
  {
    id: '9',
    firstName: 'Aleksandra',
    lastName: 'Nowakiewicz',
    class: '5C',
    attendance: 85,
    attendanceCount: '17/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '10',
    firstName: 'Bartosz',
    lastName: 'Jankowski',
    class: '4A',
    attendance: 90,
    attendanceCount: '18/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '11',
    firstName: 'Julia',
    lastName: 'Mazurek',
    class: '5B',
    attendance: 100,
    attendanceCount: '20/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '12',
    firstName: 'Dawid',
    lastName: 'Stępień',
    class: '4C',
    attendance: 65,
    attendanceCount: '13/20',
    status: 'active',
    lastPresence: '05.01.2025',
    present: false
  },
  {
    id: '13',
    firstName: 'Natalia',
    lastName: 'Bąk',
    class: '5A',
    attendance: 95,
    attendanceCount: '19/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '14',
    firstName: 'Łukasz',
    lastName: 'Górski',
    class: '4B',
    attendance: 80,
    attendanceCount: '16/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  },
  {
    id: '15',
    firstName: 'Zuzanna',
    lastName: 'Sikora',
    class: '5C',
    attendance: 90,
    attendanceCount: '18/20',
    status: 'active',
    lastPresence: '10.01.2025',
    present: true
  }
];

export function StudentsList({ groupId = '1', navigateTo }: StudentsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState('');

  const filteredStudents = students.filter(student => 
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedStudents(filteredStudents.map(s => s.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    }
  };

  const handleBulkAction = () => {
    if (bulkAction && selectedStudents.length > 0) {
      console.log(`Wykonanie akcji ${bulkAction} dla ${selectedStudents.length} uczniów`);
      setSelectedStudents([]);
      setBulkAction('');
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string, present: boolean) => {
    if (status === 'absent') {
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="w-3 h-3 mr-1" />
          Nieobecny
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-green-600 border-green-600">
        <CheckCircle className="w-3 h-3 mr-1" />
        Aktywna
      </Badge>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateTo('group-details', { groupId })}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl text-gray-900">Uczniowie - Kółko Matematyczne Grupa A</h1>
          <p className="text-gray-600 mt-1">Zarządzaj uczniami w grupie</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Dodaj ucznia
        </Button>
      </div>

      {/* Wyszukiwanie i akcje masowe */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Szukaj uczniów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {selectedStudents.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Zaznaczono: {selectedStudents.length}
                </span>
                <Select value={bulkAction} onValueChange={setBulkAction}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Akcje dla zaznaczonych" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Oznacz obecność</SelectItem>
                    <SelectItem value="absent">Oznacz nieobecność</SelectItem>
                    <SelectItem value="message">Wyślij wiadomość</SelectItem>
                    <SelectItem value="remove">Usuń z grupy</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleBulkAction} size="sm">
                  Wykonaj
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela uczniów */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Lista uczniów ({filteredStudents.length})</span>
          </CardTitle>
          <CardDescription>
            Frekwencja i status uczniów w grupie
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Imię i Nazwisko</TableHead>
                  <TableHead>Klasa</TableHead>
                  <TableHead>Frekwencja</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ostatnia obecność</TableHead>
                  <TableHead className="text-right">Akcje</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm text-blue-600">
                          {student.firstName[0]}{student.lastName[0]}
                        </div>
                        <span className="text-gray-900">
                          {student.firstName} {student.lastName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-gray-600">
                        {student.class}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className={getAttendanceColor(student.attendance)}>
                          {student.attendance}%
                        </span>
                        <span className="text-xs text-gray-500">
                          ({student.attendanceCount})
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(student.status, student.present)}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {student.lastPresence}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg text-gray-900 mb-2">Brak uczniów</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Nie znaleziono uczniów pasujących do wyszukiwania.' : 'Nie ma jeszcze uczniów w tej grupie.'}
              </p>
              {!searchQuery && (
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Dodaj pierwszego ucznia
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Statystyki frekwencji */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl text-green-600">
                {students.filter(s => s.attendance >= 90).length}
              </p>
              <p className="text-sm text-gray-600">Wysoka frekwencja (≥90%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl text-yellow-600">
                {students.filter(s => s.attendance >= 80 && s.attendance < 90).length}
              </p>
              <p className="text-sm text-gray-600">Średnia frekwencja (80-89%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl text-red-600">
                {students.filter(s => s.attendance < 80).length}
              </p>
              <p className="text-sm text-gray-600">Niska frekwencja (<80%)</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl text-blue-600">
                {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
              </p>
              <p className="text-sm text-gray-600">Średnia grupy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}