import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import { Toolset } from "@/components/elements/toolset";
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Settings_ThemeManagement = () => {
  const [activeTheme, setActiveTheme] = useState<string>(
    localStorage.theme || "auto",
  );

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    if (newTheme === "auto") {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = newTheme;
    }
    window.toggleTheme();
  };

  const themes = [
    { id: "dark", icon: <MoonIcon />, label: "Dark" },
    { id: "light", icon: <SunIcon />, label: "Light" },
    { id: "auto", icon: <LaptopIcon />, label: "System" },
  ];

  return (
    <Toolset className="grid grid-cols-[1fr_1fr_1fr]">
      {themes.map((theme) => (
        <Button
          key={theme.id}
          onClick={() => handleThemeChange(theme.id)}
          className={twMerge(
            "h-fit max-h-fit flex-col items-center gap-1.5 px-2 py-3",
            theme.id === activeTheme && "border-accent-600!",
          )}
        >
          <Icon size="md">{theme.icon}</Icon>
          <span className="text-xs">{theme.label}</span>
        </Button>
      ))}
    </Toolset>
  );
};
