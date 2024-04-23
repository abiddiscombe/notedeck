import { useState } from "react";
import { twJoin } from "tailwind-merge";
import { Button } from "../../components/elements/Button";
import { Tooltip } from "../../components/elements/Tooltip";
import {
    ComputerDesktopIcon,
    MoonIcon,
    SunIcon,
} from "@heroicons/react/16/solid";

type themeList = "auto" | "dark" | "light";
const THEME_AUTO = "auto";
const THEME_DARK = "dark";
const THEME_LIGHT = "light";

export function HeaderThemeSwitch() {
    const [theme, setTheme] = useState<themeList>(
        localStorage.theme || THEME_AUTO,
    );

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
            <Tooltip
                aria-hidden
                label="System Theme"
            >
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleThemeChange(THEME_AUTO)}
                    className={twJoin(
                        "rounded-r-none",
                        theme !== THEME_AUTO
                            ? "text-primary-400 dark:text-primary-500 bg-primary-50 dark:bg-primary-800"
                            : "bg-primary-100 dark:bg-primary-700",
                    )}
                >
                    <ComputerDesktopIcon aria-label="Use System Theme" />
                </Button>
            </Tooltip>
            <Tooltip
                aria-hidden
                label="Dark Mode"
            >
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleThemeChange(THEME_DARK)}
                    className={twJoin(
                        "rounded-none",
                        theme !== THEME_DARK
                            ? "text-primary-400 dark:text-primary-500 bg-primary-50 dark:bg-primary-800"
                            : "bg-primary-100 dark:bg-primary-700",
                    )}
                >
                    <MoonIcon aria-label="Use Dark Mode" />
                </Button>
            </Tooltip>
            <Tooltip
                aria-hidden
                label="Light Mode"
            >
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleThemeChange(THEME_LIGHT)}
                    className={twJoin(
                        "rounded-l-none",
                        theme !== THEME_LIGHT
                            ? "text-primary-400 dark:text-primary-500 bg-primary-50 dark:bg-primary-800"
                            : "bg-primary-100 dark:bg-primary-700",
                    )}
                >
                    <SunIcon aria-label="Use Light Mode" />
                </Button>
            </Tooltip>
        </div>
    );
}
