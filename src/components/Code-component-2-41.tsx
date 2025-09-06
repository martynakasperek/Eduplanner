import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Target, 
  BookOpen,
  Upload,
  Link as LinkIcon,
  Star,
  Plus,
  X
} from 'lucide-react';

type PageType = 'calendar' | 'groups';

interface CreateClassProps {
  navigateTo: (page: PageType) => void;
}

const groups = [
  { id: '1', name: 'Kółko Matematyczne - Grupa A' },
  { id: '2', name: 'Teatr Szkolny' },
  { id: '3', name: 'Robotyka - Początkujący' },
  { id: '4', name: 'Kółko Angielskie' },
  { id: '5', name: 'Chór Szkolny' },
  { id: '6', name: 'Koło Fotograficzne' }
];

const rooms = [
  'Sala 201',
  'Sala 103',
  'Sala 205',
  'Aula',
  'Lab. 5',
  'Sala muzyczna',
  'Sala gimnastyczna'
];

const materials = [
  'Podręczniki',
  'Zeszyty ćwiczeń',
  'Kalkulatory',
  'Laptop/Tablet',
  'Karty zadań',
  'Manipulatywy',
  'Przybory plastyczne',
  'Kostiumy',
  'Instrumenty'
];

export function CreateClass({ navigateTo }: CreateClassProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    group: '',
    title: '',
    date: '',
    time: '',
    room: '',
    duration: [60],
    description: '',
    goals: [''],
    materials: [] as string[],
    difficulty: 3,
    notes: '',
    links: ['']
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = () => {
    setFormData(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }));
  };

  const updateGoal = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => i === index ? value : goal)
    }));
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const updateLink = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) => i === index ? value : link)
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const toggleMaterial = (material: string) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.includes(material)
        ? prev.materials.filter(m => m !== material)
        : [...prev.materials, material]
    }));
  };

  const handleSave = (isDraft: boolean = false) => {
    console.log('Saving class:', { ...formData, isDraft });
    navigateTo('calendar');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="group">Wybierz grupę *</Label>
        <Select value={formData.group} onValueChange={(value) => handleInputChange('group', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz grupę zajęciową" />
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

      <div>
        <Label htmlFor="title">Tytuł zajęć *</Label>
        <Input
          id="title"
          placeholder="np. Wprowadzenie do równań"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Data *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="time">Godzina rozpoczęcia *</Label>
          <Input
            id="time"
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="room">Sala *</Label>
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
        <div>
          <Label htmlFor="duration">Czas trwania: {formData.duration[0]} min</Label>
          <Slider
            value={formData.duration}
            onValueChange={(value) => handleInputChange('duration', value)}
            max={180}
            min={30}
            step={15}
            className="mt-2"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>30 min</span>
            <span>3 godz</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="description">Opis zajęć</Label>
        <Textarea
          id="description"
          placeholder="Opisz co będzie się działo podczas zajęć..."
          className="min-h-[100px]"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />
      </div>

      <div>
        <Label>Cele zajęć</Label>
        <div className="space-y-2 mt-2">
          {formData.goals.map((goal, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder={`Cel ${index + 1}`}
                value={goal}
                onChange={(e) => updateGoal(index, e.target.value)}
              />
              {formData.goals.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeGoal(index)}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" onClick={addGoal} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Dodaj cel
          </Button>
        </div>
      </div>

      <div>
        <Label>Wymagane materiały</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {materials.map((material) => (
            <div
              key={material}
              className={`p-2 border rounded-lg cursor-pointer transition-colors ${
                formData.materials.includes(material)
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => toggleMaterial(material)}
            >
              <span className="text-sm">{material}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Poziom trudności</Label>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= formData.difficulty
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
                onClick={() => handleInputChange('difficulty', star)}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {formData.difficulty}/5
          </span>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label>Załączone pliki</Label>
        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600">
            Przeciągnij pliki tutaj lub kliknij, aby wybrać
          </p>
          <Button variant="outline" className="mt-2">
            Wybierz pliki
          </Button>
        </div>
      </div>

      <div>
        <Label>Linki zewnętrzne</Label>
        <div className="space-y-2 mt-2">
          {formData.links.map((link, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                placeholder="https://..."
                value={link}
                onChange={(e) => updateLink(index, e.target.value)}
              />
              {formData.links.length > 1 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeLink(index)}
                  className="flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="outline" onClick={addLink} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Dodaj link
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="notes">Notatki dla nauczyciela</Label>
        <Textarea
          id="notes"
          placeholder="Prywatne notatki, przypomnienia..."
          className="min-h-[100px]"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigateTo('calendar')}
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl text-gray-900">Tworzenie nowych zajęć</h1>
          <p className="text-gray-600 mt-1">Zaplanuj nowe zajęcia dla swojej grupy</p>
        </div>
      </div>

      {/* Progress steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: 'Podstawowe informacje', icon: Calendar },
              { step: 2, title: 'Szczegóły', icon: Target },
              { step: 3, title: 'Materiały', icon: BookOpen }
            ].map(({ step, title, icon: Icon }) => (
              <div key={step} className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className={`text-sm ${
                  currentStep >= step ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {title}
                </span>
                {step < 3 && (
                  <div className={`w-12 h-0.5 ml-4 ${
                    currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Form content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {currentStep === 1 && <Calendar className="w-5 h-5" />}
            {currentStep === 2 && <Target className="w-5 h-5" />}
            {currentStep === 3 && <BookOpen className="w-5 h-5" />}
            <span>
              Krok {currentStep}: {
                currentStep === 1 ? 'Podstawowe informacje' :
                currentStep === 2 ? 'Szczegóły zajęć' : 
                'Materiały i notatki'
              }
            </span>
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Wybierz grupę, datę i podstawowe informacje o zajęciach'}
            {currentStep === 2 && 'Opisz cele i zawartość zajęć'}
            {currentStep === 3 && 'Dodaj materiały i notatki pomocnicze'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </CardContent>
      </Card>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Poprzedni krok
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleSave(true)}>
            <Save className="w-4 h-4 mr-2" />
            Zapisz jako szkic
          </Button>
          
          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!formData.group || !formData.title}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Następny krok
            </Button>
          ) : (
            <Button
              onClick={() => handleSave(false)}
              disabled={!formData.group || !formData.title}
              className="bg-green-600 hover:bg-green-700"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Zaplanuj zajęcia
            </Button>
          )}
        </div>
      </div>

      {/* Summary card */}
      {formData.group && formData.title && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-900">Podsumowanie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{groups.find(g => g.id === formData.group)?.name}</span>
            </div>
            {formData.title && (
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>{formData.title}</span>
              </div>
            )}
            {formData.date && formData.time && (
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{formData.date} o {formData.time}</span>
              </div>
            )}
            {formData.room && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>{formData.room}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}