import { appInfo } from "./utilities/constants";
import { Typography } from "./components/Typography";
import { ExternalLink } from "./components/ExternalLink";

export function AppUnsupported() {
    return (
        <>
            <div className="grid h-screen grid-rows-[auto,_1fr] bg-primary-50 dark:bg-primary-950">
                <header className="p-6">
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
        </>
    );
}
