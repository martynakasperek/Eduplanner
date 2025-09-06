import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { 
  ArrowLeft,
  Search,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
  Mail,
  CheckCircle,
  XCircle,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { AppState } from '../App';
import { toast } from 'sonner@2.0.3';

interface StudentsListProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export function StudentsList({ state, navigate, updateState }: StudentsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterStatus, setFilterStatus] = useState('all');

  const { selectedGroupId, groups, students } = state;
  const group = groups.find(g => g.id === selectedGroupId);
  const groupStudents = students[selectedGroupId || ''] || [];

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

  const filteredStudents = groupStudents
    .filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           student.class.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterStatus === 'all' || 
                           (filterStatus === 'active' && student.status === 'Aktywna') ||
                           (filterStatus === 'inactive' && student.status === 'Nieobecny');
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'class':
          return a.class.localeCompare(b.class);
        case 'attendance':
          return b.attendance - a.attendance;
        case 'lastAttendance':
          return new Date(b.lastAttendance).getTime() - new Date(a.lastAttendance).getTime();
        default:
          return 0;
      }
    });

  const handleSelectAll = (checked: boolean) => {
    setSelectedStudents(checked ? filteredStudents.map(s => s.id) : []);
  };

  const handleSelectStudent = (studentId: string, checked: boolean) => {
    setSelectedStudents(prev => 
      checked 
        ? [...prev, studentId]
        : prev.filter(id => id !== studentId)
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'present':
        toast.success(`Oznaczono ${selectedStudents.length} uczniów jako obecnych`);
        setSelectedStudents([]);
        break;
      case 'absent':
        toast.success(`Oznaczono ${selectedStudents.length} uczniów jako nieobecnych`);
        setSelectedStudents([]);
        break;
      case 'message':
        toast.info(`Funkcja wysyłania wiadomości będzie dostępna wkrótce`);
        break;
      case 'remove':
        toast.success(`Usunięto ${selectedStudents.length} uczniów z grupy`);
        setSelectedStudents([]);
        break;
    }
  };

  const averageAttendance = groupStudents.length > 0 
    ? Math.round(groupStudents.reduce((sum, student) => sum + student.attendance, 0) / groupStudents.length)
    : 0;

  const activeStudents = groupStudents.filter(s => s.status === 'Aktywna').length;
  const highAttendance = groupStudents.filter(s => s.attendance >= 90).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('group-details', { selectedGroupId })}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Powrót
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Uczniowie - {group.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Zarządzaj uczniami zapisanymi do tej grupy
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Eksportuj
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Dodaj ucznia
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wszyscy uczniowie</p>
                <p className="text-2xl font-bold text-gray-900">{groupStudents.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Aktywni uczniowie</p>
                <p className="text-2xl font-bold text-green-600">{activeStudents}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Średnia frekwencja</p>
                <p className="text-2xl font-bold text-blue-600">{averageAttendance}%</p>
              </div>
              {averageAttendance >= 90 ? (
                <TrendingUp className="h-8 w-8 text-green-600" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-600" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Wysoka frekwencja</p>
                <p className="text-2xl font-bold text-purple-600">{highAttendance}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-1">≥90%</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Szukaj uczniów..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sortuj: Imię i nazwisko</SelectItem>
              <SelectItem value="class">Sortuj: Klasa</SelectItem>
              <SelectItem value="attendance">Sortuj: Frekwencja</SelectItem>
              <SelectItem value="lastAttendance">Sortuj: Ostatnia obecność</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszyscy</SelectItem>
              <SelectItem value="active">Aktywni</SelectItem>
              <SelectItem value="inactive">Nieobecni</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedStudents.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              Zaznaczono: {selectedStudents.length}
            </span>
            <Select onValueChange={handleBulkAction}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Akcje dla zaznaczonych" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Oznacz jako obecnych</SelectItem>
                <SelectItem value="absent">Oznacz jako nieobecnych</SelectItem>
                <SelectItem value="message">Wyślij wiadomość</SelectItem>
                <SelectItem value="remove">Usuń z grupy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Students Table */}
      <Card>
        <CardContent className="p-0">
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
                <TableHead className="w-20">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleSelectStudent(student.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium">{student.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{student.class}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {student.attendance}% ({Math.round(student.totalClasses * student.attendance / 100)}/{student.totalClasses})
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              student.attendance >= 90 ? 'bg-green-500' :
                              student.attendance >= 75 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${student.attendance}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={student.status === 'Aktywna' ? 'default' : 'destructive'}
                      className={student.status === 'Aktywna' ? 'bg-green-600' : ''}
                    >
                      {student.status === 'Aktywna' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">{student.lastAttendance}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          Szczegóły
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edytuj
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Kontakt
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Usuń z grupy
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery || filterStatus !== 'all' ? 'Brak wyników' : 'Brak uczniów'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus !== 'all' 
              ? 'Spróbuj zmienić kryteria wyszukiwania' 
              : 'Dodaj pierwszych uczniów do tej grupy'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Dodaj pierwszego ucznia
            </Button>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">
            Wyświetlono {filteredStudents.length} z {groupStudents.length} uczniów
          </span>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Średnia frekwencja grupy: <span className="font-medium">{averageAttendance}%</span>
            </span>
            <Badge variant={averageAttendance >= 90 ? 'default' : 'destructive'}>
              {averageAttendance >= 90 ? 'Wysoka' : 'Do poprawy'}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}