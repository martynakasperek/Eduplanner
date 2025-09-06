import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('anna.nowak@sp15.edu.pl');
  const [password, setPassword] = useState('haslo123');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo i nazwa aplikacji */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">EduPlanner</h1>
          <p className="text-gray-600">Dziennik zajęć pozalekcyjnych</p>
        </div>

        {/* Formularz logowania */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Zaloguj się</CardTitle>
            <CardDescription className="text-center">
              Wprowadź swoje dane, aby uzyskać dostęp do systemu
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
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Hasło</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

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

              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
                Zaloguj się
              </Button>

              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Zapomniałeś hasła?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Ilustracja edukacyjna */}
        <div className="mt-8 text-center">
          <div className="flex justify-center space-x-4 text-gray-400">
            <BookOpen className="w-6 h-6" />
            <div className="w-6 h-6 rounded-full bg-green-500" />
            <div className="w-6 h-6 rounded-full bg-orange-500" />
            <div className="w-6 h-6 rounded-full bg-blue-500" />
          </div>
          <p className="text-xs text-gray-500 mt-2">Wersja 1.0</p>
        </div>
      </div>
    </div>
  );
}