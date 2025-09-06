import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  FileDown, 
  Calendar, 
  Users, 
  TrendingUp, 
  Download,
  Mail,
  Printer
} from 'lucide-react';

type PageType = 'groups';

interface ReportsProps {
  navigateTo: (page: PageType) => void;
}

const reportTypes = [
  {
    id: 'attendance',
    title: 'Raport frekwencji grupy',
    description: 'Szczegółowy raport obecności uczniów w wybranej grupie',
    icon: Users,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'summary',
    title: 'Zestawienie wszystkich grup',
    description: 'Przegląd wszystkich grup z podstawowymi statystykami',
    icon: BarChart3,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'contacts',
    title: 'Lista uczniów z danymi kontaktowymi',
    description: 'Kompletna lista uczniów z informacjami kontaktowymi',
    icon: Mail,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'schedule',
    title: 'Harmonogram zajęć',
    description: 'Terminarz zajęć na wybrany okres',
    icon: Calendar,
    color: 'bg-orange-100 text-orange-600'
  }
];

const groups = [
  { id: '1', name: 'Kółko Matematyczne - Grupa A', students: 15, attendance: 92 },
  { id: '2', name: 'Teatr Szkolny', students: 22, attendance: 88 },
  { id: '3', name: 'Robotyka - Początkujący', students: 12, attendance: 95 },
  { id: '4', name: 'Kółko Angielskie', students: 18, attendance: 85 },
  { id: '5', name: 'Chór Szkolny', students: 25, attendance: 78 },
  { id: '6', name: 'Koło Fotograficzne', students: 8, attendance: 90 }
];

const sampleAttendanceData = [
  { name: 'Anna Kowalska', class: '4A', attendance: 95, present: 19, total: 20 },
  { name: 'Piotr Nowak', class: '4B', attendance: 85, present: 17, total: 20 },
  { name: 'Maria Wiśniewska', class: '5A', attendance: 100, present: 20, total: 20 },
  { name: 'Jan Kowalczyk', class: '4A', attendance: 70, present: 14, total: 20 },
  { name: 'Karolina Zielińska', class: '5B', attendance: 90, present: 18, total: 20 }
];

