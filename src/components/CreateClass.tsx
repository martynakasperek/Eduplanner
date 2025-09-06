import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  FileText,
  Target,
  BookOpen,
  Star,
  Upload,
  Link,
  Plus,
  X,
  Save,
  CheckCircle
} from 'lucide-react';
import { AppState } from '../App';
import { toast } from 'sonner@2.0.3';

interface CreateClassProps {
  state: AppState;
  navigate: (screen: string, params?: any) => void;
  updateState: (updates: Partial<AppState>) => void;
}

export function CreateClass({ state, navigate, updateState }: CreateClassProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    groupId: state.selectedGroupId || '',
    title: '',
    date: '2025-01-18',
    time: '15:00',
    duration: [90], // in minutes
    room: '',
    description: '',
    goals: [] as string[],
    materials: [] as string[],
    difficulty: [3],
    files: [] as File[],
    links: [] as string[],
    teacherNotes: ''
  });

  const [newGoal, setNewGoal] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [newLink, setNewLink] = useState('');

  const { groups } = state;
  const selectedGroup = groups.find(g => g.id === formData.groupId);

  const rooms = ['Sala 201', 'Sala 103', 'Sala 205', 'Aula', 'Lab. 5', 'Sala muzyczna', 'Biblioteka'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = () => {
    if (newGoal.trim()) {
      setFormData(prev => ({ ...prev, goals: [...prev.goals, newGoal.trim()] }));
      setNewGoal('');
    }
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({ ...prev, goals: prev.goals.filter((_, i) => i !== index) }));
  };

  const addMaterial = () => {
    if (newMaterial.trim()) {
      setFormData(prev => ({ ...prev, materials: [...prev.materials, newMaterial.trim()] }));
      setNewMaterial('');
    }
  };

  const removeMaterial = (index: number) => {
    setFormData(prev => ({ ...prev, materials: prev.materials.filter((_, i) => i !== index) }));
  };

  const addLink = () => {
    if (newLink.trim()) {
      setFormData(prev => ({ ...prev, links: [...prev.links, newLink.trim()] }));
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({ ...prev, links: prev.links.filter((_, i) => i !== index) }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const saveAsDraft = () => {
    toast.success('Zajęcia zostały zapisane jako szkic');
    navigate('groups');
  };

  const scheduleClass = () => {
    if (!formData.groupId || !formData.title || !formData.date || !formData.time) {
      toast.error('Wypełnij wszystkie wymagane pola');
      return;
    }

    const newClass = {
      id: Date.now().toString(),
      groupId: formData.groupId,
      groupName: selectedGroup?.name || '',
      title: formData.title,
      date: formData.date,
      time: `${formData.time}-${getEndTime(formData.time, formData.duration[0])}`,
      room: formData.room,
      status: 'Do przygotowania' as const,
      color: selectedGroup?.color || '#1976D2'
    };

    updateState({
      classes: [...state.classes, newClass]
    });

    toast.success('Zajęcia zostały zaplanowane pomyślnie!');
    navigate('class-details', { selectedClassId: newClass.id });
  };

  const getEndTime = (startTime: string, duration: number) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + duration * 60000);
    return `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2" />
            Podstawowe informacje
          </CardTitle>
          <CardDescription>
            Określ podstawowe parametry zajęć
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="group">Grupa zajęciowa *</Label>
              <Select value={formData.groupId} onValueChange={(value) => handleInputChange('groupId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz grupę" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: group.color }}
                        />
                        <span>{group.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Tytuł zajęć *</Label>
              <Input
                id="title"
                placeholder="np. Wprowadzenie do równań"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Godzina rozpoczęcia *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Sala</Label>
              <Select value={formData.room} onValueChange={(value) => handleInputChange('room', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz salę" />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room} value={room}>
                      {room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Czas trwania: {formData.duration[0]} minut</Label>
            <Slider
              value={formData.duration}
              onValueChange={(value) => handleInputChange('duration', value)}
              min={30}
              max={180}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>30 min</span>
              <span>180 min (3h)</span>
            </div>
          </div>

          {selectedGroup && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Wybrana grupa</h4>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedGroup.color }}
                />
                <div>
                  <p className="font-medium">{selectedGroup.name}</p>
                  <p className="text-sm text-gray-600">
                    {selectedGroup.studentsCount} uczniów • {selectedGroup.room} • {selectedGroup.schedule}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Szczegóły zajęć
          </CardTitle>
          <CardDescription>
            Opisz cele i zawartość zajęć
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description">Opis zajęć</Label>
            <Textarea
              id="description"
              placeholder="Opisz zawartość i przebieg zajęć..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Cele zajęć</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Dodaj cel zajęć..."
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              />
              <Button type="button" onClick={addGoal} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.goals.length > 0 && (
              <div className="space-y-2">
                {formData.goals.map((goal, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{goal}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeGoal(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Wymagane materiały</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Dodaj wymagany materiał..."
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMaterial()}
              />
              <Button type="button" onClick={addMaterial} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.materials.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.materials.map((material, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{material}</span>
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="ml-1 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Poziom trudności</Label>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer ${
                      star <= formData.difficulty[0] 
                        ? 'text-yellow-500 fill-current' 
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleInputChange('difficulty', [star])}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {formData.difficulty[0] === 1 && 'Bardzo łatwy'}
                {formData.difficulty[0] === 2 && 'Łatwy'}
                {formData.difficulty[0] === 3 && 'Średni'}
                {formData.difficulty[0] === 4 && 'Trudny'}
                {formData.difficulty[0] === 5 && 'Bardzo trudny'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="h-5 w-5 mr-2" />
            Materiały i notatki
          </CardTitle>
          <CardDescription>
            Dodaj materiały i notatki dla nauczyciela
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Załącz pliki</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Przeciągnij pliki tutaj lub kliknij aby wybrać</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOC, PPT, obrazy (max 10MB)</p>
              <Button variant="outline" size="sm" className="mt-2">
                Wybierz pliki
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Linki zewnętrzne</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Dodaj link do materiałów..."
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addLink()}
              />
              <Button type="button" onClick={addLink} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.links.length > 0 && (
              <div className="space-y-2">
                {formData.links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <Link className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-blue-600">{link}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLink(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="teacherNotes">Notatki dla nauczyciela</Label>
            <Textarea
              id="teacherNotes"
              placeholder="Prywatne notatki i przypomnienia..."
              value={formData.teacherNotes}
              onChange={(e) => handleInputChange('teacherNotes', e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Podsumowanie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Podstawowe informacje</h4>
              <div className="space-y-1 text-gray-600">
                <p><strong>Grupa:</strong> {selectedGroup?.name}</p>
                <p><strong>Tytuł:</strong> {formData.title}</p>
                <p><strong>Data:</strong> {new Date(formData.date).toLocaleDateString('pl-PL')}</p>
                <p><strong>Godzina:</strong> {formData.time}</p>
                <p><strong>Czas trwania:</strong> {formData.duration[0]} minut</p>
                <p><strong>Sala:</strong> {formData.room}</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Szczegóły</h4>
              <div className="space-y-1 text-gray-600">
                <p><strong>Poziom trudności:</strong> {formData.difficulty[0]}/5</p>
                <p><strong>Cele:</strong> {formData.goals.length} celów</p>
                <p><strong>Materiały:</strong> {formData.materials.length} pozycji</p>
                <p><strong>Linki:</strong> {formData.links.length} linków</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate('groups')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anuluj
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Nowe zajęcia</h1>
            <p className="text-gray-600 mt-1">Utwórz nowe zajęcia dla wybranej grupy</p>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 py-4">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              <span className="ml-2 text-sm">
                {step === 1 && 'Podstawowe'}
                {step === 2 && 'Szczegóły'}
                {step === 3 && 'Materiały'}
              </span>
            </div>
            {step < 3 && (
              <div className={`w-12 h-px ${step < currentStep ? 'bg-blue-600' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Form Content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={prevStep}>
              Poprzedni krok
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={saveAsDraft}>
            <Save className="h-4 w-4 mr-2" />
            Zapisz jako szkic
          </Button>
          
          {currentStep < 3 ? (
            <Button onClick={nextStep}>
              Następny krok
            </Button>
          ) : (
            <Button onClick={scheduleClass} className="bg-blue-600 hover:bg-blue-700">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Zaplanuj zajęcia
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}