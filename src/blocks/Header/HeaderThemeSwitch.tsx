import { useState } from "react";
import { cx } from "class-variance-authority";
import Button from "../../components/elements/Button";
import Tooltip from "../../components/elements/Tooltip";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/16/solid";

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
          size="sm"
          variant="ghost"
          aria-label={labelAuto}
          onClick={() => handleThemeChange(THEME_AUTO)}
          className={cx(
            "rounded-r-none",
            theme !== THEME_AUTO
              ? "bg-primary-50 text-primary-400 dark:bg-primary-800 dark:text-primary-500"
              : "bg-primary-100 dark:bg-primary-700",
          )}
        >
          <ComputerDesktopIcon aria-label={labelAuto} />
        </Button>
      </Tooltip>
      <Tooltip aria-hidden label={labelDark}>
        <Button
          size="sm"
          variant="ghost"
          aria-label={labelDark}
          onClick={() => handleThemeChange(THEME_DARK)}
          className={cx(
            "rounded-none",
            theme !== THEME_DARK
              ? "bg-primary-50 text-primary-400 dark:bg-primary-800 dark:text-primary-500"
              : "bg-primary-100 dark:bg-primary-700",
          )}
        >
          <MoonIcon aria-label={labelDark} />
        </Button>
      </Tooltip>
      <Tooltip aria-hidden label={labelLight}>
        <Button
          size="sm"
          variant="ghost"
          aria-label={labelLight}
          onClick={() => handleThemeChange(THEME_LIGHT)}
          className={cx(
            "rounded-l-none",
            theme !== THEME_LIGHT
              ? "bg-primary-50 text-primary-400 dark:bg-primary-800 dark:text-primary-500"
              : "bg-primary-100 dark:bg-primary-700",
          )}
        >
          <SunIcon aria-label={labelLight} />
        </Button>
      </Tooltip>
    </div>
  );
};

export default HeaderThemeSwitch;
