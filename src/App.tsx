import { isMobile } from "react-device-detect";
import { APP_INFO } from "./utilities/constants";
import AppRoot from "./AppRoot";
import Typography from "./components/Typography";
import ExternalLink from "./components/ExternalLink";

const App = () => {
    // If the app is loaded on a mobile device, bypass
    // initialization and data loading to improve performance.

    if (isMobile) {
        return (
            <div className="grid h-dvh grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
                <header className="p-10">
                    <Typography variant="h1">{APP_INFO.Name}</Typography>
                </header>
                <main className="m-auto max-w-sm p-10 pb-20">
                    <Typography variant="h2">
                        Sorry, mobile devices are not supported :/
                    </Typography>
                    <Typography variant="body">
                        To explore {APP_INFO.Name}, open this page on your
                        desktop or laptop.
                    </Typography>
                    <Typography
                        variant="body"
                        className="mt-6"
                    >
                        <ExternalLink href={APP_INFO.InfoUrl}>
                            Learn more about NoteDeck.
                        </ExternalLink>
                    </Typography>
                </main>
            </div>
        );
    }

    return <AppRoot />;
};

export default App;
