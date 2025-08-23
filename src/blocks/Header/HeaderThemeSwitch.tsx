import Tooltip from "@/components/Tooltip";
import { Button } from "@/components/ui/button";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";
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
      <Tooltip aria-hidden label={labelAuto}>
        <Button
          size="icon"
          aria-label={labelAuto}
          onClick={() => handleThemeChange(THEME_AUTO)}
          className={twJoin(
            "rounded-r-none",
            theme !== THEME_AUTO ? "" : "bg-neutral-100 dark:bg-neutral-700",
          )}
        >
          <ComputerDesktopIcon aria-label={labelAuto} />
        </Button>
      </Tooltip>
      <Tooltip aria-hidden label={labelDark}>
        <Button
          size="icon"
          aria-label={labelDark}
          onClick={() => handleThemeChange(THEME_DARK)}
          className={twJoin(
            "rounded-none",
            theme !== THEME_DARK ? "" : "bg-neutral-100 dark:bg-neutral-700",
          )}
        >
          <MoonIcon aria-label={labelDark} />
        </Button>
      </Tooltip>
      <Tooltip aria-hidden label={labelLight}>
        <Button
          size="icon"
          aria-label={labelLight}
          onClick={() => handleThemeChange(THEME_LIGHT)}
          className={twJoin(
            "rounded-l-none",
            theme !== THEME_LIGHT ? "" : "bg-neutral-100 dark:bg-neutral-700",
          )}
        >
          <SunIcon aria-label={labelLight} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default HeaderThemeSwitch;