export function Reports({ navigateTo }: ReportsProps) {
  const [selectedReport, setSelectedReport] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateReport = () => {
    setShowPreview(true);
  };

  const handleDownload = (format: 'pdf' | 'csv') => {
    console.log(`Downloading report as ${format}`);
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600';
    if (attendance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const renderAttendanceReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Raport frekwencji - {groups.find(g => g.id === selectedGroup)?.name}</CardTitle>
        <CardDescription>
          Okres: {selectedPeriod === 'current-month' ? 'Styczeń 2025' : 'Ostatnie 3 miesiące'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl text-gray-900">
                {groups.find(g => g.id === selectedGroup)?.attendance}%
              </p>
              <p className="text-sm text-gray-600">Średnia frekwencja</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl text-gray-900">
                {groups.find(g => g.id === selectedGroup)?.students}
              </p>
              <p className="text-sm text-gray-600">Liczba uczniów</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl text-gray-900">20</p>
              <p className="text-sm text-gray-600">Przeprowadzone zajęcia</p>
            </div>
          </div>

          {/* Attendance table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Imię i Nazwisko</th>
                  <th className="border border-gray-200 p-3 text-left">Klasa</th>
                  <th className="border border-gray-200 p-3 text-center">Obecność</th>
                  <th className="border border-gray-200 p-3 text-center">Frekwencja</th>
                </tr>
              </thead>
              <tbody>
                {sampleAttendanceData.map((student, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 p-3">{student.name}</td>
                    <td className="border border-gray-200 p-3">
                      <Badge variant="outline">{student.class}</Badge>
                    </td>
                    <td className="border border-gray-200 p-3 text-center">
                      {student.present}/{student.total}
                    </td>
                    <td className="border border-gray-200 p-3 text-center">
                      <span className={getAttendanceColor(student.attendance)}>
                        {student.attendance}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderGroupsSummary = () => (
    <Card>
      <CardHeader>
        <CardTitle>Zestawienie wszystkich grup</CardTitle>
        <CardDescription>
          Przegląd aktywności wszystkich grup zajęciowych
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Summary stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl text-blue-600">6</p>
              <p className="text-sm text-gray-600">Aktywne grupy</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl text-green-600">100</p>
              <p className="text-sm text-gray-600">Łączna liczba uczniów</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl text-orange-600">88%</p>
              <p className="text-sm text-gray-600">Średnia frekwencja</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl text-purple-600">120</p>
              <p className="text-sm text-gray-600">Zajęcia w miesiącu</p>
            </div>
          </div>

          {/* Groups table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left">Nazwa grupy</th>
                  <th className="border border-gray-200 p-3 text-center">Uczniowie</th>
                  <th className="border border-gray-200 p-3 text-center">Frekwencja</th>
                  <th className="border border-gray-200 p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {groups.map((group, index) => (
                  <tr key={group.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border border-gray-200 p-3">{group.name}</td>
                    <td className="border border-gray-200 p-3 text-center">{group.students}</td>
                    <td className="border border-gray-200 p-3 text-center">
                      <span className={getAttendanceColor(group.attendance)}>
                        {group.attendance}%
                      </span>
                    </td>
                    <td className="border border-gray-200 p-3 text-center">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        Aktywna
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900">Raporty</h1>
        <p className="text-gray-600 mt-1">Generuj raporty i analizy dla swoich grup</p>
      </div>

      {!showPreview ? (
        <>
          {/* Report types */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <Card 
                  key={report.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedReport === report.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${report.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Configuration */}
          {selectedReport && (
            <Card>
              <CardHeader>
                <CardTitle>Konfiguracja raportu</CardTitle>
                <CardDescription>
                  Dostosuj parametry raportu przed wygenerowaniem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {(selectedReport === 'attendance' || selectedReport === 'contacts') && (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Wybierz grupę</label>
                    <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                      <SelectTrigger>
                        <SelectValue placeholder="Wybierz grupę" />
                      </SelectTrigger>
                      <SelectContent>
                        {groups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <label className="block text-sm text-gray-700 mb-2">Okres</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Bieżący miesiąc</SelectItem>
                      <SelectItem value="last-3-months">Ostatnie 3 miesiące</SelectItem>
                      <SelectItem value="semester">Bieżący semestr</SelectItem>
                      <SelectItem value="year">Rok szkolny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleGenerateReport}
                  disabled={
                    (selectedReport === 'attendance' || selectedReport === 'contacts') && !selectedGroup
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Wygeneruj raport
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      ) : (
        <>
          {/* Report preview */}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setShowPreview(false)}>
              ← Powrót do konfiguracji
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleDownload('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" onClick={() => handleDownload('csv')}>
                <FileDown className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Drukuj
              </Button>
            </div>
          </div>

          {/* Report content */}
          {selectedReport === 'attendance' && renderAttendanceReport()}
          {selectedReport === 'summary' && renderGroupsSummary()}
          
          {selectedReport === 'contacts' && (
            <Card>
              <CardHeader>
                <CardTitle>Lista uczniów z danymi kontaktowymi</CardTitle>
                <CardDescription>
                  {groups.find(g => g.id === selectedGroup)?.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Podgląd listy kontaktowej zostanie wygenerowany...
                </p>
              </CardContent>
            </Card>
          )}

          {selectedReport === 'schedule' && (
            <Card>
              <CardHeader>
                <CardTitle>Harmonogram zajęć</CardTitle>
                <CardDescription>
                  Okres: {selectedPeriod === 'current-month' ? 'Styczeń 2025' : 'Ostatnie 3 miesiące'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  Podgląd harmonogramu zostanie wygenerowany...
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}