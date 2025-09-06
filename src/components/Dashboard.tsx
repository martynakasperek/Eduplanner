import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Users, BookOpen, Clock, ArrowRight, CheckCircle, AlertCircle, XCircle, TrendingUp } from 'lucide-react';
import { AppState } from '../App';

interface DashboardProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
}

export function Dashboard({ state, navigate }: DashboardProps) {
  const { currentUser, groups, classes, students } = state;
  
  // Calculate total students across all groups
  const totalStudents = groups.reduce((sum, group) => sum + group.studentsCount, 0);
  
  // Get upcoming classes (next 5)
  const upcomingClasses = classes
    .sort((a, b) => new Date(a.date + ' ' + a.time.split('-')[0]).getTime() - new Date(b.date + ' ' + b.time.split('-')[0]).getTime())
    .slice(0, 5);

  // Weekly classes count
  const thisWeekClasses = 12; // Mock data

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Przygotowane':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'W trakcie':
        return <AlertCircle className="h-4 w-4 text-blue-600" />;
      case 'Do przygotowania':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Przygotowane':
        return 'bg-green-100 text-green-800';
      case 'W trakcie':
        return 'bg-blue-100 text-blue-800';
      case 'Do przygotowania':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Witaj, {currentUser?.name}! 👋</h1>
        <p className="text-blue-100">Dziś masz {upcomingClasses.filter(c => c.date === '2025-01-14').length} zajęcia do przeprowadzenia</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Aktywne grupy</p>
                <p className="text-3xl font-bold text-gray-900">{groups.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+2 w tym miesiącu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uczniów łącznie</p>
                <p className="text-3xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+5 w tym tygodniu</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Zajęć w tym tygodniu</p>
                <p className="text-3xl font-bold text-gray-900">{thisWeekClasses}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 text-gray-600 mr-1" />
              <span className="text-sm text-gray-600">18 godzin łącznie</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Classes - Main Widget */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Nadchodzące zajęcia</CardTitle>
                <CardDescription>Twój harmonogram na najbliższe dni</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('calendar')}
              >
                Zobacz wszystkie
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div 
                  key={classItem.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => navigate('class-details', { selectedClassId: classItem.id })}
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-1 h-16 rounded-full"
                      style={{ backgroundColor: classItem.color }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{classItem.groupName}</h4>
                      <p className="text-sm text-gray-600">{classItem.title}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {classItem.date === '2025-01-14' ? 'Dziś' : 
                           classItem.date === '2025-01-15' ? 'Jutro' : 
                           new Date(classItem.date).toLocaleDateString('pl-PL')}
                        </span>
                        <span className="text-sm text-gray-500">{classItem.time}</span>
                        <span className="text-sm text-gray-500">{classItem.room}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(classItem.status)}
                    <Badge variant="secondary" className={getStatusColor(classItem.status)}>
                      {classItem.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Stycznień 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-sm">
                {['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd'].map((day) => (
                  <div key={day} className="p-2 text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const hasClass = [14, 15, 16, 17].includes(day);
                  const isToday = day === 14;
                  
                  return (
                    <button
                      key={day}
                      className={`p-2 rounded-md text-sm transition-colors ${
                        isToday
                          ? 'bg-blue-600 text-white font-semibold'
                          : hasClass
                          ? 'bg-blue-100 text-blue-600 font-medium hover:bg-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => navigate('calendar')}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-4"
                onClick={() => navigate('calendar')}
              >
                Otwórz kalendarz
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ostatnia aktywność</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-1">
                    <Users className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Dodano 3 uczniów do grupy Robotyka</p>
                    <p className="text-xs text-gray-500">2 godziny temu</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 rounded-full p-1">
                    <BookOpen className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Zaktualizowano materiały - Teatr Szkolny</p>
                    <p className="text-xs text-gray-500">1 dzień temu</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-orange-100 rounded-full p-1">
                    <CheckCircle className="h-3 w-3 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">Sprawdzono frekwencję - Kółko Matematyczne</p>
                    <p className="text-xs text-gray-500">2 dni temu</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}