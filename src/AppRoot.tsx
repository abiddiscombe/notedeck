import { createContext, useEffect, useState } from "react";
import { serviceSettings } from "./database/serviceSettings";
import { update } from "./utilities/update";
import { AppSplash } from "./AppSplash";
import { Main } from "./layout/Main/Main";
import { Header } from "./layout/Header/Header";

interface AppContextType {
    loaded: boolean;
    updateAvailable: boolean;
    updateTargetVersion: string;
}

export const AppContext = createContext<AppContextType | null>(null);

export function AppRoot() {
    const [context, setContext] = useState<AppContextType>({
        loaded: false,
        updateAvailable: false,
        updateTargetVersion: "",
    });

    async function init() {
        await serviceSettings.instantiate();

        const autoUpdateCheck = await serviceSettings.read("autoUpdateCheck");
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
            // Experimental! Increases the visible time
            // of the Splash Screen by 250 ms in order to
            // reduce "flicker" on app load.

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
}
