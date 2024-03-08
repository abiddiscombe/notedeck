import { appInfo } from "../../utilities/constants";
import { Logo } from "../../components/Logo";
import { Typography } from "../../components/Typography";
import { ExternalLink } from "../../components/ExternalLink";

export function Mobile() {
    return (
        <>
            <div className="grid h-screen grid-rows-[auto,_1fr]">
                <header className="p-6">
                    <Logo large faded />
                </header>
                <main className="m-auto max-w-sm p-10 pb-20">
                    <Typography variant="h2">
                        Sorry, mobile devices are not supported :/
                    </Typography>
                    <Typography variant="body">
                        To explore {appInfo.name}, open this page on your
                        desktop or laptop. More information about {appInfo.name}{" "}
                        is available in the{" "}
                        <ExternalLink href={appInfo.source}>
                            project documentation
                        </ExternalLink>{" "}
                        on GitHub.
                    </Typography>
                </main>
            </div>
            <img
                src="./assets/note-tr.png"
                className="absolute bottom-0 -z-10 max-h-36"
            />
            <img
                src="./assets/note-bl.png"
                className="absolute right-0 top-0 -z-10 max-h-36"
            />
        </>
    );
}
