import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GroupsList } from './components/GroupsList';
import { GroupDetails } from './components/GroupDetails';
import { StudentsList } from './components/StudentsList';
import { Calendar } from './components/Calendar';
import { CreateClass } from './components/CreateClass';
import { ClassDetails } from './components/ClassDetails';
import { Reports } from './components/Reports';
import { Notifications } from './components/Notifications';
import { Toaster } from "./components/ui/sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  studentsCount: number;
  maxStudents: number;
  room: string;
  schedule: string;
  status: 'Aktywna' | 'Archiwalna';
  lastClass: string;
  color: string;
}

export interface Student {
  id: string;
  name: string;
  class: string;
  attendance: number;
  totalClasses: number;
  status: 'Aktywna' | 'Nieobecny';
  lastAttendance: string;
}

export interface ClassEvent {
  id: string;
  groupId: string;
  groupName: string;
  title: string;
  date: string;
  time: string;
  room: string;
  status: 'Przygotowane' | 'W trakcie' | 'Do przygotowania' | 'Zakończone';
  color: string;
}

export interface AppState {
  currentUser: User | null;
  currentScreen: string;
  selectedGroupId?: string;
  selectedClassId?: string;
  selectedStudentId?: string;
  groups: Group[];
  students: Record<string, Student[]>;
  classes: ClassEvent[];
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
  }>;
}

