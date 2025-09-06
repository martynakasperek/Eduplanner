import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, GraduationCap, BookOpen, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('anna.nowak@sp15.edu.pl');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 rounded-full p-3">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">EduPlanner</h1>
            <p className="text-gray-600 mt-2">System zarządzania zajęciami pozalekcyjnymi</p>
          </div>

          {/* Login Form */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Zaloguj się</CardTitle>
              <CardDescription className="text-center">
                Wprowadź swoje dane aby uzyskać dostęp do systemu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="jan.kowalski@szkola.edu.pl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Hasło</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Wprowadź hasło"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Zapamiętaj mnie
                    </Label>
                  </div>
                  <a href="#" className="text-sm text-blue-600 hover:underline">
                    Zapomniałeś hasła?
                  </a>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700"
                >
                  Zaloguj się
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Version Info */}
          <div className="text-center text-sm text-gray-500">
            EduPlanner v1.0 - System zarządzania zajęciami pozalekcyjnymi
          </div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
        <div className="relative z-10 h-full flex flex-col justify-center">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6">
              Zarządzaj zajęciami pozalekcyjnymi z łatwością
            </h2>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed">
              Kompleksowe narzędzie dla nauczycieli prowadzących zajęcia pozalekcyjne. 
              Zarządzaj grupami, planuj zajęcia, monitoruj frekwencję i generuj raporty.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Users className="h-5 w-5" />
                </div>
                <span>Zarządzanie grupami uczniów</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <span>Planowanie zajęć i harmonogramów</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-full p-2">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span>Monitorowanie postępów i frekwencji</span>
              </div>
            </div>
          </div>

          {/* Education themed illustration */}
          <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1746862932918-99cdc53157b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZHVjYXRpb24lMjBzY2hvb2wlMjBjbGFzc3Jvb20lMjBtb2Rlcm58ZW58MXx8fHwxNzU3MTc0NzI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Education"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-40 left-16 w-12 h-12 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
}