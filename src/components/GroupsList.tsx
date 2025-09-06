import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Plus, 
  Search, 
  Users, 
  Clock, 
  MapPin, 
  Calendar as CalendarIcon,
  Eye,
  Edit,
  UserCheck,
  MoreHorizontal
} from 'lucide-react';
import { AppState } from '../App';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface GroupsListProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
}

export function GroupsList({ state, navigate }: GroupsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { groups } = state;

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && group.status === 'Aktywna') ||
                         (filterStatus === 'archived' && group.status === 'Archiwalna');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Moje Grupy Zajęciowe</h1>
          <p className="text-gray-600 mt-1">Zarządzaj swoimi grupami i zajęciami pozalekcyjnymi</p>
        </div>
        <Button 
          onClick={() => navigate('create-group')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Dodaj nową grupę
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Szukaj grup..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie</SelectItem>
            <SelectItem value="active">Aktywne</SelectItem>
            <SelectItem value="archived">Archiwalne</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: group.color }}
                    />
                    <CardTitle className="text-xl">{group.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">
                    {group.description}
                  </CardDescription>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate('group-details', { selectedGroupId: group.id })}>
                      <Eye className="h-4 w-4 mr-2" />
                      Szczegóły
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edytuj
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('students', { selectedGroupId: group.id })}>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Lista uczniów
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('calendar')}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Kalendarz
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Group Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {group.studentsCount}/{group.maxStudents} uczniów
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Sala {group.room}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{group.schedule}</span>
              </div>

              {/* Status and Last Class */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={group.status === 'Aktywna' ? 'default' : 'secondary'}
                    className={group.status === 'Aktywna' ? 'bg-green-600' : ''}
                  >
                    {group.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Ostatnie: {group.lastClass}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ 
                        width: `${(group.studentsCount / group.maxStudents) * 100}%` 
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.round((group.studentsCount / group.maxStudents) * 100)}%
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => navigate('group-details', { selectedGroupId: group.id })}
                >
                  Szczegóły
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('students', { selectedGroupId: group.id })}
                >
                  Lista uczniów
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('calendar')}
                >
                  Kalendarz
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery || filterStatus !== 'all' ? 'Brak wyników' : 'Brak grup'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || filterStatus !== 'all' 
              ? 'Spróbuj zmienić kryteria wyszukiwania' 
              : 'Rozpocznij od utworzenia swojej pierwszej grupy zajęciowej'}
          </p>
          {!searchQuery && filterStatus === 'all' && (
            <Button onClick={() => navigate('create-group')}>
              <Plus className="h-4 w-4 mr-2" />
              Dodaj pierwszą grupę
            </Button>
          )}
        </div>
      )}

      {/* Summary Stats */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{groups.length}</p>
            <p className="text-sm text-gray-600">Wszystkich grup</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {groups.filter(g => g.status === 'Aktywna').length}
            </p>
            <p className="text-sm text-gray-600">Aktywnych</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {groups.reduce((sum, group) => sum + group.studentsCount, 0)}
            </p>
            <p className="text-sm text-gray-600">Uczniów łącznie</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">92%</p>
            <p className="text-sm text-gray-600">Średnia frekwencja</p>
          </div>
        </div>
      </div>
    </div>
  );
}