export default function App() {
  const [state, setState] = useState<AppState>({
    currentUser: null,
    currentScreen: 'login',
    groups: [
      {
        id: '1',
        name: 'Kółko Matematyczne - Grupa A',
        description: 'Zajęcia dla uczniów klas 4-6 rozwijające umiejętności matematyczne',
        studentsCount: 15,
        maxStudents: 20,
        room: '201',
        schedule: 'Wt, Pt 15:00-16:00',
        status: 'Aktywna',
        lastClass: '10.01.2025',
        color: '#1976D2'
      },
      {
        id: '2',
        name: 'Teatr Szkolny',
        description: 'Zajęcia teatralne przygotowujące spektakl na koniec roku',
        studentsCount: 22,
        maxStudents: 25,
        room: 'Aula',
        schedule: 'Śr 14:00-15:30',
        status: 'Aktywna',
        lastClass: '11.01.2025',
        color: '#4CAF50'
      },
      {
        id: '3',
        name: 'Robotyka - Początkujący',
        description: 'Wprowadzenie do programowania i robotyki dla klas 1-3',
        studentsCount: 12,
        maxStudents: 15,
        room: 'Lab. 5',
        schedule: 'Śr 16:00-17:00',
        status: 'Aktywna',
        lastClass: '08.01.2025',
        color: '#FF9800'
      },
      {
        id: '4',
        name: 'Kółko Angielskie',
        description: 'Konwersacje i gry językowe',
        studentsCount: 18,
        maxStudents: 20,
        room: '103',
        schedule: 'Pt 15:00-16:00',
        status: 'Aktywna',
        lastClass: '10.01.2025',
        color: '#9C27B0'
      },
      {
        id: '5',
        name: 'Chór Szkolny',
        description: 'Zajęcia wokalne i przygotowanie do konkursów',
        studentsCount: 25,
        maxStudents: 30,
        room: 'Sala muzyczna',
        schedule: 'Pn 16:00-17:00',
        status: 'Aktywna',
        lastClass: '13.01.2025',
        color: '#E91E63'
      },
      {
        id: '6',
        name: 'Koło Fotograficzne',
        description: 'Nauka fotografii i obróbki zdjęć',
        studentsCount: 8,
        maxStudents: 12,
        room: '205',
        schedule: 'Czw 15:30-16:30',
        status: 'Aktywna',
        lastClass: '09.01.2025',
        color: '#607D8B'
      }
    ],
    students: {
      '1': [
        { id: '1', name: 'Anna Kowalska', class: '4A', attendance: 95, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '2', name: 'Piotr Nowak', class: '4B', attendance: 85, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '3', name: 'Maria Wiśniewska', class: '5A', attendance: 100, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '4', name: 'Jan Kowalczyk', class: '4A', attendance: 70, totalClasses: 20, status: 'Nieobecny', lastAttendance: '03.01.2025' },
        { id: '5', name: 'Karolina Zielińska', class: '5B', attendance: 90, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '6', name: 'Tomasz Kowalski', class: '4C', attendance: 88, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '7', name: 'Agnieszka Nowak', class: '5A', attendance: 95, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '8', name: 'Michał Wiśniewski', class: '4B', attendance: 80, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '9', name: 'Katarzyna Dąbrowska', class: '5C', attendance: 92, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '10', name: 'Łukasz Wójcik', class: '4A', attendance: 85, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '11', name: 'Magdalena Kaczmarek', class: '5B', attendance: 98, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '12', name: 'Paweł Jankowski', class: '4C', attendance: 75, totalClasses: 20, status: 'Aktywna', lastAttendance: '08.01.2025' },
        { id: '13', name: 'Natalia Szymańska', class: '5A', attendance: 90, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '14', name: 'Bartosz Mazur', class: '4B', attendance: 82, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' },
        { id: '15', name: 'Weronika Król', class: '5C', attendance: 96, totalClasses: 20, status: 'Aktywna', lastAttendance: '10.01.2025' }
      ]
    },
    classes: [
      { id: '1', groupId: '1', groupName: 'Kółko Matematyczne - Grupa A', title: 'Równania liniowe', date: '2025-01-14', time: '15:00-16:00', room: 'Sala 201', status: 'Przygotowane', color: '#1976D2' },
      { id: '2', groupId: '2', groupName: 'Teatr Szkolny', title: 'Próba spektaklu', date: '2025-01-15', time: '14:00-15:30', room: 'Aula', status: 'W trakcie', color: '#4CAF50' },
      { id: '3', groupId: '3', groupName: 'Robotyka - Początkujący', title: 'Programowanie ruchów', date: '2025-01-15', time: '16:00-17:00', room: 'Lab. 5', status: 'Do przygotowania', color: '#FF9800' },
      { id: '4', groupId: '4', groupName: 'Kółko Angielskie', title: 'Rozmowy o podróżach', date: '2025-01-16', time: '15:00-16:00', room: 'Sala 103', status: 'Przygotowane', color: '#9C27B0' },
      { id: '5', groupId: '5', groupName: 'Chór Szkolny', title: 'Nauka nowej piosenki', date: '2025-01-17', time: '16:00-17:00', room: 'Sala muzyczna', status: 'Przygotowane', color: '#E91E63' }
    ],
    notifications: [
      { id: '1', title: 'Nowy uczeń', message: 'Nowy uczeń zapisał się do grupy Robotyka', time: '2 godz. temu', read: false },
      { id: '2', title: 'Przypomnienie', message: 'Zajęcia Teatr jutro o 14:00 - sprawdź materiały', time: '1 dzień temu', read: false },
      { id: '3', title: 'Niska frekwencja', message: 'Niska frekwencja w grupie Angielski - 65%', time: '2 dni temu', read: true }
    ]
  });

  const login = (email: string) => {
    setState(prev => ({
      ...prev,
      currentUser: { id: '1', name: 'Anna Nowak', email, avatar: 'AN' },
      currentScreen: 'dashboard'
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      currentUser: null,
      currentScreen: 'login'
    }));
  };

  const navigate = (screen: string, params?: any) => {
    setState(prev => ({
      ...prev,
      currentScreen: screen,
      ...params
    }));
  };

  const updateState = (updates: Partial<AppState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  if (!state.currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <LoginPage onLogin={login} />
        <Toaster />
      </div>
    );
  }

  const renderCurrentScreen = () => {
    switch (state.currentScreen) {
      case 'dashboard':
        return <Dashboard state={state} navigate={navigate} />;
      case 'groups':
        return <GroupsList state={state} navigate={navigate} />;
      case 'group-details':
        return <GroupDetails state={state} navigate={navigate} updateState={updateState} />;
      case 'students':
        return <StudentsList state={state} navigate={navigate} updateState={updateState} />;
      case 'calendar':
        return <Calendar state={state} navigate={navigate} />;
      case 'create-class':
        return <CreateClass state={state} navigate={navigate} updateState={updateState} />;
      case 'class-details':
        return <ClassDetails state={state} navigate={navigate} updateState={updateState} />;
      case 'reports':
        return <Reports state={state} navigate={navigate} />;
      case 'notifications':
        return <Notifications state={state} navigate={navigate} updateState={updateState} />;
      default:
        return <Dashboard state={state} navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={state.currentUser} 
        currentScreen={state.currentScreen}
        notifications={state.notifications}
        navigate={navigate} 
        onLogout={logout} 
      />
      <main className="pt-16">
        {renderCurrentScreen()}
      </main>
      <Toaster />
    </div>
  );
}