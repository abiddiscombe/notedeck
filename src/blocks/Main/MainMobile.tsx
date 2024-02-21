import { Typography } from "../../components/Typography";
import { ExternalLink } from "../../components/ExternalLink";
import { appName, appSource } from "../../utilities/constants";

export function MainMobile() {
    return (
        <main className="grid place-items-center p-6">
            <div className="max-w-sm">
                <Typography variant="h2">
                    Sorry, mobile devices are not supported.
                </Typography>
                <Typography variant="body">
                    To get started with {appName}, please visit this page on a
                    desktop or laptop computer. More information about this app
                    is available in the{" "}
                    <ExternalLink href={appSource}>
                        project documentation
                    </ExternalLink>{" "}
                    on GitHub.
                </Typography>
            </div>
        </main>
    );
}
