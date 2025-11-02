import { Button } from "@/components/elements/button";
import { Icon } from "@/components/elements/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/elements/tooltip";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

type themeList = "auto" | "dark" | "light";
const THEME_AUTO = "auto";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

export function HeaderThemeSwitch() {
  const [theme, setTheme] = useState<themeList>(
    localStorage.theme || THEME_AUTO,
  );
  const labelAuto = "Follow System Theme";
  const labelDark = "Use Dark Theme";
  const labelLight = "Use Light Theme";

  function handleThemeChange(newTheme: themeList) {
    setTheme(newTheme);
    if (newTheme === THEME_AUTO) {
      localStorage.removeItem("theme");
    } else {
      localStorage.theme = newTheme;
    }
    window.toggleTheme();
  }

  return (
    <div className="box-content flex items-center rounded">
      <Tooltip>
        <TooltipTrigger>
          <Button
            icon={
              <Icon>
                <MonitorIcon aria-label={labelAuto} />
              </Icon>
            }
            aria-label={labelAuto}
            onClick={() => handleThemeChange(THEME_AUTO)}
            className={twJoin(
              "rounded-r-none",
              theme === THEME_AUTO && "text-accent-700 dark:text-accent-500",
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{labelAuto}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            icon={
              <Icon>
                <MoonIcon aria-label={labelDark} />
              </Icon>
            }
            aria-label={labelDark}
            onClick={() => handleThemeChange(THEME_DARK)}
            className={twJoin(
              "rounded-none border-x-0",
              theme === THEME_DARK && "text-accent-700 dark:text-accent-500",
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{labelDark}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            icon={
              <Icon>
                <SunIcon aria-label={labelLight} />
              </Icon>
            }
            aria-label={labelLight}
            onClick={() => handleThemeChange(THEME_LIGHT)}
            className={twJoin(
              "rounded-l-none",
              theme === THEME_LIGHT && "text-accent-700 dark:text-accent-500",
            )}
          />
        </TooltipTrigger>
        <TooltipContent>{labelLight}</TooltipContent>
      </Tooltip>
    </div>
  );
}
