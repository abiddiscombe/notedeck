import { isMobile } from "react-device-detect";
import { AppRoot } from "./AppRoot";
import { appInfo } from "./utilities/constants";
import { Typography } from "./components/Typography";
import { ExternalLink } from "./components/ExternalLink";

export function App() {
    // If the app is loaded on a mobile device, bypass
    // initialization and data loading to improve performance.

    if (isMobile) {
        return (
            <div className="grid h-screen grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
                <header className="p-10">
                    <Typography.H1>{appInfo.name}</Typography.H1>
                </header>
                <main className="m-auto max-w-sm p-10 pb-20">
                    <Typography.H2>
                        Sorry, mobile devices are not supported :/
                    </Typography.H2>
                    <Typography.Body>
                        To explore {appInfo.name}, open this page on your
                        desktop or laptop. More information about {appInfo.name}{" "}
                        is available in the{" "}
                        <ExternalLink href={appInfo.sourceUrl}>
                            project documentation
                        </ExternalLink>{" "}
                        on GitHub.
                    </Typography.Body>
                </main>
            </div>
        );
    }

    return <AppRoot />;
}
