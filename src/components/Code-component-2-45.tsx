import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Edit, 
  Copy, 
  X, 
  UserCheck, 
  Clock, 
  MapPin, 
  Target,
  BookOpen,
  Users,
  CheckCircle,
  Star,
  Download,
  ExternalLink
} from 'lucide-react';

type PageType = 'calendar' | 'group-details';

interface ClassDetailsProps {
  classId?: string;
  navigateTo: (page: PageType, options?: { groupId?: string }) => void;
}

const classData = {
  '1': {
    id: '1',
    title: 'Równania liniowe - podstawy',
    groupName: 'Kółko Matematyczne - Grupa A',
    groupId: '1',
    date: '14.01.2025',
    time: '15:00-16:00',
    room: 'Sala 201',
    status: 'scheduled',
    description: 'Wprowadzenie do równań liniowych z jedną niewiadomą. Uczniowie poznają podstawowe metody rozwiązywania równań oraz ich praktyczne zastosowania.',
    goals: [
      'Zrozumienie pojęcia równania liniowego',
      'Nauka podstawowych metod rozwiązywania',
      'Zastosowanie równań w zadaniach praktycznych',
      'Rozwijanie umiejętności logicznego myślenia'
    ],
    materials: [
      'Kalkulatory naukowe',
      'Karty z zadaniami',
      'Zeszyty ćwiczeń'
    ],
    attachments: [
      { name: 'Zadania_równania.pdf', size: '2.3 MB' },
      { name: 'Teoria_równania.docx', size: '1.1 MB' }
    ],
    links: [
      { name: 'GeoGebra - równania', url: 'https://geogebra.org' },
      { name: 'Khan Academy', url: 'https://khanacademy.org' }
    ],
    notes: 'Pamiętać o sprawdzeniu kalkulatorów przed zajęciami. Przygotować dodatkowe zadania dla szybszych uczniów.',
    difficulty: 3,
    students: [
      { id: '1', name: 'Anna Kowalska', present: true, note: '' },
      { id: '2', name: 'Piotr Nowak', present: true, note: '' },
      { id: '3', name: 'Maria Wiśniewska', present: true, note: '' },
      { id: '4', name: 'Jan Kowalczyk', present: false, note: 'Choroba' },
      { id: '5', name: 'Karolina Zielińska', present: true, note: '' },
      { id: '6', name: 'Tomasz Lewandowski', present: true, note: '' },
      { id: '7', name: 'Magdalena Wójcik', present: true, note: '' },
      { id: '8', name: 'Michał Kowalski', present: false, note: 'Wycieczka szkolna' },
      { id: '9', name: 'Aleksandra Nowakiewicz', present: true, note: '' },
      { id: '10', name: 'Bartosz Jankowski', present: true, note: '' }
    ]
  }
};

export function ClassDetails({ classId = '1', navigateTo }: ClassDetailsProps) {
  const [activeTab, setActiveTab] = useState('details');
  const [attendanceNotes, setAttendanceNotes] = useState<Record<string, string>>({});
  const [students, setStudents] = useState(classData[classId as keyof typeof classData]?.students || []);
  
  const classInfo = classData[classId as keyof typeof classData] || classData['1'];

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setAttendanceNotes(prev => ({ ...prev, [studentId]: note }));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return (
          <Badge variant="outline" className="text-blue-600 border-blue-600">
            Zaplanowane
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            Zakończone
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            Anulowane
          </Badge>
        );
      default:
        return null;
    }
  };

  const presentCount = students.filter(s => s.present).length;
  const totalCount = students.length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateTo('calendar')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl text-gray-900">{classInfo.title}</h1>
            {getStatusBadge(classInfo.status)}
          </div>
          <p className="text-gray-600 mt-1">{classInfo.groupName}</p>
        </div>
      </div>

      {/* Quick info */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{classInfo.date} {classInfo.time}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{classInfo.room}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Obecność: {presentCount}/{totalCount}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-gray-500" />
              <span>Poziom: {classInfo.difficulty}/5</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Edit className="w-4 h-4 mr-2" />
          Edytuj
        </Button>
        <Button variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Duplikuj
        </Button>
        <Button variant="outline">
          <UserCheck className="w-4 h-4 mr-2" />
          Sprawdź obecność
        </Button>
        <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
          <X className="w-4 h-4 mr-2" />
          Anuluj
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Class description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Opis zajęć</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{classInfo.description}</p>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Cele edukacyjne</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {classInfo.goals.map((goal, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{goal}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Materials and resources */}
          <Card>
            <CardHeader>
              <CardTitle>Materiały i zasoby</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Required materials */}
              <div>
                <h4 className="text-sm text-gray-900 mb-2">Materiały potrzebne:</h4>
                <div className="flex flex-wrap gap-2">
                  {classInfo.materials.map((material, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Attachments */}
              <div>
                <h4 className="text-sm text-gray-900 mb-2">Załączone pliki:</h4>
                <div className="space-y-2">
                  {classInfo.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({file.size})</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* External links */}
              <div>
                <h4 className="text-sm text-gray-900 mb-2">Linki zewnętrzne:</h4>
                <div className="space-y-2">
                  {classInfo.links.map((link, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                      <a href={link.url} className="text-sm text-blue-600 hover:underline">
                        {link.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Teacher notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notatki nauczyciela</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-sm bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                {classInfo.notes}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Attendance */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="w-5 h-5" />
                <span>Lista obecności</span>
              </CardTitle>
              <CardDescription>
                Obecnych: {presentCount}/{totalCount} uczniów
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quick actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setStudents(prev => prev.map(s => ({ ...s, present: true })))}
                >
                  Wszyscy obecni
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setStudents(prev => prev.map(s => ({ ...s, present: false })))}
                >
                  Wszyscy nieobecni
                </Button>
              </div>

              <Separator />

              {/* Students list */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {students.map((student) => (
                  <div key={student.id} className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={student.present}
                        onCheckedChange={(checked) => 
                          handleAttendanceChange(student.id, checked as boolean)
                        }
                      />
                      <span className={`text-sm flex-1 ${
                        student.present ? 'text-gray-900' : 'text-gray-500 line-through'
                      }`}>
                        {student.name}
                      </span>
                    </div>
                    {!student.present && (
                      <Textarea
                        placeholder="Powód nieobecności..."
                        className="text-xs"
                        value={attendanceNotes[student.id] || student.note}
                        onChange={(e) => handleNoteChange(student.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <Separator />

              <Button className="w-full bg-green-600 hover:bg-green-700">
                Zapisz obecność
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}