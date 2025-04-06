
import React from 'react';
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

// Define different color theme options
type ColorTheme = {
  name: string;
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
};

const colorThemes: ColorTheme[] = [
  {
    name: "Green (Default)",
    primary: "142 55% 50%",
    secondary: "200 80% 80%",
    background: "142 54% 96%",
    foreground: "142 5% 20%"
  },
  {
    name: "Purple-Orange",
    primary: "280 70% 60%",
    secondary: "35 90% 70%",
    background: "280 40% 96%",
    foreground: "280 5% 20%"
  },
  {
    name: "Blue-Green",
    primary: "210 80% 60%",
    secondary: "150 80% 60%",
    background: "210 54% 96%",
    foreground: "210 5% 20%"
  },
  {
    name: "Pink-Teal",
    primary: "330 80% 60%",
    secondary: "180 70% 60%",
    background: "330 30% 96%",
    foreground: "330 5% 20%"
  },
  {
    name: "Amber-Blue",
    primary: "40 90% 60%",
    secondary: "220 80% 60%",
    background: "40 40% 96%",
    foreground: "40 5% 20%"
  },
];

const ThemeColorPicker: React.FC = () => {
  const { toast } = useToast();
  
  const changeTheme = (theme: ColorTheme) => {
    // Apply the theme by changing CSS variables
    document.documentElement.style.setProperty('--primary', theme.primary);
    document.documentElement.style.setProperty('--secondary', theme.secondary);
    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--foreground', theme.foreground);
    
    // Show success toast
    toast({
      title: "Theme Changed",
      description: `Applied the ${theme.name} theme.`,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 border border-primary/20 bg-background/80 backdrop-blur-sm"
          aria-label="Change color theme"
        >
          <Palette className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Choose a theme</h4>
          <div className="grid grid-cols-1 gap-2">
            {colorThemes.map((theme) => (
              <button
                key={theme.name}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2 rounded-md text-left text-sm transition-colors",
                  "hover:bg-muted"
                )}
                onClick={() => changeTheme(theme)}
              >
                <span>{theme.name}</span>
                <div className="flex">
                  <div 
                    className="h-5 w-5 rounded-full border"
                    style={{ background: `hsl(${theme.primary})` }} 
                  />
                  <div 
                    className="h-5 w-5 rounded-full border -ml-1.5"
                    style={{ background: `hsl(${theme.secondary})` }} 
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColorPicker;
