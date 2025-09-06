import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  BarChart3,
  Download,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  FileText,
  Mail,
  Printer,
  PieChart,
  Activity
} from 'lucide-react';
import { AppState } from '../App';
import { toast } from 'sonner@2.0.3';

interface ReportsProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
}

export function Reports({ state, navigate }: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState('attendance');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const { groups, students } = state;

  const reportTypes = [
    { id: 'attendance', name: 'Frekwencja grupy', icon: Users },
    { id: 'overview', name: 'Zestawienie wszystkich grup', icon: BarChart3 },
    { id: 'students', name: 'Lista uczniów z danymi', icon: FileText },
    { id: 'schedule', name: 'Harmonogram zajęć', icon: Calendar }
  ];

  // Mock data for reports
  const attendanceData = [
    { month: 'Wrzesień', attendance: 89 },
    { month: 'Październik', attendance: 92 },
    { month: 'Listopad', attendance: 88 },
    { month: 'Grudzień', attendance: 94 },
    { month: 'Styczeń', attendance: 91 }
  ];

  const groupsOverview = groups.map(group => {
    const groupStudents = students[group.id] || [];
    const avgAttendance = groupStudents.length > 0 
      ? Math.round(groupStudents.reduce((sum, s) => sum + s.attendance, 0) / groupStudents.length)
      : 0;
    
    return {
      ...group,
      avgAttendance,
      totalClasses: 20,
      completedClasses: 15
    };
  });

  const generateReport = (format: 'pdf' | 'csv') => {
    toast.success(`Raport został wygenerowany w formacie ${format.toUpperCase()}`);
  };

  const sendReport = () => {
    toast.success('Raport został wysłany na adres email');
  };

  const printReport = () => {
    toast.success('Drukowanie raportu...');
  };

  const renderAttendanceReport = () => {
    const selectedGroupData = selectedGroup === 'all' ? null : groups.find(g => g.id === selectedGroup);
    const selectedGroupStudents = selectedGroupData ? students[selectedGroupData.id] || [] : [];
    
    return (
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Średnia frekwencja</p>
                  <p className="text-2xl font-bold text-blue-600">91%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Najwyższa frekwencja</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Najniższa frekwencja</p>
                  <p className="text-2xl font-bold text-red-600">70%</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Uczniów aktywnych</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {selectedGroupStudents.filter(s => s.status === 'Aktywna').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Trend frekwencji w czasie</CardTitle>
            <CardDescription>Frekwencja w ostatnich miesiącach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="w-24">
                    <span className="text-sm font-medium">{data.month}</span>
                  </div>
                  <div className="flex-1 mx-4">
                    <Progress value={data.attendance} className="h-3" />
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-sm font-medium">{data.attendance}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Student Details */}
        {selectedGroup !== 'all' && selectedGroupStudents.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Szczegółowa frekwencja uczniów</CardTitle>
              <CardDescription>Grupa: {selectedGroupData?.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedGroupStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-600">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">Klasa {student.class}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{student.attendance}%</p>
                        <p className="text-xs text-gray-500">
                          {Math.round(student.totalClasses * student.attendance / 100)}/{student.totalClasses} zajęć
                        </p>
                      </div>
                      <Badge variant={student.attendance >= 90 ? 'default' : student.attendance >= 75 ? 'secondary' : 'destructive'}>
                        {student.attendance >= 90 ? 'Wysoka' : student.attendance >= 75 ? 'Średnia' : 'Niska'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{groups.length}</p>
              <p className="text-sm text-gray-600">Aktywnych grup</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {groups.reduce((sum, group) => sum + group.studentsCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Uczniów łącznie</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">92%</p>
              <p className="text-sm text-gray-600">Średnia frekwencja</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Groups Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Przegląd wszystkich grup</CardTitle>
          <CardDescription>Podsumowanie aktywności każdej grupy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupsOverview.map((group) => (
              <div key={group.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <div>
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="text-sm text-gray-600">{group.description}</p>
                    </div>
                  </div>
                  <Badge variant={group.status === 'Aktywna' ? 'default' : 'secondary'}>
                    {group.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Uczniowie</p>
                    <p className="font-medium">{group.studentsCount}/{group.maxStudents}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Frekwencja</p>
                    <p className="font-medium">{group.avgAttendance}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Zajęcia</p>
                    <p className="font-medium">{group.completedClasses}/{group.totalClasses}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Ostatnie zajęcia</p>
                    <p className="font-medium">{group.lastClass}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentReport = () => {
    const allStudents = Object.values(students).flat();
    
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lista wszystkich uczniów</CardTitle>
          <CardDescription>Kompletne dane uczniów z wszystkich grup</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allStudents.map((student) => {
              const studentGroup = groups.find(g => students[g.id]?.some(s => s.id === student.id));
              return (
                <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-gray-500">
                        Klasa {student.class} • {studentGroup?.name}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">Frekwencja: {student.attendance}%</p>
                      <p className="text-xs text-gray-500">
                        Ostatnia obecność: {student.lastAttendance}
                      </p>
                    </div>
                    <Badge variant={student.status === 'Aktywna' ? 'default' : 'destructive'}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderScheduleReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Harmonogram zajęć na wybrane okresy</CardTitle>
        <CardDescription>Przegląd wszystkich zaplanowanych zajęć</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Harmonogram zajęć</h3>
          <p className="text-gray-600 mb-4">
            Szczegółowy harmonogram wszystkich grup na wybrany okres
          </p>
          <Button onClick={() => navigate('calendar')}>
            Zobacz kalendarz
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'attendance':
        return renderAttendanceReport();
      case 'overview':
        return renderOverviewReport();
      case 'students':
        return renderStudentReport();
      case 'schedule':
        return renderScheduleReport();
      default:
        return renderAttendanceReport();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Raporty i Analizy</h1>
          <p className="text-gray-600 mt-1">Generuj raporty i analizuj dane z zajęć</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => generateReport('csv')}>
            <Download className="h-4 w-4 mr-2" />
            CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => generateReport('pdf')}>
            <FileText className="h-4 w-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={sendReport}>
            <Mail className="h-4 w-4 mr-2" />
            Wyślij
          </Button>
          <Button variant="outline" size="sm" onClick={printReport}>
            <Printer className="h-4 w-4 mr-2" />
            Drukuj
          </Button>
        </div>
      </div>

      {/* Report Selection and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Report Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Rodzaje raportów
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Button
                  key={report.id}
                  variant={selectedReport === report.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedReport(report.id)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {report.name}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Grupa
                  </label>
                  <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                    <SelectTrigger>
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
                </div>

                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Okres
                  </label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Ostatni tydzień</SelectItem>
                      <SelectItem value="month">Ostatni miesiąc</SelectItem>
                      <SelectItem value="quarter">Ostatni kwartał</SelectItem>
                      <SelectItem value="year">Ostatni rok</SelectItem>
                      <SelectItem value="custom">Okres niestandardowy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtruj
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Content */}
          {renderReport()}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Szybkie akcje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              <span className="text-sm">Podsumowanie miesięczne</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <PieChart className="h-6 w-6 mb-2" />
              <span className="text-sm">Analiza frekwencji</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span className="text-sm">Raport uczniów</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span className="text-sm">Harmonogram</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}