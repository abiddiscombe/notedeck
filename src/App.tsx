import { createContext, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { serviceSettings } from "./database/serviceSettings";
import { AppUnsupported } from "./AppUnsupported";
import { Main } from "./layout/Main/Main";
import { AppSplash } from "./AppSplash";
import { Header } from "./layout/Header/Header";
import { update } from "./utilities/update";

interface AppContextType {
    loaded: boolean;
    updateAvailable: boolean;
    updateTargetVersion: string;
}

export const AppContext = createContext<AppContextType | null>(null);

export function App() {
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

        setContext((prevState) => ({
            ...prevState,
            loaded: true,
        }));
    }

    useEffect(() => {
        init();
    }, []);

    if (!context.loaded) {
        return <AppSplash />;
    }

    if (isMobile) {
        return <AppUnsupported />;
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
