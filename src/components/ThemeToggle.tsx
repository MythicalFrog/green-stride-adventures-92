
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Palette } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

// Define color themes
type ColorTheme = {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  gradient?: string;
};

const colorThemes: ColorTheme[] = [
  {
    name: "Green (Default)",
    primary: "142 55% 50%",
    secondary: "200 80% 80%",
    background: "142 54% 96%",
    foreground: "142 5% 20%",
    gradient: "linear-gradient(to bottom right, hsl(142 54% 96%), hsl(152 54% 92%))"
  },
  {
    name: "Purple-Orange",
    primary: "280 70% 60%",
    secondary: "35 90% 70%",
    background: "280 40% 96%",
    foreground: "280 5% 20%",
    gradient: "linear-gradient(to bottom right, hsl(280 40% 96%), hsl(290 40% 92%))"
  },
  {
    name: "Blue-Green",
    primary: "210 80% 60%",
    secondary: "150 80% 60%",
    background: "210 54% 96%",
    foreground: "210 5% 20%",
    gradient: "linear-gradient(to bottom right, hsl(210 54% 96%), hsl(180 54% 92%))"
  },
  {
    name: "Pink-Teal",
    primary: "330 80% 60%",
    secondary: "180 70% 60%",
    background: "330 30% 96%",
    foreground: "330 5% 20%",
    gradient: "linear-gradient(to bottom right, hsl(330 30% 96%), hsl(340 30% 92%))"
  },
  {
    name: "Amber-Blue",
    primary: "40 90% 60%",
    secondary: "220 80% 60%",
    background: "40 40% 96%",
    foreground: "40 5% 20%",
    gradient: "linear-gradient(to bottom right, hsl(40 40% 96%), hsl(50 40% 92%))"
  },
];

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const applyColorTheme = (theme: ColorTheme) => {
    // Apply the theme colors
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--foreground', theme.foreground);
    
    // Apply background gradient to the body
    if (theme.gradient) {
      document.body.style.background = theme.gradient;
      document.body.style.backgroundAttachment = 'fixed';
    }
    
    // Show success toast
    toast({
      title: "Theme Changed",
      description: `Applied the ${theme.name} theme.`,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          className="flex justify-between items-center"
          onClick={toggleDarkMode}
        >
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <div className="px-2 py-1.5 text-sm font-semibold">Color Themes</div>
        
        {colorThemes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => applyColorTheme(theme)}
            className="flex justify-between items-center"
          >
            <span>{theme.name}</span>
            <div className="flex">
              <div 
                className="h-4 w-4 rounded-full border"
                style={{ background: `hsl(${theme.primary})` }} 
              />
              <div 
                className="h-4 w-4 rounded-full border -ml-1.5"
                style={{ background: `hsl(${theme.secondary})` }} 
              />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
