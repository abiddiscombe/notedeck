import { createContext, useEffect, useState } from "react";
import { settingsService } from "./database/settings.service";
import { update } from "./utilities/update";
import AppSplash from "./AppSplash";
import Main from "./layout/Main/Main";
import Header from "./layout/Header/Header";
import { SETTINGS_KEYS } from "./utilities/constants";

interface AppContextType {
    loaded: boolean;
    updateAvailable: boolean;
    updateTargetVersion: string;
}

export const AppContext = createContext<AppContextType | null>(null);

const AppRoot = () => {
    const [context, setContext] = useState<AppContextType>({
        loaded: false,
        updateAvailable: false,
        updateTargetVersion: "",
    });

    async function init() {
        await settingsService.instantiate();
        const autoUpdateCheck = await settingsService.read(
            SETTINGS_KEYS.AutoUpdateCheck,
        );

        if (autoUpdateCheck) {
            const updateCheckEvent = await update.check();
            if (updateCheckEvent?.updateAvailable) {
                setContext((prevState) => ({
                    ...prevState,
                    ...updateCheckEvent,
                }));
            }
        }

        setTimeout(() => {
            setContext((prevState) => ({
                ...prevState,
                loaded: true,
            }));
        }, 250);
    }

    useEffect(() => {
        init();
    }, []);

    if (!context.loaded) {
        return <AppSplash />;
    }

    return (
        <AppContext.Provider value={context}>
            <div className="grid h-screen grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
                <Header />
                <Main />
            </div>
        </AppContext.Provider>
    );
};

export default AppRoot;
