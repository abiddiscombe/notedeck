import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Mobile } from "./blocks/Mobile/Mobile";
import { Header } from "./blocks/Header/Header";
import { Main } from "./blocks/Main/Main";
import { serviceSettings } from "./database/serviceSettings";

export function App() {
    const [loaded, setLoaded] = useState(false);

    async function checkSettingsInstantiated() {
        const settings = await serviceSettings.read();
        !settings && (await serviceSettings.instantiate());
        setLoaded(true);
    }

    useEffect(() => {
        checkSettingsInstantiated();
    }, []);

    if (isMobile) {
        return <Mobile />;
    }

    return (
        loaded && (
            <div className="grid h-screen grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
                <Header />
                <Main />
            </div>
        )
    );
}
