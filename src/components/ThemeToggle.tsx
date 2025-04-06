
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Palette } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import confetti from '../utils/confetti';

// Define color themes
type ColorTheme = {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  gradient: string;
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

// Dark mode versions of the same themes
const darkColorThemes: ColorTheme[] = [
  {
    name: "Green Dark",
    primary: "142 50% 50%",
    secondary: "200 50% 30%",
    background: "142 15% 15%",
    foreground: "0 0% 98%",
    gradient: "linear-gradient(to bottom right, hsl(142 15% 15%), hsl(152 15% 12%))"
  },
  {
    name: "Purple-Orange Dark",
    primary: "280 60% 50%",
    secondary: "35 70% 50%",
    background: "280 20% 15%",
    foreground: "0 0% 98%",
    gradient: "linear-gradient(to bottom right, hsl(280 20% 15%), hsl(290 20% 12%))"
  },
  {
    name: "Blue-Green Dark",
    primary: "210 70% 50%",
    secondary: "150 70% 40%",
    background: "210 25% 15%",
    foreground: "0 0% 98%",
    gradient: "linear-gradient(to bottom right, hsl(210 25% 15%), hsl(180 25% 12%))"
  },
  {
    name: "Pink-Teal Dark",
    primary: "330 70% 50%",
    secondary: "180 60% 40%",
    background: "330 15% 15%",
    foreground: "0 0% 98%",
    gradient: "linear-gradient(to bottom right, hsl(330 15% 15%), hsl(340 15% 12%))"
  },
  {
    name: "Amber-Blue Dark",
    primary: "40 80% 50%",
    secondary: "220 70% 40%",
    background: "40 20% 15%",
    foreground: "0 0% 98%",
    gradient: "linear-gradient(to bottom right, hsl(40 20% 15%), hsl(50 20% 12%))"
  },
];

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<string>("Green (Default)");
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = localStorage.getItem('theme');
    const storedColorTheme = localStorage.getItem('colorTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Apply stored color theme if available
    if (storedColorTheme) {
      const themeToApply = isDarkMode 
        ? darkColorThemes.find(t => t.name === storedColorTheme) 
        : colorThemes.find(t => t.name === storedColorTheme);
      
      if (themeToApply) {
        applyColorTheme(themeToApply, false);
        setCurrentTheme(themeToApply.name);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      
      // When switching to light mode, apply the light version of current color theme
      const lightTheme = colorThemes.find(theme => 
        theme.name.replace(" Dark", "") === currentTheme.replace(" Dark", ""));
      if (lightTheme) {
        applyColorTheme(lightTheme, false);
        setCurrentTheme(lightTheme.name);
      }
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      
      // When switching to dark mode, apply the dark version of current color theme
      const darkTheme = darkColorThemes.find(theme => 
        theme.name.replace(" Dark", "") === currentTheme.replace(" Dark", ""));
      if (darkTheme) {
        applyColorTheme(darkTheme, false);
        setCurrentTheme(darkTheme.name);
      }
    }
  };

  const applyColorTheme = (theme: ColorTheme, showToast: boolean = true) => {
    // Apply the theme colors
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--foreground', theme.foreground);
    
    // Apply background gradient to the body
    document.body.style.background = theme.gradient;
    document.body.style.backgroundAttachment = 'fixed';
    
    // Save theme preference
    localStorage.setItem('colorTheme', theme.name);
    setCurrentTheme(theme.name);
    
    // Show success toast if requested
    if (showToast) {
      toast({
        title: "Theme Changed",
        description: `Applied the ${theme.name} theme.`,
      });
      
      // Little celebration for theme change
      confetti();
    }
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
        
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-sm font-semibold">Color Themes</div>
        
        {(isDarkMode ? darkColorThemes : colorThemes).map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => applyColorTheme(theme)}
            className={cn(
              "flex justify-between items-center",
              currentTheme === theme.name && "bg-accent/50"
            )}
          >
            <span>{theme.name.replace(" Dark", "")}</span>
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
