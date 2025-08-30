import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/core/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useState } from "react";
import { twJoin } from "tailwind-merge";

type themeList = "auto" | "dark" | "light";
const THEME_AUTO = "auto";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

const HeaderThemeSwitch = () => {
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
            size="icon"
            aria-label={labelAuto}
            onClick={() => handleThemeChange(THEME_AUTO)}
            className={twJoin(
              "rounded-r-none",
              theme !== THEME_AUTO ? "" : "bg-neutral-100 dark:bg-neutral-700",
            )}
          >
            <Icon>
              <MonitorIcon aria-label={labelAuto} />
            </Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{labelAuto}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            aria-label={labelDark}
            onClick={() => handleThemeChange(THEME_DARK)}
            className={twJoin(
              "rounded-none",
              theme !== THEME_DARK
                ? ""
                : "border-neutral-100 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-700",
            )}
          >
            <Icon>
              <MoonIcon aria-label={labelDark} />
            </Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{labelDark}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger>
          <Button
            size="icon"
            aria-label={labelLight}
            onClick={() => handleThemeChange(THEME_LIGHT)}
            className={twJoin(
              "rounded-l-none",
              theme !== THEME_LIGHT ? "" : "bg-neutral-100 dark:bg-neutral-700",
            )}
          >
            <Icon>
              <SunIcon aria-label={labelLight} />
            </Icon>
          </Button>
        </TooltipTrigger>
        <TooltipContent>{labelLight}</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default HeaderThemeSwitch;
